export const checkIsInRange = (str: string | undefined, substr: string) => {
  return !!str?.toLowerCase().includes(substr.toLowerCase());
};