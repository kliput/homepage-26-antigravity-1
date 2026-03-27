import path from "node:path";
import fs from "node:fs";
import { getAbsoluteApiPath, getApiDir, getAvailableVersions } from "./api";

export async function getStaticPaths() {
  const apiDir = getApiDir();
  const versions = getAvailableVersions();

  let paths: any[] = [];

  for (const version of versions) {
    const versionDir = path.join(apiDir, version);
    const products = ["onezone", "oneprovider", "onepanel"];

    for (const product of products) {
      const swaggerPath = path.join(versionDir, `${product}.json`);
      if (!fs.existsSync(swaggerPath)) {
        console.warn(`API ${version} ${product} not found`);
        continue;
      }

      try {
        const swaggerData = JSON.parse(fs.readFileSync(swaggerPath, "utf8"));
        const apiPaths = swaggerData.paths || {};

        // Group operations
        const groupsMap = new Map();

        Object.entries(apiPaths).forEach(
          ([endpointPattern, methods]: [string, any]) => {
            Object.entries(methods).forEach(([method, op]: [string, any]) => {
              const groupName =
                op.tags && op.tags.length > 0 ? op.tags[0] : "General";
              const slug = `operation/${op.operationId}`;

              if (!groupsMap.has(groupName)) {
                groupsMap.set(groupName, { name: groupName, operations: [] });
              }

              const operationData = {
                href: getAbsoluteApiPath(version, product, slug),
                method,
                summary: op.summary || endpointPattern,
                endpointPath: endpointPattern,
                details: op,
                deprecated: op.deprecated,
              };

              groupsMap.get(groupName).operations.push(operationData);

              paths.push({
                params: { version, product, slug },
                props: {
                  version,
                  product,
                  operation: operationData,
                  swaggerData,
                },
              });
            });
          },
        );

        // Add index path for the product dashboard (default to first endpoint or empty)
        paths.push({
          params: { version, product, slug: undefined },
          props: { version, product, operation: null, swaggerData },
        });
      } catch (e) {
        console.error(`Error processing ${swaggerPath}`, e);
      }
    }
  }

  // Need to pass availableVersions and sidebarGroups correctly to each page
  // We'll reconstruct sidebarGroups dynamically inside the component instead to simplify getStaticPaths

  return paths;
}
