import { visit } from "unist-util-visit";
import recentVersionMap from "../config/recent-version.mjs";

export function remarkReleaseVersion() {
  const debugMessagesEnabled = ![undefined, null, "0", "false"].includes(
    process.env.DEBUG,
  );
  return (tree, file) => {
    const filePath = file.history[0];
    if (!filePath) return;

    // We expect files to be in src/content/docs/[version]/...
    const docsMatch = filePath.match(/\/src\/content\/docs\/(.+)$/);
    if (!docsMatch) return;

    const relToDocs = docsMatch[1];
    const version = relToDocs.split("/")[0];
    const fullVersion =
      recentVersionMap[version] ?? Object.values(recentVersionMap)[0];

    if (debugMessagesEnabled) {
      console.error(
        `[remarkReleaseVersion] Processing ${relToDocs}, version=${version}, fullVersion=${fullVersion}`,
      );
    }

    // Replace <release /> in text, html, code, and inlineCode nodes
    visit(tree, (node) => {
      if (node.value && node.value.includes("<release")) {
        if (debugMessagesEnabled) {
          console.error(
            `[remarkReleaseVersion] Found <release in node type: ${node.type}`,
          );
        }
        if (["text", "html", "code", "inlineCode"].includes(node.type)) {
          if (debugMessagesEnabled) {
            console.error(`[remarkReleaseVersion] Replacing in ${node.type}`);
          }
          node.value = node.value.replace(/<release\s*\/>/g, fullVersion);
        } else {
          if (debugMessagesEnabled) {
            console.error(
              `[remarkReleaseVersion] NOT replacing in ${node.type} because it's not in the list`,
            );
          }
        }
      }
    });
  };
}
