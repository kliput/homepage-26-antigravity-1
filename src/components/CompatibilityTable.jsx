import { motion } from "motion/react";
import { Check } from "lucide-react";
import { isStableVersion } from "../utils/version.mjs";
import "../styles/compatibility-table.css";
import { useState } from "react";
import { filterLatestMinors } from "../utils/filter-latest-minor.ts";

export default function CompatibilityTable({
  rows,
  columns,
  rowProduct,
  columnProduct,
  compatibility,
}) {
  function computeState({ filteredByLatest, filteredByStable }) {
    let effRows = [...rows];
    let effColumns = [...columns];
    if (filteredByStable) {
      effRows = effRows.filter(isStableVersion);
      effColumns = effColumns.filter(isStableVersion);
    }
    if (filteredByLatest) {
      effRows = filterLatestMinors(effRows);
      effColumns = filterLatestMinors(effColumns);
    }
    return {
      filteredByLatest,
      filteredByStable,
      versionRows: effRows,
      versionColumns: effColumns,
    };
  }

  let [state, setState] = useState(
    computeState({
      filteredByLatest: true,
      filteredByStable: true,
      versionRows: rows,
      versionColumns: columns,
    }),
  );

  function toggleLatestFilter(value) {
    const effValue =
      typeof value === "boolean" ? value : !state.filteredByLatest;
    setState(
      computeState({
        ...state,
        filteredByLatest: effValue,
      }),
    );
  }
  function toggleStableFilter(value) {
    const effValue =
      typeof value === "boolean" ? value : !state.filteredByStable;
    setState(
      computeState({
        ...state,
        filteredByStable: effValue,
      }),
    );
  }

  const { filteredByLatest, filteredByStable, versionRows, versionColumns } =
    state;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.1 }}
      className="mb-16"
    >
      <div className="compatibility-table-options">
        <div className="compatibility-table-option">
          <input
            type="checkbox"
            checked={filteredByLatest}
            onChange={(e) => toggleLatestFilter(e.target.checked)}
          />
          <label>Show only the latest minor versions</label>
        </div>
        <div className="compatibility-table-option">
          <input
            type="checkbox"
            checked={filteredByStable}
            onChange={(e) => toggleStableFilter(e.target.checked)}
          />
          <label>Show only stable versions</label>
        </div>
      </div>

      <div className="table-container od-card overflow-hidden rounded-lg">
        <div className="overflow-x-auto">
          <table className="m-0 w-full border-collapse">
            <thead>
              <tr className="od-border z-20 border-b">
                <th className="od-text od-border od-bg-2 sticky left-0 top-0 z-20 border-r px-4 py-3 text-left text-sm font-semibold">
                  {rowProduct}
                  <br />
                  version
                </th>
                {versionColumns.map((columnVersion) => (
                  <th
                    key={columnVersion}
                    className="od-bg-2 od-text-muted od-border sticky top-0 whitespace-nowrap border-r px-3 py-3 text-center text-xs font-semibold last:border-r-0"
                  >
                    {columnProduct}
                    <br />
                    {columnVersion}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {versionRows.map((rowVersion) => (
                <tr
                  key={rowVersion}
                  className="od-border hover:od-bg-2 z-10 border-b transition-colors"
                >
                  <th className="od-text od-border od-bg-card hover:od-bg-2 sticky left-0 z-10 border-r px-4 py-3 text-sm font-medium">
                    {rowVersion}
                  </th>
                  {versionColumns.map((columnVersion) => {
                    const isCompatible =
                      compatibility[rowVersion]?.includes(columnVersion);
                    return (
                      <td
                        key={`${rowVersion}-${columnVersion}`}
                        className="od-border z-10 border-r px-3 py-3 text-center last:border-r-0"
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
