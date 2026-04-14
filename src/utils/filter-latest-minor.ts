import { semversionize, compareVersions } from "./version.mjs";
import stripVersion from "./strip-version";

export function filterLatestMinors(versions: string[]): string[] {
  const mapping: Record<string, string[]> = {};
  for (const version of versions) {
    const minor = stripVersion(version);
    if (!mapping[minor]) {
      mapping[minor] = [];
    }
    mapping[minor].push(version);
  }
  for (const versions of Object.values(mapping)) {
    versions.sort(compareVersions);
    const latestVersion = versions[versions.length - 1];
    versions.length = 1;
    versions[0] = latestVersion;
  }
  return Object.values(mapping).map((versions) => versions[0]);
}
