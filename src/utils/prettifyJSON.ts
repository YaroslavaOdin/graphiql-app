export const prettifyJSON = (value: string): string => {
  return value ? JSON.stringify(JSON.parse(value), null, 2) : value;
};
