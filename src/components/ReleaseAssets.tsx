import {
  Anchor,
  BookMarked,
  ClipboardCopy,
  Database,
  ExternalLink,
  Globe,
  LibraryBig,
  Ship,
  SquareTerminal,
  type LucideIcon,
} from "lucide-react";
import { useState } from "react";
import stripVersion from "../utils/strip-version.js";

export type ReleaseAssetsCollectionType = "docker" | "deb" | "python" | "conda";

// typy assetów: tekst monospace, podpis, kopiarka tekstu monospace, link z prawej (różne ikony); sam link (różne ikony?);

export interface ReleaseAsset {
  name: string;
  monospaced?: boolean;
  copyable?: boolean;
  mainIcon: LucideIcon;
  secondaryIcon?: LucideIcon;
  description: string;
  href?: string;
}

// class ReleaseAsset implements IReleaseAsset {
//   constructor(name, ) {
//   }
// }

const collectionTypes: Readonly<Array<ReleaseAssetsCollectionType>> =
  Object.freeze([
    "docker",
    "deb",
    "python",
    "conda",
    // TODO: add helm after consultation with MO
    //  "helm",
  ]);

// FIXME: uniwersalność - automatyczne generowanie linków na podstawie samej wersji?

type AssetTab = {
  key: ProductId;
  icon: LucideIcon;
  label: string;
  sub?: string;
};

type AssetSection = {
  icon: LucideIcon;
  title: string;
  assets: ReleaseAsset[];
};

type ProductAssets = {
  tab: AssetTab;
  sections: AssetSection[];
};

type ProductId =
  | "onezone"
  | "oneprovider"
  | "oneclient"
  | "onedatafs"
  | "onedatarestfs"
  | "onedatafilerestclient"
  | "restcli";

type AssetsCollection = Record<ProductId, ProductAssets>;

// FIXME: disable ligatures, for x86_64
// font-variant-ligatures: none;

const ASSET_TABS: AssetTab[] = [
  { key: "onezone", icon: Globe, label: "Onezone" },
  { key: "oneprovider", icon: Database, label: "Oneprovider" },
  { key: "oneclient", icon: SquareTerminal, label: "Oneclient" },
  { key: "onedatafs", icon: LibraryBig, label: "OnedataFS" },
  { key: "onedatarestfs", icon: LibraryBig, label: "OnedataRestFS" },
  {
    key: "onedatafilerestclient",
    icon: LibraryBig,
    label: "OnedataFileRestClient",
  },
  { key: "restcli", icon: SquareTerminal, label: "REST CLI" },
];

function getAssetTab(key: ProductId): AssetTab {
  const assetTab = ASSET_TABS.find((tab) => tab.key === key);
  if (!assetTab) {
    throw new Error(`Unknown asset tab type: ${key}`);
  }
  return assetTab;
}

