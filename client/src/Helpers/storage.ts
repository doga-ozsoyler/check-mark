import AsyncStorage from "@react-native-async-storage/async-storage";

export const setInMemory = async (itemName: string, item: any) => {
  await AsyncStorage.setItem(`@checkMark:${itemName}`, JSON.stringify(item));
};
