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
import stripVersion, { type MajorVersion } from "../utils/strip-version.js";

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

// FIXME: remove?
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

function createAsset(
  name: string,
  href: string,
  description: string,
  optionals: any = {},
): ReleaseAsset {
  const result: Partial<ReleaseAsset> = { name, href, description };
  if (!name || !description || !href) {
    throw new Error("Asset name, description and href are required");
  }
  if (href) {
    result.href = href;
    result.secondaryIcon = ExternalLink;
  }
  if (optionals?.copyable !== undefined) {
    result.copyable = optionals.copyable;
    if (optionals.monospace === undefined) {
      result.monospaced = result.copyable;
    }
  }
  if (optionals?.mainIcon) {
    result.mainIcon = optionals.mainIcon;
  } else if (optionals?.copyable) {
    result.mainIcon = ClipboardCopy;
  }
  if (optionals?.secondaryIcon) {
    result.secondaryIcon = optionals.secondaryIcon;
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
    oneprovider: {
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
          ],
        },
      ],
    },
    oneclient: {
      tab: { key: "oneclient", icon: SquareTerminal, label: "Oneclient" },
      sections: [
        {
          icon: SquareTerminal,
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
        // FIXME: nie mamy skryptu instalacyjnego; ponadto trzeba go utworzyć dla 25.0
        {
          icon: BookMarked,
          title: "Installation script (native packages)",
          assets: [
            createAsset(
              oneclientInstallOneliner(majorVersion),
              `/docs/${majorVersion}/admin-guide/oneclient/installation/overview`,
              "The above command will install the Oneclient using packages in Ubuntu (16.04+), Fedora, or CentOS/Rocky.",
            ),
          ],
        },
        // FIXME: sekcja Conda Packages
        // FIXME: sekcja DEB Packages; notka że rekomendujemy installation script -> na końcu; wszystkie 4 możliwe distra
      ],
    },
    onedatafs: {
      tab: { key: "onedatafs", icon: LibraryBig, label: "OnedataFS" },
      sections: [],
      // FIXME: tak samo jak oneclient
    },
    onedatarestfs: {
      tab: { key: "onedatarestfs", icon: LibraryBig, label: "OnedataRestFS" },
      sections: [],
    },
    onedatafilerestclient: {
      tab: {
        key: "onedatafilerestclient",
        icon: LibraryBig,
        label: "OnedataFileRestClient",
      },
      sections: [],
    },
    restcli: {
      tab: { key: "restcli", icon: SquareTerminal, label: "REST CLI" },
      sections: [],
    },
  };
}

function oneclientInstallOneliner(majorVersion: MajorVersion) {
  const suffix = isLegacyMajorVersion(majorVersion)
    ? `-${majorVersion.replace(".", "")}`
    : "";
  return `curl -sS http://get.onedata.org/oneclient${suffix}.sh | bash`;
}

function isLegacyMajorVersion(majorVersion: MajorVersion) {
  return ["18.02", "19.02", "20.02", "21.02"].includes(majorVersion);
}

export default function ReleaseAssets({ version }: { version: string }) {
  const [activeProductId, setActiveProductId] = useState<ProductId | null>(
    null,
  );
  const assets: AssetsCollection = generateAssetsCollection(version);
  const productsIds = Object.keys(assets);
  const productsTabs = Object.values(assets).map(({ tab }) => tab);
  const items = activeProductId ? assets[activeProductId]?.sections || [] : [];

  return (
    <div className="od-border mb-8 overflow-hidden rounded-2xl border">
      <div className="od-bg-2 px-5 pb-3 pt-5">
        <p className="od-text-faint mb-3 text-xs font-semibold uppercase tracking-wider">
          Release Assets
        </p>
        <div className="flex flex-wrap gap-2">
          {productsTabs.map(({ icon: Icon, key, label, sub }) => (
            <button
              key={key}
              onClick={() =>
                setActiveProductId(activeProductId === key ? null : key)
              }
              className={`flex items-center gap-2 rounded-xl border px-3 py-2 text-xs font-semibold transition-all ${
                activeProductId === key
                  ? "od-gradient-bg border-transparent text-white shadow-md"
                  : "od-text-muted hover:od-text bg-[var(--od-bg-card)] hover:border-[var(--od-accent)]"
              }`}
            >
              <Icon className="h-3.5 w-3.5" />
              {label}
              {/* FIXME: być może do usunięcia, bo już nie mamy dodatkowych napisów */}
              {sub && (
                <span
                  className={`hidden font-normal sm:inline ${activeProductId === key ? "opacity-80" : "od-text-faint"}`}
                >
                  — {sub}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {activeProductId &&
        assets[activeProductId]?.sections.map((section) => {
          return (
            <div className="od-border od-bg-card border-t px-5 py-4">
              <div className="mb-3 flex items-center justify-between">
                <p className="od-text flex items-center gap-1.5 text-xs font-semibold">
                  <section.icon className="od-accent-text h-3.5 w-3.5" />
                  {section.title}
                </p>
                {/* {assets[activeProductId] && (
                  <a
                    href={section}
                    target="_blank"
                    rel="noreferrer"
                    className="od-accent-text flex items-center gap-1.5 text-xs font-medium hover:underline"
                  >
                    Open {tab.sub} <ExternalLink className="h-3 w-3" />
                  </a>
                )} */}
              </div>
              <div className="space-y-2">
                {/* FIXME: if asset doesn't have href, do not render anchor */}
                {section.assets.map((asset) => (
                  <a
                    key={asset.name}
                    href={asset.href}
                    target="_blank"
                    rel="noreferrer"
                    className="od-bg-2 od-border group flex items-center justify-between rounded-xl border px-4 py-3 transition-all hover:border-[var(--od-accent)]"
                  >
                    <div>
                      <p
                        className={`od-text group-hover:od-accent-text text-sm transition-colors ${asset.monospaced ? "font-mono" : ""}`}
                      >
                        {asset.name}
                      </p>
                      <p className="od-text-faint mt-0.5 text-xs">
                        {asset.description}
                      </p>
                    </div>
                    <ExternalLink className="od-text-faint group-hover:od-accent-text ml-3 h-4 w-4 flex-shrink-0 transition-colors" />
                  </a>
                ))}
              </div>
            </div>
          );
        })}
    </div>
  );
}
