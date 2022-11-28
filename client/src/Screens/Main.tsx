import React, { FC, useState } from "react";
import { Center, Text, NativeBaseProvider, Button } from "native-base";

const MainScreen: FC = () => {
  const [checkMark, setCheckMark] = useState(0);

  const [letter, setLetter] = useState("");

  const onPress = () => {
    setLetter((letter) => letter + "I");
  };

  return (
    <NativeBaseProvider>
      <Center flex={1} px="3">
        <Text color="#fff">I{letter}</Text>
        <Button onPress={onPress}>Click Me</Button>
      </Center>
    </NativeBaseProvider>
  );
};

export default MainScreen;
