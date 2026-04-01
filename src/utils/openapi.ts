export type SchemaDefinition = {
  type?: string;
  description?: string;
  properties?: Record<string, SchemaDefinition>;
  additionalProperties?: SchemaDefinition | boolean;
  items?: SchemaDefinition;
  required?: string[];
  enum?: any[];
  example?: object;
  $ref?: string;
  allOf?: SchemaDefinition[];
  [key: string]: any;
};

export function resolveSchemaRef(
  schema: SchemaDefinition | undefined,
  rootConfig: any,
): SchemaDefinition | undefined {
  if (!schema) return schema;
  if (!schema.$ref) return schema;

  const refPath = schema.$ref.replace(/^#\//, "");
  const parts = refPath.split("/");
  let target = rootConfig;

  for (const part of parts) {
    if (!target) return undefined;
    target = target[part];
  }

  if (target) {
    // Merge target schema with current schema, but remove $ref
    const { $ref, ...rest } = schema;
    return { ...target, ...rest };
  }

  return schema;
}

/**
 * We introduced this helper to properly handle OpenAPI 2 allOf inheritance. If a schema
 * contains allOf, it resolves and deeply merges the respective properties and required
 * arrays of all listed parents/components.
 */
export function resolveAllOf(
  schema: SchemaDefinition | undefined,
  rootConfig: any,
): SchemaDefinition | undefined {
  if (!schema) return schema;
  const resolved = resolveSchemaRef(schema, rootConfig);
  if (!resolved) return resolved;

  if (resolved.allOf) {
    const merged = {
      ...resolved,
      properties: { ...resolved.properties },
      required: [...(resolved.required || [])],
    };
    for (const part of resolved.allOf) {
      const resolvedPart = resolveAllOf(part, rootConfig);
      if (resolvedPart && resolvedPart.properties) {
        merged.properties = {
          ...merged.properties,
          ...resolvedPart.properties,
        };
      }
      if (resolvedPart && resolvedPart.required) {
        merged.required = [...merged.required, ...resolvedPart.required];
      }
    }
    delete merged.allOf;
    return merged;
  }
  return resolved;
}

/**
 * By utilizing resolveAllOf, this helper calculates the difference between a base schema
 * and its specific subclass. This prevents the duplication of base properties (like the
 * discriminator field itself) when rendering subclass-specific properties.
 */
export function getSubclassProperties(
  baseSchema: SchemaDefinition,
  subclassSchema: SchemaDefinition,
  rootConfig: any,
): Record<string, SchemaDefinition> {
  const subclassMerged = resolveAllOf(subclassSchema, rootConfig);
  if (!subclassMerged || !subclassMerged.properties) return {};

  const baseProperties = baseSchema.properties || {};
  const additional: Record<string, SchemaDefinition> = {};

  for (const [k, v] of Object.entries(subclassMerged.properties)) {
    if (!baseProperties[k]) {
      additional[k] = v;
    }
  }
  return additional;
}

/**
 * A deterministic helper that crawls an object's provided array of subclass references
 * (x-onedata-subclasses). If absent, it automatically infers subclass relationships by
 * scanning allOf directives from all system definitions that point back to the parent
 * class.
 */
export function getSubclasses(
  schema: SchemaDefinition,
  rootConfig: any,
  modelName?: string,
): { name: string; schema: SchemaDefinition }[] {
  let subclassNames: string[] = schema["x-onedata-subclasses"] || [];

  if (subclassNames.length === 0 && modelName && rootConfig.definitions) {
    for (const [defName, def] of Object.entries(rootConfig.definitions)) {
      const defSchema = def as SchemaDefinition;
      if (defSchema.allOf) {
        const hasBaseRef = defSchema.allOf.some(
          (a: any) => a.$ref === `#/definitions/${modelName}`,
        );
        if (hasBaseRef) {
          subclassNames.push(defName);
        }
      }
    }
  }

  return subclassNames
    .map((name) => {
      return {
        name,
        schema: resolveSchemaRef(
          { $ref: `#/definitions/${name}` },
          rootConfig,
        ) as SchemaDefinition,
      };
    })
    .filter((opt) => opt.schema !== undefined);
}
