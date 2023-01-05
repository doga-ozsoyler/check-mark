import React, { FC, useState, useEffect } from "react";
import { NativeBaseProvider, HStack, Button, View } from "native-base";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ScreenPressable from "../Components/ScreenPressable";

const MainScreen: FC = () => {
  const [checkMark, setCheckMark] = useState<number[]>([]);

  const getLocalData = async () => {
    const value = await AsyncStorage.getItem("@checkMark:checkMark");
    const parsedValue = value != null ? JSON.parse(value) : null;

    if (parsedValue) {
      setCheckMark(
        parsedValue.checkMark !== null ? parsedValue.checkMark : checkMark
      );
    }
  };

  const decreaseCheckMark = async () => {
    let lastElement = checkMark[checkMark.length - 1];

    if (!lastElement || lastElement === 1) {
      setCheckMark(checkMark.slice(0, -1));
    } else {
      let newArr = [...checkMark];
      newArr[newArr.length - 1]--;
      setCheckMark(newArr);
    }

    await AsyncStorage.setItem(
      "@checkMark",
      JSON.stringify({ checkMark: checkMark })
    );
  };

  useEffect(() => {
    getLocalData();
  }, []);

  return (
    <NativeBaseProvider>
      <View flex="1">
        <View flex="1">
          <HStack
            justifyContent="space-between"
            alignItems="flex-end"
            alignSelf="center"
            h="100%"
            w="350"
          >
            <Button onPress={() => setCheckMark([])}>Clear</Button>
            <Button onPress={decreaseCheckMark}>-</Button>
          </HStack>
        </View>
        <View flex="10">
          <ScreenPressable checkMark={checkMark} setCheckMark={setCheckMark} />
        </View>
      </View>
    </NativeBaseProvider>
  );
};

export default MainScreen;
