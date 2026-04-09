import path from "node:path";
import fs from "node:fs";
import { compareVersions } from "../version.mjs";

export function getApiDir() {
  return path.join(process.cwd(), "src/content/api");
}

/**
 * @returns Versions sorted from newest to oldest.
 */
export function getAvailableVersions(): string[] {
  const apiDir = getApiDir();
  if (!fs.existsSync(apiDir)) {
    console.warn("API root directory not found");
    return [];
  }
  return fs
    .readdirSync(apiDir)
    .filter((f) => fs.statSync(path.join(apiDir, f)).isDirectory())
    .sort((a, b) => -compareVersions(a, b));
}

export class ApiVersionManager {
  private versions: string[];

  constructor() {
    this.versions = getAvailableVersions();
  }

  getVersions() {
    return this.versions;
  }

  getLatestVersion() {
    return this.versions[0];
  }

  getStableVersion() {
    return this.versions.filter(
      (v) => ![/alpha/, /beta/, /rc/].some((tag) => tag.test(v)),
    )[0];
  }
}

export function getAbsoluteApiPath(
  version: string,
  product: string,
  slug: string,
) {
  return `/api/${version}/${product}/${slug}`;
}
