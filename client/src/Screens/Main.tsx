import React, { FC, useState, useEffect } from "react";
import { StyleSheet } from "react-native";
import { View, Text, Button } from "native-base";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ScreenPressable from "../Components/ScreenPressable";
import ButtonGroup from "../Components/ButtonGroup";
interface Props {
  navigation: any;
}

const MainScreen: FC<Props> = ({ navigation }) => {
  const [checkMark, setCheckMark] = useState<number[]>([]);

  const getLocalData = async () => {
    const value = await AsyncStorage.getItem("@checkMark:checkMark");
    const parsedValue = value != null ? JSON.parse(value) : null;

    if (parsedValue) {
      setCheckMark(parsedValue !== null ? parsedValue : checkMark);
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
      <View flex="1">
        <Button.Group
          isAttached
          alignSelf="center"
          colorScheme="teal"
          size="sm"
          borderRadius="50"
        >
          <Button w="100px">Count</Button>
          <Button
            variant="outline"
            onPress={() => navigation.navigate("CountdownScreen")}
          >
            Countdown
          </Button>
        </Button.Group>
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
