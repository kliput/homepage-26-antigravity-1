import { useState } from "react";
import { type ReleaseAsset } from "./types.js";
import { Tooltip } from "react-tooltip";

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

  const clipboardTooltipId = `asset-clipboard-tooltip-${asset.name}`;

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
            className={`od-text group-hover:od-accent-text text-sm transition-colors ${asset.monospaced ? "break-all font-mono" : ""}`}
          >
            {asset.name}
          </p>
          <p className="od-text-faint mt-0.5 text-xs">{asset.description}</p>
        </div>
        <div className="ml-3 flex items-center gap-3">
          {PrimaryIcon && (
            <div
              className="data- relative flex items-center justify-center"
              data-tooltip-id={clipboardTooltipId}
            >
              <Tooltip
                id={clipboardTooltipId}
                content="Copied!"
                place="top"
                isOpen={showTooltip}
                openEvents={{ mouseover: false, focus: false }}
                closeEvents={{ mouseout: false, blur: false }}
                style={{ zIndex: 1 }}
              />
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
