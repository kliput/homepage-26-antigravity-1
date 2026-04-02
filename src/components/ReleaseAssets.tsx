import {
  Anchor,
  Box,
  Code2,
  ExternalLink,
  Layers,
  Package,
} from "lucide-react";
import { useState } from "react";
import stripVersion from "../utils/strip-version.js";

const RELEASE_IDS = [
  "ver-25-0",
  "ver-21-02-8",
  "ver-21-02-7",
  "ver-21-02-6",
  "ver-21-02-5",
  "ver-20-02-20",
];

export type ReleaseAssetsCollectionType = "docker" | "deb" | "python" | "conda";
// TODO: add helm assets after consultation with MO
// | "helm";

export interface ReleaseAsset {
  name: string;
  href: string;
  desc: string;
}

export interface ReleaseAssetsCollection {
  hubUrl?: string;
  items: ReleaseAsset[];
}

export type PredefinedReleaseAssetsMap = Record<
  string,
  Partial<Record<ReleaseAssetsCollectionType, ReleaseAssetsCollection>>
>;

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

interface AssetTab {
  key: ReleaseAssetsCollectionType;
  icon: any;
  label: string;
  sub: string;
}

// FIXME: disable ligatures, for x86_64
// font-variant-ligatures: none;

const ASSET_TABS: AssetTab[] = [
  { key: "docker", icon: Anchor, label: "Docker Images", sub: "Docker Hub" },
  { key: "deb", icon: Package, label: "DEB Packages", sub: "Ubuntu / Debian" },
  { key: "python", icon: Code2, label: "Python Libraries", sub: "PyPI" },
  { key: "conda", icon: Box, label: "Conda Packages", sub: "conda-forge" },
  // TODO: add helm
  // { key: "helm", icon: Layers, label: "Helm Charts", sub: "ArtifactHub" },
];

function generateAssetsCollection(
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

export default function ReleaseAssets({ version }: { version: string }) {
  const [active, setActive] = useState<ReleaseAssetsCollectionType | null>(
    null,
  );
  const assets = collectionTypes.reduce(
    (acc, type) => {
      acc[type] = generateAssetsCollection(type, version);
      return acc;
    },
    {} as Record<ReleaseAssetsCollectionType, ReleaseAssetsCollection>,
  );
  const tab = ASSET_TABS.find((t) => t.key === active);
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
              <span
                className={`hidden font-normal sm:inline ${active === key ? "opacity-80" : "od-text-faint"}`}
              >
                — {sub}
              </span>
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
