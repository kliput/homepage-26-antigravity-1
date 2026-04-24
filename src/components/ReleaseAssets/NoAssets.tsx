type NoAssetsParams = {
  text: string;
};
export default function NoAsset({ text }: NoAssetsParams) {
  return <div className="od-text-faint py-1 text-xs italic">{text}</div>;
}
