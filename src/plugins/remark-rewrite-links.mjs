import { visit } from "unist-util-visit";
import path from "node:path";

export function remarkRewriteLinks() {
  return (tree, file) => {
    // file.history contains the absolute path to the current markdown file
    const filePath = file.history[0];
    if (!filePath) return;

    // We expect files to be in src/content/docs/[version]/[chapter]/...
    const docsMatch = filePath.match(/\/src\/content\/docs\/(.+)$/);
    if (!docsMatch) return;

    const relToDocs = docsMatch[1]; // e.g. "25/admin-guide/demo-mode.md"

    // The directory containing the current markdown file
    const currentDir = path.dirname(filePath);

    function transformUrl(url) {
      // Only transform internal relative links pointing to .md or .mdx files
      if (
        url.startsWith("http") ||
        url.startsWith("/") ||
        url.startsWith("#")
      ) {
        return url;
      }

      // Check if it looks like a markdown file link
      const match = url.match(/^([^#?]+)(\.md|\.mdx)(#.*|(?:\?.*)?)?$/);
      if (match) {
        const [_, relPath, ext, hashOrQuery] = match;
        const targetPathFull = path.resolve(currentDir, relPath + ext);

        const targetDocsMatch = targetPathFull.match(
          /\/src\/content\/docs\/(.+)$/,
        );
        if (targetDocsMatch) {
          const targetRelToDocs = targetDocsMatch[1]; // e.g. "25/user-guide/quickstart.md"
          const targetParts = targetRelToDocs.replace(/\.mdx?$/, "").split("/");
          const targetVersion = targetParts[0];
          const targetChapter = targetParts[1];
          const targetSlug = targetParts.slice(2).join("/");

          let newUrl = `/docs/${targetVersion}/${targetChapter}`;
          if (targetSlug) {
            newUrl += `/${targetSlug}`;
          }
          if (hashOrQuery) {
            newUrl += hashOrQuery;
          }
          // Special URLs to index.md pages that have finally the slug without /index
          // Eg. ../glossary/glossary.md -> /docs/25/glossary
          newUrl = newUrl.replace(/\/index$/, "");
          return newUrl;
        }
      }
      return url;
    }

    visit(tree, ["link", "definition"], (node) => {
      if (node.url) {
        node.url = transformUrl(node.url);
      }
    });
  };
}
