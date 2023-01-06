import React, { FC, useState, useEffect } from "react";
import { StyleSheet } from "react-native";
import { View, Text } from "native-base";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ScreenPressable from "../Components/ScreenPressable";
import ButtonGroup from "../Components/ButtonGroup";

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

  const getMarkNumber = () => {
    return (checkMark.length - 1) * 5 + checkMark[checkMark.length - 1];
  };

  useEffect(() => {
    getLocalData();
  }, []);

  return (
    <View style={styles.container}>
      <View flexDirection="row" flex="1" justifyContent="space-between">
        <Text color="#fff" ml={9} fontSize="2xl" alignSelf="flex-end" bold>
          {getMarkNumber() ? getMarkNumber() : 0}
        </Text>

        <ButtonGroup checkMark={checkMark} setCheckMark={setCheckMark} />
      </View>
      <View flex="10">
        <ScreenPressable checkMark={checkMark} setCheckMark={setCheckMark} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#2D3033",
  },
});

export default MainScreen;
