import {
  Anchor,
  Box,
  ChevronRight,
  Code2,
  ExternalLink,
  Layers,
  Package,
} from "lucide-react";
import { useState } from "react";

const RELEASE_IDS = [
  "ver-25-0",
  "ver-21-02-8",
  "ver-21-02-7",
  "ver-21-02-6",
  "ver-21-02-5",
  "ver-20-02-20",
];

// FIXME: uniwersalność - automatyczne generowanie linków na podstawie samej wersji?

const RELEASE_ASSETS = {
  "ver-25-0": {
    docker: {
      hubUrl: "https://hub.docker.com/u/onedata",
      items: [
        {
          name: "onedata/onezone:25.0",
          href: "https://hub.docker.com/r/onedata/onezone/tags?name=25.0",
          desc: "Central zone service",
        },
        {
          name: "onedata/oneprovider:25.0",
          href: "https://hub.docker.com/r/onedata/oneprovider/tags?name=25.0",
          desc: "Storage provider service",
        },
        {
          name: "onedata/oneclient:25.0",
          href: "https://hub.docker.com/r/onedata/oneclient/tags?name=25.0",
          desc: "POSIX FUSE client",
        },
        {
          name: "onedata/rest-cli:25.0",
          href: "https://hub.docker.com/r/onedata/rest-cli/tags?name=25.0",
          desc: "REST command-line helper",
        },
      ],
    },
    deb: {
      hubUrl: "https://packages.onedata.org/apt/ubuntu/focal/dists/",
      items: [
        {
          name: "oneclient_25.0_amd64.deb",
          href: "https://packages.onedata.org",
          desc: "Oneclient — Ubuntu 22.04 x86_64",
        },
        {
          name: "oneclient_25.0_arm64.deb",
          href: "https://packages.onedata.org",
          desc: "Oneclient — Ubuntu 22.04 arm64",
        },
        {
          name: "oneclient-dbg_25.0_amd64.deb",
          href: "https://packages.onedata.org",
          desc: "Debug symbols package",
        },
      ],
    },
    python: {
      hubUrl: "https://pypi.org/project/onedatafs/",
      items: [
        {
          name: "onedatafs==25.0",
          href: "https://pypi.org/project/onedatafs/#history",
          desc: "Python filesystem abstraction (PyPI)",
        },
        {
          name: "onedatafileutils==25.0",
          href: "https://pypi.org/project/onedatafileutils/#history",
          desc: "File utilities library (PyPI)",
        },
      ],
    },
    conda: {
      hubUrl: "https://anaconda.org/search#?q=onedata",
      items: [
        {
          name: "onedata::oneclient=25.0",
          href: "https://anaconda.org/onedata/oneclient",
          desc: "Oneclient Conda package",
        },
        {
          name: "onedata::onedatafs=25.0",
          href: "https://anaconda.org/onedata/onedatafs",
          desc: "OnedataFS Conda package",
        },
      ],
    },
    helm: {
      hubUrl: "https://artifacthub.io/packages/search?org=onedata",
      items: [
        {
          name: "onedata/onezone",
          href: "https://artifacthub.io/packages/helm/onedata/onezone",
          desc: "Onezone Helm chart",
        },
        {
          name: "onedata/oneprovider",
          href: "https://artifacthub.io/packages/helm/onedata/oneprovider",
          desc: "Oneprovider Helm chart",
        },
      ],
    },
  },
};
// Fill older versions with same structure but versioned names
[
  "ver-21-02-8",
  "ver-21-02-7",
  "ver-21-02-6",
  "ver-21-02-5",
  "ver-20-02-20",
].forEach((id) => {
  const v = id.replace("ver-", "").replace(/-/g, ".");
  RELEASE_ASSETS[id] = {
    docker: {
      hubUrl: "https://hub.docker.com/u/onedata",
      items: [
        {
          name: `onedata/onezone:${v}`,
          href: "https://hub.docker.com/r/onedata/onezone/tags",
          desc: "Central zone service",
        },
        {
          name: `onedata/oneprovider:${v}`,
          href: "https://hub.docker.com/r/onedata/oneprovider/tags",
          desc: "Storage provider service",
        },
        {
          name: `onedata/oneclient:${v}`,
          href: "https://hub.docker.com/r/onedata/oneclient/tags",
          desc: "POSIX FUSE client",
        },
      ],
    },
    deb: {
      hubUrl: "https://packages.onedata.org",
      items: [
        {
          name: `oneclient_${v}_amd64.deb`,
          href: "https://packages.onedata.org",
          desc: "Oneclient — Ubuntu x86_64",
        },
        {
          name: `oneclient_${v}_arm64.deb`,
          href: "https://packages.onedata.org",
          desc: "Oneclient — Ubuntu arm64",
        },
      ],
    },
    python: {
      hubUrl: "https://pypi.org/project/onedatafs/",
      items: [
        {
          name: `onedatafs==${v}`,
          href: "https://pypi.org/project/onedatafs/#history",
          desc: "Python filesystem abstraction (PyPI)",
        },
      ],
    },
    conda: {
      hubUrl: "https://anaconda.org/search#?q=onedata",
      items: [
        {
          name: `onedata::oneclient=${v}`,
          href: "https://anaconda.org/onedata/oneclient",
          desc: "Oneclient Conda package",
        },
      ],
    },
    helm: {
      hubUrl: "https://artifacthub.io/packages/search?org=onedata",
      items: [
        {
          name: "onedata/onezone",
          href: "https://artifacthub.io/packages/search?org=onedata",
          desc: "Onezone Helm chart",
        },
        {
          name: "onedata/oneprovider",
          href: "https://artifacthub.io/packages/search?org=onedata",
          desc: "Oneprovider Helm chart",
        },
      ],
    },
  };
});

const ASSET_TABS = [
  { key: "docker", icon: Anchor, label: "Docker Images", sub: "Docker Hub" },
  { key: "deb", icon: Package, label: "DEB Packages", sub: "Ubuntu / Debian" },
  { key: "python", icon: Code2, label: "Python Libraries", sub: "PyPI" },
  { key: "conda", icon: Box, label: "Conda Modules", sub: "conda-forge" },
  { key: "helm", icon: Layers, label: "Helm Charts", sub: "ArtifactHub" },
];

export default function ReleaseAssets({ version }) {
  const [active, setActive] = useState(null);
  const assets = RELEASE_ASSETS[version] || RELEASE_ASSETS["ver-25-0"];
  const tab = ASSET_TABS.find((t) => t.key === active);
  const items = active ? assets[active]?.items : [];
  const hubUrl = active ? assets[active]?.hubUrl : "";

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

      {active && (
        <div className="od-border od-bg-card border-t px-5 py-4">
          <div className="mb-3 flex items-center justify-between">
            <p className="od-text flex items-center gap-1.5 text-xs font-semibold">
              <tab.icon className="od-accent-text h-3.5 w-3.5" />
              {tab.label}
            </p>
            <a
              href={hubUrl}
              target="_blank"
              rel="noreferrer"
              className="od-accent-text flex items-center gap-1.5 text-xs font-medium hover:underline"
            >
              Open {tab.sub} <ExternalLink className="h-3 w-3" />
            </a>
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
                <ChevronRight className="od-text-faint group-hover:od-accent-text ml-3 h-4 w-4 flex-shrink-0 transition-colors" />
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
