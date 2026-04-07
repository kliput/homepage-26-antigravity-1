import { type LucideIcon } from "lucide-react";

export type ProductId =
  | "onezone"
  | "oneprovider"
  | "oneclient"
  | "onedatafs"
  | "onedatarestfs"
  | "onedatafilerestclient"
  | "restcli";

export interface ReleaseAsset {
  name: string;
  monospaced?: boolean;
  copyable?: boolean;
  primaryIcon: LucideIcon;
  secondaryIcon?: LucideIcon;
  description: string;
  href?: string;
}

export type AssetTab = {
  key: ProductId;
  icon: LucideIcon;
  label: string;
  sub?: string;
};

export type AssetSection = {
  icon: LucideIcon;
  title: string;
  assets: ReleaseAsset[];
};

export type ProductAssets = {
  tab: AssetTab;
  sections: AssetSection[];
};

export type AssetsCollection = Record<ProductId, ProductAssets>;
