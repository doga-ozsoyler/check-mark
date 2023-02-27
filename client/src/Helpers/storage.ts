import AsyncStorage from "@react-native-async-storage/async-storage";

export const setInMemory = async (itemName: string, item: any) => {
  await AsyncStorage.setItem(`@checkMark:${itemName}`, JSON.stringify(item));
};

export const getFromMemory = async (itemName: string, item: any) => {
  const value = await AsyncStorage.getItem(`@checkMark:${itemName}`);
  const parsedValue = value != null ? JSON.parse(value) : null;

  return parsedValue !== null ? parsedValue : item;
};
