import React, { FC, useState } from "react";
import {
  Center,
  Text,
  NativeBaseProvider,
  Button,
  Image,
  HStack,
  Pressable,
} from "native-base";

const MainScreen: FC = () => {
  const [checkMark, setCheckMark] = useState<number[]>([]);

  const [letter, setLetter] = useState("");

  const onPress = () => {
    setLetter((letter) => letter + "I");
  };

  return (
    <NativeBaseProvider>
      <Center flex={1} px="3">
        <Pressable
          onPress={() => {
            let lastElement = checkMark[checkMark.length - 1];
            if (!lastElement || lastElement === 5) {
              setCheckMark([...checkMark, 1]);
            } else {
              let newArr = [...checkMark];
              newArr[newArr.length - 1]++;
              setCheckMark(newArr);
            }
          }}
          h="100%"
          w="430"
          padding={10}
        >
          <Center>
            <HStack h="95%" w="350" background={"blue.400"}>
              {checkMark.map((element, index) => {
                if (element === 5) {
                  return (
                    <Image
                      source={require("../../assets/5.png")}
                      resizeMode="contain"
                      alt="1"
                      h="70"
                      w="60"
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
          </Center>
        </Pressable>
      </Center>
    </NativeBaseProvider>
  );
};

export default MainScreen;
