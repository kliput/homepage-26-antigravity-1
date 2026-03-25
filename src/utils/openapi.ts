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
