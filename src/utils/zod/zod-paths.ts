import _ from "lodash";
import Zod from "zod";

export type ZodPathType = {
  path: string;
  type: string;
};

export const getPropertyPaths = (schema: Zod.ZodType): ZodPathType[] => {
  const pathTypes: ZodPathType[] = [];
  _getPropertyPaths(schema, pathTypes);
  return pathTypes;
};

export const _getPropertyPaths = (
  schema: Zod.ZodType,
  pathTypes: ZodPathType[] = []
): string[] => {
  if (schema instanceof Zod.ZodEffects) {
    return _getPropertyPaths(schema._def?.schema ?? schema, pathTypes);
  }

  if (schema instanceof Zod.ZodNullable || schema instanceof Zod.ZodOptional) {
    return _getPropertyPaths(schema.unwrap(), pathTypes);
  }

  if (schema instanceof Zod.ZodArray) {
    return _getPropertyPaths(schema.element, pathTypes);
  }

  if (schema instanceof Zod.ZodObject) {
    const entries = Object.entries<Zod.ZodType>(schema.shape);

    const outputMap = entries.flatMap(([key, value]) => {
      const nested = _getPropertyPaths(value, pathTypes).map(
        (subKey) => `${key}.${subKey}`
      );

      const type = _.get(value, "_def.typeName") as unknown as string;

      pathTypes.push({ path: key, type });
      return nested.length ? nested : key;
    });

    return outputMap;
  }

  if (schema instanceof Zod.ZodDiscriminatedUnion) {
    const options = schema.options;
    return options.flatMap((option: Zod.ZodType) =>
      _getPropertyPaths(option, pathTypes)
    );
  }

  return [];
};
