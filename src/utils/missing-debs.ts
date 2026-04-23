import { readdir } from "node:fs/promises";
import stripVersion from "./strip-version";
import type { UbuntuCodename } from "../components/ReleaseAssets/types";

const onedataRepoDomain = "get.onedata.org";

export type MissingDeb = {
  version: string;
  distro: UbuntuCodename;
};

async function oneclientDebPackage(
  version: string,
  distro: UbuntuCodename,
  subversion = "1",
) {
  const majorVersion = stripVersion(version);
  const aptRepoVersion = majorVersion.replaceAll(".", "");
  const filename = `oneclient_${version}-${subversion}~${distro}_amd64.deb`;
  const url = `https://${onedataRepoDomain}/apt/ubuntu/${aptRepoVersion}/pool/main/o/oneclient/${filename}`;
  const works = await fetch(url, { method: "HEAD" }).then(
    (response) => response.ok,
  );
  return {
    version,
    distro,
    url,
    works,
  };
}

export async function getMissingDebs(): Promise<MissingDeb[]> {
  const versions = (await readdir("./src/content/releases/"))
    .filter((doc) => doc.endsWith(".md"))
    .map((doc) => doc.slice(0, -3));
  const distros = ["xenial", "bionic", "focal", "jammy"];

  const missing = [];
  for (const version of versions) {
    for (const distro of distros) {
      const entry = await oneclientDebPackage(
        version,
        distro as UbuntuCodename,
      );
      if (!entry.works) {
        missing.push({ version: entry.version, distro: entry.distro });
      }
    }
  }
  return missing;
}
