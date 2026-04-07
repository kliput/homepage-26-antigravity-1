import { type AssetSection } from "./types.js";
import { Asset } from "./Asset.js";

export function Section({ section }: { section: AssetSection }) {
  const Icon = section.icon;
  return (
    <div className="od-border od-bg-card border-t px-5 py-4">
      <div className="mb-3 flex items-center justify-between">
        <p className="od-text flex items-center gap-1.5 text-xs font-semibold">
          <Icon className="od-accent-text h-3.5 w-3.5" />
          {section.title}
        </p>
      </div>
      <div className="space-y-2">
        {section.assets.map((asset) => (
          <Asset key={asset.name} asset={asset} />
        ))}
      </div>
    </div>
  );
}
