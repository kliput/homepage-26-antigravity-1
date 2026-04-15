import { motion } from "motion/react";
import { Check } from "lucide-react";
import { isStableVersion } from "../utils/version.mjs";
import "../styles/compatibility-table.css";
import { useState, useRef, type MouseEventHandler } from "react";
import { filterLatestMinors } from "../utils/filter-latest-minor.ts";

type CompatibilityTableParam = {
  rows: string[];
  columns: string[];
  rowProduct: string;
  columnProduct: string;
  compatibility: Record<string, string[]>;
};

type CompatibilityTableState = {
  filteredByLatest: boolean;
  filteredByStable: boolean;
  versionRows: string[];
  versionColumns: string[];
};

export default function CompatibilityTable({
  rows,
  columns,
  rowProduct,
  columnProduct,
  compatibility,
}: CompatibilityTableParam) {
  function computeState({
    filteredByLatest,
    filteredByStable,
  }: {
    filteredByLatest: boolean;
    filteredByStable: boolean;
  }): CompatibilityTableState {
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

  const tableScrollContainerRef = useRef(null);

  let [state, setState] = useState(
    computeState({
      filteredByLatest: true,
      filteredByStable: true,
    }),
  );

  function toggleLatestFilter(value: boolean) {
    const effValue =
      typeof value === "boolean" ? value : !state.filteredByLatest;
    setState(
      computeState({
        ...state,
        filteredByLatest: effValue,
      }),
    );
  }
  function toggleStableFilter(value: boolean) {
    const effValue =
      typeof value === "boolean" ? value : !state.filteredByStable;
    setState(
      computeState({
        ...state,
        filteredByStable: effValue,
      }),
    );
  }

  function optionClicked(event: MouseEvent) {
    if (
      !event.target ||
      !event.currentTarget ||
      (event.target instanceof HTMLInputElement &&
        event.target.type === "checkbox")
    ) {
      return;
    }
    (
      (event.currentTarget as HTMLDivElement)?.querySelector(
        "input[type=checkbox]",
      ) as HTMLInputElement
    )?.click();
  }

  let grabPosition = {
    left: 0,
    top: 0,
    x: 0,
    y: 0,
  };

  function onMouseMove(event: MouseEvent) {
    const scrollContainer = event.currentTarget;
    if (!scrollContainer || !(scrollContainer instanceof HTMLElement)) {
      return;
    }

    const dx = event.clientX - grabPosition.x;
    const dy = event.clientY - grabPosition.y;
    scrollContainer.scrollTop = grabPosition.top - dy;
    scrollContainer.scrollLeft = grabPosition.left - dx;
  }

  function onMouseUp(event: MouseEvent) {
    const scrollContainer = event.currentTarget;
    if (!scrollContainer || !(scrollContainer instanceof HTMLElement)) {
      return;
    }
    scrollContainer.style.cursor = "grab";
    scrollContainer.style.removeProperty("user-select");
    scrollContainer.removeEventListener("mousemove", onMouseMove);
    scrollContainer.removeEventListener("mouseup", onMouseUp);
  }

  function onMouseDown(event: React.MouseEvent) {
    const scrollContainer = event.currentTarget;
    if (!scrollContainer || !(scrollContainer instanceof HTMLElement)) {
      return;
    }
    scrollContainer.style.cursor = "grabbing";
    scrollContainer.style.userSelect = "none";
    grabPosition = {
      left: scrollContainer.scrollLeft,
      top: scrollContainer.scrollTop,
      x: event.clientX,
      y: event.clientY,
    };

    scrollContainer.addEventListener("mousemove", onMouseMove);
    scrollContainer.addEventListener("mouseup", onMouseUp);
  }

  function onMouseLeave(event: React.MouseEvent) {
    const scrollContainer = event.currentTarget;
    if (!scrollContainer || !(scrollContainer instanceof HTMLElement)) {
      return;
    }
    scrollContainer.style.cursor = "grab";
    scrollContainer.style.removeProperty("userSelect");
    scrollContainer.removeEventListener("mousemove", onMouseMove);
    scrollContainer.removeEventListener("mouseup", onMouseUp);
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
        <div
          className="compatibility-table-option"
          onClick={(e) => optionClicked(e, "latest")}
        >
          <input
            type="checkbox"
            checked={filteredByLatest}
            onChange={(e) => toggleLatestFilter(e.target.checked)}
          />
          <label>Show only the latest minor versions</label>
        </div>
        <div
          className="compatibility-table-option"
          onClick={(e) => optionClicked(e, "stable")}
        >
          <input
            type="checkbox"
            checked={filteredByStable}
            onChange={(e) => toggleStableFilter(e.target.checked)}
          />
          <label>Show only stable versions</label>
        </div>
      </div>

      <div className="table-container od-card overflow-hidden rounded-lg">
        <div
          className="table-scroll-container"
          ref={tableScrollContainerRef}
          onMouseDown={onMouseDown}
          onMouseLeave={onMouseLeave}
        >
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
