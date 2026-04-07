import {
  BookMarked,
  ClipboardCopy,
  Database,
  ExternalLink,
  Globe,
  LibraryBig,
  Ship,
  SquareTerminal,
} from "lucide-react";
import { useState } from "react";
import stripVersion, { type MajorVersion } from "../utils/strip-version.js";
import type {
  AssetTab,
  AssetsCollection,
  ProductId,
  ReleaseAsset,
} from "./ReleaseAssets/types.js";
import { Tab } from "./ReleaseAssets/Tab.js";
import { Section } from "./ReleaseAssets/Section.js";

function createAsset(
  name: string,
  href: string,
  description: string,
  optionals: Partial<ReleaseAsset> = {},
): ReleaseAsset {
  const result: Partial<ReleaseAsset> = { name, href, description };
  if (!name || !description || !href) {
    throw new Error("Asset name, description and href are required");
  }
  if (href) {
    result.href = href;
  }
  if (optionals.copyable === undefined) {
    result.copyable = false;
  } else {
    result.copyable = Boolean(optionals.copyable);
  }
  result.monospaced = optionals.monospaced ?? result.copyable;
  if (optionals?.primaryIcon) {
    result.primaryIcon = optionals.primaryIcon;
  } else if (result.copyable) {
    result.primaryIcon = ClipboardCopy;
  } else {
    result.primaryIcon = ExternalLink;
  }
  // This was in original code but not really used as far as I can see in the render part.
  // The Asset component we extracted only uses name, description, href, and monospaced.
  if (optionals?.secondaryIcon) {
    result.secondaryIcon = optionals.secondaryIcon;
  } else if (result.copyable && result.href) {
    result.secondaryIcon = ExternalLink;
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
              { copyable: true },
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
              { copyable: true },
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
              { secondaryIcon: BookMarked, copyable: true },
            ),
          ],
        },
        {
          icon: BookMarked,
          title: "Installation script (native packages)",
          assets: [
            createAsset(
              oneclientInstallOneliner(majorVersion),
              `/docs/${majorVersion}/admin-guide/oneclient/installation/overview`,
              "The above command will install the Oneclient using packages in Ubuntu (16.04+), Fedora, or CentOS/Rocky.",
              { copyable: true },
            ),
          ],
        },
      ],
    },
    onedatafs: {
      tab: { key: "onedatafs", icon: LibraryBig, label: "OnedataFS" },
      sections: [],
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
  const productsTabs = Object.values(assets).map(({ tab }) => tab);

  return (
    <div className="od-border mb-8 overflow-hidden rounded-2xl border">
      <div className="od-bg-2 px-5 pb-3 pt-5">
        <p className="od-text-faint mb-3 text-xs font-semibold uppercase tracking-wider">
          Release Assets
        </p>
        <div className="flex flex-wrap gap-2">
          {productsTabs.map((tab) => (
            <Tab
              key={tab.key}
              tab={tab}
              isActive={activeProductId === tab.key}
              onClick={() =>
                setActiveProductId(activeProductId === tab.key ? null : tab.key)
              }
            />
          ))}
        </div>
      </div>

      {activeProductId &&
        assets[activeProductId]?.sections.map((section) => (
          <Section key={section.title} section={section} />
        ))}
    </div>
  );
}
