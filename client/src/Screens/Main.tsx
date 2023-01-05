import React, { FC, useState, useEffect } from "react";
import {
  NativeBaseProvider,
  Image,
  HStack,
  Pressable,
  Button,
  View,
} from "native-base";
import AsyncStorage from "@react-native-async-storage/async-storage";

const MainScreen: FC = () => {
  const [checkMark, setCheckMark] = useState<number[]>([]);
  const [strokeNum, setStrokeNum] = useState<number>(0);

  const getLocalData = async () => {
    const value = await AsyncStorage.getItem("@checkMark:checkMark");
    const parsedValue = value != null ? JSON.parse(value) : null;

    if (parsedValue) {
      setCheckMark(
        parsedValue.checkMark !== null ? parsedValue.checkMark : checkMark
      );
      setStrokeNum(
        parsedValue.strokeNum !== null ? parsedValue.strokeNum : strokeNum
      );
    }
  };

  const addCheckMark = async () => {
    let lastElement = checkMark[checkMark.length - 1];

    if (!lastElement || lastElement === 5) {
      setCheckMark([...checkMark, 1]);
    } else {
      let newArr = [...checkMark];
      newArr[newArr.length - 1]++;
      setCheckMark(newArr);
    }

    setStrokeNum(strokeNum + 1);
    await AsyncStorage.setItem(
      "@checkMark",
      JSON.stringify({ strokeNum: strokeNum, checkMark: checkMark })
    );
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

    setStrokeNum(strokeNum - 1);
    await AsyncStorage.setItem(
      "@checkMark",
      JSON.stringify({ strokeNum: strokeNum, checkMark: checkMark })
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
          <Pressable onPress={addCheckMark} h="100%" w="430" paddingLeft={10}>
            <HStack flexWrap="wrap" h="95%" w="375" mt={5}>
              {checkMark.map((element, index) => {
                if (element === 5) {
                  return (
                    <Image
                      source={require("../../assets/5.png")}
                      resizeMode="contain"
                      alt="1"
                      h="70"
                      w="60"
                      mb={3}
                      key={index}
                    />
                  );
                } else {
                  return Array(element)
                    .fill(true)
                    .map((_, index) => {
                      if (index === 0) {
                        return (
                          <Image
                            source={require(`../../assets/1.png`)}
                            resizeMode="contain"
                            alt="1"
                            h="70"
                            w="3"
                            ml={1.5}
                            key={index}
                          />
                        );
                      } else if (index === 1) {
                        return (
                          <Image
                            source={require(`../../assets/2.png`)}
                            resizeMode="contain"
                            alt="1"
                            h="70"
                            w="2.5"
                            key={index}
                          />
                        );
                      } else if (index === 2) {
                        return (
                          <Image
                            source={require(`../../assets/3.png`)}
                            resizeMode="contain"
                            alt="1"
                            h="70"
                            w="3"
                            key={index}
                          />
                        );
                      } else {
                        return (
                          <Image
                            source={require(`../../assets/4.png`)}
                            resizeMode="contain"
                            alt="1"
                            h="70"
                            w="2"
                            ml={0.5}
                            key={index}
                          />
                        );
                      }
                    });
                }
              })}
            </HStack>
          </Pressable>
        </View>
      </View>
    </NativeBaseProvider>
  );
};

export default MainScreen;
