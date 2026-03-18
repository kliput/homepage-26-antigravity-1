import compatibility from "../config/compatibility.mjs";

/**
 * @param {Object<string, Array<string>>} compatiblity
 */
function makeSymmetric(compatiblity) {
  const compatData = structuredClone(compatiblity);
  /* eslint-disable guard-for-in */
  for (const primaryVersion in compatData) {
    const currentList = compatData[primaryVersion];
    for (let i = 0; i < currentList.length; ++i) {
      const version = currentList[i];
      let correlatedVersions = compatData[version];
      if (!correlatedVersions) {
        correlatedVersions = compatData[version] = [];
      }
      if (!correlatedVersions.includes(primaryVersion)) {
        correlatedVersions.push(primaryVersion);
      }
    }
  }
  return compatData;
}

const zoneToProviderCompatibility =
  compatibility.compatibility["onezone:oneprovider"];

const providerToProviderCompatibility = makeSymmetric(
  compatibility.compatibility["oneprovider:oneprovider"],
);

const providerToClientCompatibility =
  compatibility.compatibility["oneprovider:oneclient"];

const clientVersions = [
  ...new Set(Object.values(providerToClientCompatibility).flat()),
].reverse();
const providerVersions = [
  ...new Set(Object.values(zoneToProviderCompatibility).flat()),
].reverse();
const zoneVersions = Object.keys(zoneToProviderCompatibility).reverse();

export default {
  providerToClientCompatibility,
  providerToProviderCompatibility,
  zoneToProviderCompatibility,
  providerVersions,
  zoneVersions,
  clientVersions,
};
