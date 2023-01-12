import React, { FC, useState, useEffect } from "react";
import { StyleSheet } from "react-native";
import { View } from "native-base";
import EnterNumberModal from "../Components/EnterNumberModal";
import { setInMemory, getFromMemory } from "../Helpers/storage";
import CountdownPressable from "../Components/CountdownPressable";
import CounterAndButtonGroup from "../Components/CounterAndButtonGroup";
import NavigaterButtonGroup from "../Components/NavigaterButtonGroup";
import { createArray } from "../Helpers/createAndSave";

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

  const clearSquare = () => {
    let tempArray = createArray(numberArray.length);

    setNumberArray(tempArray);
    setNumCounter(tempArray.length);

    setInMemory("numberArray", tempArray);
    setInMemory("numCounter", tempArray.length);
  };

  const deleteCross = () => {
    let newArray = [...numberArray];
    for (let i = newArray.length - 1; i >= 0; i--) {
      if (newArray[i].value) {
        newArray[i].value = false;
        break;
      }
    }
    setNumberArray(newArray);
    setNumCounter(
      numCounter + 1 <= newArray.length ? numCounter + 1 : numCounter
    );

    setInMemory("numberArray", numberArray);
    setInMemory("numCounter", numCounter);
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
      <CounterAndButtonGroup
        counter={numCounter}
        onPressClear={clearSquare}
        onPressMinus={deleteCross}
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
