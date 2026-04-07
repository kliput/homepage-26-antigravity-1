import { type AssetTab } from "./types.js";

export function Tab({
  tab,
  isActive,
  onClick,
}: {
  tab: AssetTab;
  isActive: boolean;
  onClick: () => void;
}) {
  const Icon = tab.icon;
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 rounded-xl border px-3 py-2 text-xs font-semibold transition-all ${
        isActive
          ? "od-gradient-bg border-transparent text-white shadow-md"
          : "od-text-muted hover:od-text bg-[var(--od-bg-card)] hover:border-[var(--od-accent)]"
      }`}
    >
      <Icon className="h-3.5 w-3.5" />
      {tab.label}
      {tab.sub && (
        <span
          className={`hidden font-normal sm:inline ${isActive ? "opacity-80" : "od-text-faint"}`}
        >
          — {tab.sub}
        </span>
      )}
    </button>
  );
}
