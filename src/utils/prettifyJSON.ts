export const prettifyJSON = (value: string): string => {
  try {
    return value ? JSON.stringify(JSON.parse(value), null, 2) : value;
  } catch (error) {
    throw new Error('Invalid json');
  }
};
