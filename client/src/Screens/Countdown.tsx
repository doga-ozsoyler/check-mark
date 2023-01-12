import React, { FC, useState, useEffect } from "react";
import { StyleSheet } from "react-native";
import { View } from "native-base";
import EnterNumberModal from "../Components/EnterNumberModal";
import { getFromMemory } from "../Helpers/storage";
import CountdownPressable from "../Components/CountdownPressable";
import NavigaterButtonGroup from "../Components/NavigaterButtonGroup";
import { createArray } from "../Helpers/createAndSave";
import CountdownTopLine from "../Components/CountdownTopLine";

interface Props {
  navigation: any;
}

const CountdownScreen: FC<Props> = ({ navigation }) => {
  const [visible, setVisible] = useState<boolean>(false);
  const [numInput, setNumInput] = useState<string>("");
  const [numCounter, setNumCounter] = useState<number>(0);
  const [numberArray, setNumberArray] = useState<
    { id: number; value: boolean }[]
  >([]);

  const handleChange = (number: string) => {
    //Also works: const handleChange: (number: string) => void = (number) => setNumber(number);
    setNumInput(number);

    if (parseInt(number)) {
      setNumCounter(parseInt(number));
      setNumberArray(createArray(parseInt(number)));
    }
  };

  const getCountDown = async () => {
    setNumberArray(await getFromMemory("numberArray", numberArray));
    setNumCounter(await getFromMemory("numCounter", numCounter));
    setVisible(await getFromMemory("visible", visible));
  };

  useEffect(() => {
    getCountDown();
  }, []);

  return (
    <View style={styles.container}>
      <EnterNumberModal
        navigation={navigation}
        setVisible={setVisible}
        visible={visible}
        number={numInput}
        handleChange={handleChange}
      />
      <CountdownTopLine
        numberArray={numberArray}
        setNumberArray={setNumberArray}
        numCounter={numCounter}
        setNumCounter={setNumCounter}
      />

      <CountdownPressable
        numberArray={numberArray}
        setNumberArray={setNumberArray}
        numCounter={numCounter}
        setNumCounter={setNumCounter}
        setVisible={setVisible}
      />
      <NavigaterButtonGroup navigation={navigation} screenName="MainScreen" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#2D3033",
  },
});

export default CountdownScreen;
