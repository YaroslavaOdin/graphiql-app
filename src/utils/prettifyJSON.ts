export const prettifyJSON = (value: string): string => {
  return JSON.stringify(JSON.parse(value), null, 2);
};
