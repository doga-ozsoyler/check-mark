export const createArray = (length: number) => {
  return Array.from({ length: length }, () => ({
    id: Math.random(),
    value: false,
  }));
};