function oldGenerateAssetsCollection(
  type: ReleaseAssetsCollectionType,
  version: string,
): ReleaseAssetsCollection {
  const majorVersion = stripVersion(version);
  if (!collectionTypes.includes(type)) {
    throw new Error(`Unknown asset type: ${type}`);
  }
  switch (type) {
    case "docker": {
      return {
        hubUrl: "https://hub.docker.com/u/onedata",
        items: [
          {
            name: `onedata/onezone:${version}`,
            href: `https://hub.docker.com/r/onedata/onezone/tags?name=${version}`,
            desc: "Central zone service",
          },
          {
            name: `onedata/oneprovider:${version}`,
            href: `https://hub.docker.com/r/onedata/oneprovider/tags?name=${version}`,
            desc: "Storage provider service",
          },
          {
            name: `onedata/oneclient:${version}`,
            href: `https://hub.docker.com/r/onedata/oneclient/tags?name=${version}`,
            desc: "POSIX FUSE client",
          },
          {
            name: `onedata/rest-cli:${version}`,
            href: `https://hub.docker.com/r/onedata/rest-cli/tags?name=${version}`,
            desc: "REST command-line helper",
          },
        ],
      };
    }

    case "deb": {
      const aptRepoVersion = majorVersion.replaceAll(".", "");
      return {
        hubUrl: `https://get.onedata.org/apt/ubuntu/${aptRepoVersion}/dists/`,
        items: [
          {
            name: `oneclient_${version}-1~jammy_amd64.deb`,
            href: `https://get.onedata.org/apt/ubuntu/${aptRepoVersion}/pool/main/o/oneclient/oneclient_${version}-1~jammy_amd64.deb`,
            desc: "Oneclient — Ubuntu 22.04 x86_64",
          },
        ],
      };
    }

    case "conda": {
      return {
        hubUrl: "https://anaconda.org/onedata",
        items: [
          {
            name: `onedata::oneclient=${version}`,
            href: `https://anaconda.org/channels/onedata/packages/oneclient/files?file_q=${version}`,
            desc: "Oneclient Conda package",
          },
          {
            name: `onedata::onedatafs=${version}`,
            href: `https://anaconda.org/channels/onedata/packages/onedatafs/files?file_q=${version}`,
            desc: "OnedataFS Conda package",
          },
        ],
      };
    }

    case "python": {
      return {
        items: [
          {
            name: "fs.onedatarestfs 25.0.0",
            href: `https://pypi.org/project/fs.onedatarestfs/${version}`,
            desc: "Onedata REST-based filesystem for PyFilesystem",
          },
          {
            name: "onedatafilerestclient 25.0.0",
            href: `https://pypi.org/project/onedatafilerestclient/${version}`,
            desc: "Onedata REST-based filesystem for PyFilesystem",
          },
        ],
      };
    }

    default: {
      throw new Error(`Unsupported asset type: ${type}`);
    }
  }
}

function createAsset(
  name: string,
  href: string,
  description: string,
  optionals: any = {},
): ReleaseAsset {
  const result: Partial<ReleaseAsset> = { name, href, description };
  if (href) {
    result.href = href;
    result.secondaryIcon = ExternalLink;
  }
  if (optionals?.copyable !== undefined) {
    result.copyable = optionals.copyable;
  }
  if (optionals?.mainIcon) {
    result.mainIcon = optionals.mainIcon;
  } else if (optionals?.copyable) {
    result.mainIcon = ClipboardCopy;
  }
  if (optionals?.secondaryIcon) {
    result.secondaryIcon = optionals.secondaryIcon;
  }
  if (!result.name || !result.description || !result.mainIcon) {
    throw new Error("Asset name, description and main icon are required");
  }
  return result as ReleaseAsset;
}

function generateAssetsCollection(version: string): AssetsCollection {
  const majorVersion = stripVersion(version);
  return {
    onezone: {
      tab: { key: "onezone", icon: Globe, label: "Onezone" },
      sections: [
        {
          icon: Ship,
          title: "Docker Images",
          assets: [
            createAsset(
              `onedata/onezone:${version}`,
              `https://hub.docker.com/r/onedata/onezone/tags?name=${version}`,
              "Central zone service",
            ),
          ],
        },
        {
          icon: BookMarked,
          title: "Documentation",
          assets: [
            createAsset(
              "How to install",
              `/docs/${majorVersion}/admin-guide/onezone/installation/`,
              "Onezone installation guide",
            ),
            // FIXME: dodać jak pojawi się strona podręcznika o upgrade
            // createAsset(
            //   "How to upgrade",
            //   `/docs/${majorVersion}/admin-guide/onezone/maintenance/`,
            //   "Onezone upgrade guide",
            // ),
          ],
        },
      ],
    },
    onezone: {
      tab: { key: "oneprovider", icon: Database, label: "Oneprovider" },
      sections: [
        {
          icon: Ship,
          title: "Docker Images",
          assets: [
            createAsset(
              `onedata/oneprovider:${version}`,
              `https://hub.docker.com/r/onedata/oneprovider/tags?name=${version}`,
              "Storage provider service",
            ),
          ],
        },
        {
          icon: BookMarked,
          title: "Documentation",
          assets: [
            createAsset(
              "How to install",
              `/docs/${majorVersion}/admin-guide/oneprovider/installation/overview`,
              "Oneprovider installation guide",
            ),
            // FIXME: dodać jak pojawi się strona podręcznika o upgrade
            // createAsset(
            //   "How to upgrade",
            //   `/docs/${majorVersion}/admin-guide/oneprovider/maintenance`,
            //   "Oneprovider upgrade guide",
            // ),
          ],
        },
      ],
    },
    oneclient: {
      tab: { key: "oneclient", icon: SquareTerminal, label: "Oneclient" },
      sections: [
        {
          icon: Ship,
          title: "Docker Images (containerized)",
          assets: [
            createAsset(
              `onedata/oneclient:${version}`,
              `/docs/${majorVersion}/user-guide/interfaces/oneclient/#using-oneclient-from-docker`,
              "Oneclient Docker image",
              { secondaryIcon: BookMarked },
            ),
          ],
        },
        {
          icon: BookMarked,
          title: "Documentation",
          assets: [
            createAsset(
              "How to install",
              `/docs/${majorVersion}/admin-guide/oneclient/installation/overview`,
              "Oneprovider installation guide",
            ),
            // FIXME: dodać jak pojawi się strona podręcznika o upgrade
            // createAsset(
            //   "How to upgrade",
            //   `/docs/${majorVersion}/admin-guide/oneprovider/maintenance`,
            //   "Oneprovider upgrade guide",
            // ),
          ],
        },
      ],
    },
    onedatafs: {},
    onedatarestfs: {},
    onedatafilerestclient: {},
    restcli: {},
  };
}

