export const createArray = (length: number) => {
  return Array.from({ length: length }, () => ({
    id: Math.random(),
    value: false,
  }));
};

export const getMarkNumber = (array: number[]) => {
  return (array.length - 1) * 5 + array[array.length - 1];
};
