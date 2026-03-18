import { motion } from "motion/react";
import { Check } from "lucide-react";
import compatibility from "../config/compatibility.mjs";

const zoneToProviderCompatibility =
  compatibility.compatibility["onezone:oneprovider"];

const providerVersions = [
  ...new Set(Object.values(zoneToProviderCompatibility).flat()),
].reverse();
const zoneVersions = Object.keys(zoneToProviderCompatibility).reverse();

export default function CompatibilityTable() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.1 }}
      className="mb-16"
    >
      <div className="od-card overflow-hidden rounded-lg">
        <div className="max-h-[30rem] overflow-x-auto overflow-y-auto">
          <table className="m-0 w-full border-collapse">
            <thead>
              <tr className="od-bg-2 od-border border-b">
                <th className="od-text od-border border-r px-4 py-3 text-left text-sm font-semibold">
                  Onezone
                  <br />
                  version
                </th>
                {providerVersions.map((v) => (
                  <th
                    key={v}
                    className="od-text-muted od-border whitespace-nowrap border-r px-3 py-3 text-center text-xs font-semibold last:border-r-0"
                  >
                    Oneprovider
                    <br />
                    {v}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {zoneVersions.map((zoneVersion) => (
                <tr
                  key={zoneVersion}
                  className="od-border hover:od-bg-2 border-b transition-colors"
                >
                  <td className="od-text od-border od-bg-card hover:od-bg-2 sticky left-0 border-r px-4 py-3 text-sm font-medium">
                    {zoneVersion}
                  </td>
                  {providerVersions.map((providerVersion) => {
                    const isCompatible =
                      zoneToProviderCompatibility[zoneVersion]?.includes(
                        providerVersion,
                      );
                    return (
                      <td
                        key={`${zoneVersion}-${providerVersion}`}
                        className="od-border border-r px-3 py-3 text-center last:border-r-0"
                      >
                        {isCompatible && (
                          <Check className="od-accent-text mx-auto h-5 w-5" />
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </motion.div>
  );
}
