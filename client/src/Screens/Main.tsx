import React, { FC, useState, useEffect } from "react";
import { StyleSheet } from "react-native";
import { View, Button } from "native-base";
import MainPressable from "../Components/MainPressable";
import { getFromMemory, setInMemory } from "../Helpers/storage";
import CounterAndButtonGroup from "../Components/CounterAndButtonGroup";
interface Props {
  navigation: any;
}

const MainScreen: FC<Props> = ({ navigation }) => {
  const [checkMark, setCheckMark] = useState<number[]>([]);

  const getLocalData = async () => {
    setCheckMark(await getFromMemory("checkMark", checkMark));
  };

  const getMarkNumber = () => {
    return (checkMark.length - 1) * 5 + checkMark[checkMark.length - 1];
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

    setInMemory("checkMark", checkMark);
  };

  const clearCheckMark = async () => {
    setCheckMark([]);
    setInMemory("checkMark", checkMark);
  };

  useEffect(() => {
    getLocalData();
    console.log(checkMark);
  }, []);

  return (
    <View style={styles.container}>
      <CounterAndButtonGroup
        counter={getMarkNumber()}
        onPressClear={clearCheckMark}
        onPressMinus={decreaseCheckMark}
      />

      <MainPressable checkMark={checkMark} setCheckMark={setCheckMark} />
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