export default function ReleaseAssets({ version }: { version: string }) {
  const [active, setActive] = useState<ReleaseAssetsCollectionType | null>(
    null,
  );
  const data: AssetsCollection = generateAssetsCollection(version);
  const items = active ? assets[active]?.items || [] : [];
  const hubUrl = active ? assets[active]?.hubUrl || "" : "";

  return (
    <div className="od-border mb-8 overflow-hidden rounded-2xl border">
      <div className="od-bg-2 px-5 pb-3 pt-5">
        <p className="od-text-faint mb-3 text-xs font-semibold uppercase tracking-wider">
          Release Assets
        </p>
        <div className="flex flex-wrap gap-2">
          {ASSET_TABS.map(({ key, icon: Icon, label, sub }) => (
            <button
              key={key}
              onClick={() => setActive(active === key ? null : key)}
              className={`flex items-center gap-2 rounded-xl border px-3 py-2 text-xs font-semibold transition-all ${
                active === key
                  ? "od-gradient-bg border-transparent text-white shadow-md"
                  : "od-text-muted hover:od-text bg-[var(--od-bg-card)] hover:border-[var(--od-accent)]"
              }`}
            >
              <Icon className="h-3.5 w-3.5" />
              {label}
              {sub && (
                <span
                  className={`hidden font-normal sm:inline ${active === key ? "opacity-80" : "od-text-faint"}`}
                >
                  — {sub}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {active && tab && (
        <div className="od-border od-bg-card border-t px-5 py-4">
          <div className="mb-3 flex items-center justify-between">
            <p className="od-text flex items-center gap-1.5 text-xs font-semibold">
              <tab.icon className="od-accent-text h-3.5 w-3.5" />
              {tab.label}
            </p>
            {hubUrl && (
              <a
                href={hubUrl}
                target="_blank"
                rel="noreferrer"
                className="od-accent-text flex items-center gap-1.5 text-xs font-medium hover:underline"
              >
                Open {tab.sub} <ExternalLink className="h-3 w-3" />
              </a>
            )}
          </div>
          <div className="space-y-2">
            {items.map((item) => (
              <a
                key={item.name}
                href={item.href}
                target="_blank"
                rel="noreferrer"
                className="od-bg-2 od-border group flex items-center justify-between rounded-xl border px-4 py-3 transition-all hover:border-[var(--od-accent)]"
              >
                <div>
                  <p className="od-text group-hover:od-accent-text font-mono text-sm transition-colors">
                    {item.name}
                  </p>
                  <p className="od-text-faint mt-0.5 text-xs">{item.desc}</p>
                </div>
                <ExternalLink className="od-text-faint group-hover:od-accent-text ml-3 h-4 w-4 flex-shrink-0 transition-colors" />
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
