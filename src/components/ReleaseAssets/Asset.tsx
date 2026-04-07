import { type ReleaseAsset } from "./types.js";

export function Asset({ asset }: { asset: ReleaseAsset }) {
  const SecondaryIcon = asset.secondaryIcon;
  const PrimaryIcon = asset.primaryIcon;
  return (
    <a
      href={asset.href}
      target="_blank"
      rel="noreferrer"
      className="release-asset no-external-icon od-bg-2 od-border group flex items-center justify-between rounded-xl border px-4 py-3 transition-all hover:border-[var(--od-accent)]"
    >
      <div>
        <p
          className={`od-text group-hover:od-accent-text text-sm transition-colors ${asset.monospaced ? "font-mono" : ""}`}
        >
          {asset.name}
        </p>
        <p className="od-text-faint mt-0.5 text-xs">{asset.description}</p>
      </div>
      {PrimaryIcon && (
        <PrimaryIcon className="release-asset-primary-icon od-text-faint group-hover:od-accent-text ml-3 h-4 w-4 flex-shrink-0 transition-colors" />
      )}
      {SecondaryIcon && (
        <SecondaryIcon className="release-asset-secondary-icon od-text-faint group-hover:od-accent-text ml-3 h-4 w-4 flex-shrink-0 transition-colors" />
      )}
    </a>
  );
}
