import React, { FC, useState, useEffect } from "react";
import { StyleSheet } from "react-native";
import { Button, View, Text, Pressable, Image, HStack } from "native-base";
import EnterNumberModal from "../Components/EnterNumberModal";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { setInMemory } from "../Helpers/storage";
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

  const onPress = async () => {
    let newArray = [...numberArray];
    for (let j = 0; j < newArray.length; j++) {
      if (!newArray[j]) {
        newArray[j] = true;
        break;
      }
    }
    setNumberArray(newArray);
    setNumber((parseInt(number) > 0 ? parseInt(number) - 1 : 0).toString());

    setInMemory("numberArray", numberArray);
    setInMemory("number", number);
  };

  const clearSquare = async () => {
    let tempArray = [...numberArray];
    setNumberArray(tempArray.fill(false));
    setNumber(tempArray.length.toString());

    setInMemory("numberArray", numberArray);
    setInMemory("number", number);
  };

  const deleteCross = async () => {
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
    const value = await AsyncStorage.getItem("@checkMark:numberArray");
    const parsedValue = value != null ? JSON.parse(value) : null;

    if (parsedValue) {
      setNumberArray(parsedValue !== null ? parsedValue : numberArray);
    }

    const storageValue = await AsyncStorage.getItem("@checkMark:number");
    const storageParsedValue =
      storageValue != null ? JSON.parse(storageValue) : null;

    if (storageParsedValue) {
      setNumber(storageParsedValue !== null ? storageParsedValue : number);
    }

    const visibleValue = await AsyncStorage.getItem("@checkMark:number");
    const visibleParsedValue =
      visibleValue != null ? JSON.parse(visibleValue) : null;

    if (visibleParsedValue) {
      setNumber(visibleParsedValue !== null ? visibleParsedValue : visible);
    }
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
      <View flex="10">
        <Pressable
          onPress={onPress}
          h="100%"
          w="430"
          paddingLeft={10}
          onLongPress={async () => {
            setVisible(true);
            setInMemory("visible", visible);
          }}
        >
          <HStack flexWrap="wrap" h="95%" w="375" mt={5}>
            {numberArray?.map((el, index) => {
              {
                return !el ? (
                  <View key={index}>
                    <Image
                      source={require(`../../assets/empty-square.png`)}
                      h="22"
                      w="22"
                      resizeMode="contain"
                      alt="1"
                      mr={(index + 1) % 5 === 0 ? 3 : 0}
                      mb={2}
                    />
                  </View>
                ) : (
                  <Image
                    source={require(`../../assets/full-square.png`)}
                    h="22"
                    w="22"
                    resizeMode="contain"
                    alt="1"
                    mr={(index + 1) % 5 === 0 ? 3 : 0}
                    mb={2}
                    key={index}
                  />
                );
              }
            })}
          </HStack>
        </Pressable>
      </View>
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
