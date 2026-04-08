import { getCollection, type CollectionEntry } from "astro:content";

let cachedLatestRelease: CollectionEntry<"releases"> | null = null;

export async function getAllReleases(): Promise<CollectionEntry<"releases">[]> {
  const releases = await getCollection("releases");
  const sortedReleases = [...releases].sort(
    (a, b) => b.data.date.valueOf() - a.data.date.valueOf(),
  );
  return sortedReleases;
}

export async function getLatestReleaseDocument(): Promise<
  CollectionEntry<"releases">
> {
  if (cachedLatestRelease) {
    return cachedLatestRelease;
  }
  const sortedReleases = await getAllReleases();
  cachedLatestRelease = sortedReleases[0];
  return cachedLatestRelease;
}

export async function getLatestReleaseVersion(): Promise<string> {
  const latestRelease = await getLatestReleaseDocument();
  return latestRelease.data.version;
}

export async function getLatestReleaseSlug(): Promise<string> {
  const latestRelease = await getLatestReleaseDocument();
  return latestRelease.id;
}
