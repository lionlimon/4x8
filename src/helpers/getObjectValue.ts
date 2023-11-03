export const getObjectValue = <
  T extends Record<string, unknown>,
  K extends keyof T,
>(obj: T, path: K) => {
  const keys = String(path).split('.');
  let value = obj;

  for (const key of keys) {
    if (value && typeof value === 'object' && key in value) {
      value = value[key] as T;
    } else {
      return undefined;
    }
  }

  return value;
};
