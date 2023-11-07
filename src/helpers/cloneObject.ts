export const cloneObject = <T extends Record<string, unknown>>(object: T) => {
  const json = JSON.stringify(object);
  return JSON.parse(json);
};
