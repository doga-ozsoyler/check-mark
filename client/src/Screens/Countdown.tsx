import React, { FC, useState, useEffect } from "react";
import { StyleSheet } from "react-native";
import { Button, View, Text } from "native-base";
import EnterNumberModal from "../Components/EnterNumberModal";
import { setInMemory, getFromMemory } from "../Helpers/storage";
import CountdownPressable from "../Components/CountdownPressable";
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
    setNumCounter(parseInt(number));

    if (parseInt(number)) {
      setNumberArray(
        Array.from({ length: parseInt(number) }, () => ({
          id: Math.random(),
          value: false,
        }))
      );
    }
  };

  const clearSquare = () => {
    let tempArray = Array.from({ length: numberArray.length }, () => ({
      id: Math.random(),
      value: false,
    }));

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
      numCounter + 1 <= numberArray.length ? numCounter + 1 : numCounter
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
      <View flexDirection="row" flex="1" justifyContent="space-between">
        <Text color="#fff" ml={9} fontSize="2xl" alignSelf="flex-end" bold>
          {numCounter ? numCounter : 0}
        </Text>
        <Button.Group
          isAttached
          alignSelf="flex-end"
          colorScheme="teal"
          size="sm"
          mr={8}
        >
          <Button onPress={clearSquare}>Clear</Button>
          <Button w="45px" variant="outline" onPress={deleteCross}>
            +
          </Button>
        </Button.Group>
      </View>
      <CountdownPressable
        numberArray={numberArray}
        setNumberArray={setNumberArray}
        numCounter={numCounter}
        setNumCounter={setNumCounter}
        visible={visible}
        setVisible={setVisible}
      />
      <View flex="1">
        <Button.Group
          isAttached
          alignSelf="center"
          colorScheme="teal"
          size="sm"
          borderRadius="50"
        >
          <Button
            w="100px"
            variant="outline"
            onPress={() => navigation.navigate("MainScreen")}
          >
            Count
          </Button>
          <Button>Countdown</Button>
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

export default CountdownScreen;
