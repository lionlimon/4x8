export const jsonSerializer = {
  read: (v: string) => (v ? JSON.parse(v) : null),
  write: (v: unknown) => JSON.stringify(v),
};
