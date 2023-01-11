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
  const [number, setNumber] = useState<string>("");
  const [numberArray, setNumberArray] = useState<boolean[]>([]);

  const handleChange = (number: string) => {
    //Also works: const handleChange: (number: string) => void = (number) => setNumber(number);
    setNumber(number);

    if (parseInt(number)) {
      setNumberArray(Array(parseInt(number)).fill(false));
    }
  };

  const clearSquare = () => {
    let tempArray = [...numberArray];
    setNumberArray(tempArray.fill(false));
    setNumber(tempArray.length.toString());

    setInMemory("numberArray", numberArray);
    setInMemory("number", number);
  };

  const deleteCross = () => {
    let newArray = [...numberArray];
    for (let i = newArray.length - 1; i >= 0; i--) {
      if (newArray[i]) {
        newArray[i] = false;
        break;
      }
    }
    setNumberArray(newArray);

    let tempNum =
      parseInt(number) + 1 <= numberArray.length
        ? parseInt(number) + 1
        : parseInt(number);
    setNumber(tempNum.toString());

    setInMemory("numberArray", numberArray);
    setInMemory("number", number);
  };

  const getCountDown = async () => {
    setNumberArray(await getFromMemory("numberArray", numberArray));
    setNumber(await getFromMemory("number", number));
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
        number={number}
        handleChange={handleChange}
      />
      <View flexDirection="row" flex="1" justifyContent="space-between">
        <Text color="#fff" ml={9} fontSize="2xl" alignSelf="flex-end" bold>
          {parseInt(number) ? parseInt(number) : 0}
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
        number={number}
        setNumber={setNumber}
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
