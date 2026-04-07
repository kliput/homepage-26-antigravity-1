import { useState } from "react";
import { type ReleaseAsset } from "./types.js";

export function Asset({ asset }: { asset: ReleaseAsset }) {
  const [showTooltip, setShowTooltip] = useState(false);
  const SecondaryIcon = asset.secondaryIcon;
  const PrimaryIcon = asset.primaryIcon;

  const handleCopy = (e: React.MouseEvent) => {
    if (asset.copyable) {
      e.preventDefault();
      e.stopPropagation();
      navigator.clipboard.writeText(asset.name).then(() => {
        setShowTooltip(true);
        setTimeout(() => setShowTooltip(false), 2000);
      });
    }
  };

  const twoSided = Boolean(SecondaryIcon);

  return (
    <div className="asset-container flex">
      <a
        href={asset.copyable ? "" : asset.href}
        onClick={asset.copyable ? handleCopy : () => undefined}
        target="_blank"
        rel="noreferrer"
        className={`release-asset no-external-icon od-bg-2 group relative flex flex-grow items-center justify-between border px-4 py-3 transition-all hover:border-[var(--od-accent)] ${twoSided ? "rounded-l-xl border-[var(--od-border)] border-r-[var(--od-bg-2)]" : "od-border rounded-xl"}`}
      >
        <div>
          <p
            className={`od-text group-hover:od-accent-text text-sm transition-colors ${asset.monospaced ? "font-mono" : ""}`}
          >
            {asset.name}
          </p>
          <p className="od-text-faint mt-0.5 text-xs">{asset.description}</p>
        </div>
        <div className="flex items-center gap-3">
          {PrimaryIcon && (
            <div className="relative flex items-center justify-center">
              {showTooltip && (
                <div className="tooltip-up absolute bottom-full z-10 mb-2 whitespace-nowrap rounded bg-slate-800 px-2.5 py-1 text-[10px] font-semibold text-white shadow-lg ring-1 ring-white/10">
                  Copied!
                  <div className="tooltip-arrow absolute left-1/2 top-full -translate-x-1/2 border-x-[5px] border-t-[5px] border-x-transparent border-t-slate-800"></div>
                </div>
              )}
              <PrimaryIcon
                className={`release-asset-primary-icon od-text-faint group-hover:od-accent-text h-4 w-4 flex-shrink-0 transition-colors`}
              />
            </div>
          )}
        </div>
      </a>
      {SecondaryIcon && (
        <a
          href={asset.href}
          target="_blank"
          rel="noreferrer"
          className="release-asset no-external-icon od-bg-2 od-border group relative flex items-center justify-between rounded-r-xl border px-4 py-3 transition-all hover:border-[var(--od-accent)]"
        >
          {SecondaryIcon && (
            <SecondaryIcon className="release-asset-secondary-icon od-text-faint group-hover:od-accent-text h-4 w-4 flex-shrink-0 transition-colors" />
          )}
        </a>
      )}
    </div>
  );
}
