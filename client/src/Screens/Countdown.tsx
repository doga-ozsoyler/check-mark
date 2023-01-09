import React, { FC, useState } from "react";
import { Button, View } from "native-base";
import EnterNumberModal from "../Components/EnterNumberModal";

interface Props {
  navigation: any;
}

const CountdownScreen: FC<Props> = ({ navigation }) => {
  const [visible, setVisible] = useState<boolean>(true);
  const [number, setNumber] = useState<string>("");

  const handleChange = (number: string) => setNumber(number); //Also works: const handleChange: (number: string) => void = (number) => setNumber(number);

  return (
    <View flex="1" alignItems="center" justifyContent="center">
      <Button onPress={() => setVisible(true)}>Open Modal</Button>
      <EnterNumberModal
        navigation={navigation}
        visible={visible}
        setVisible={setVisible}
        number={number}
        handleChange={handleChange}
      />
    </View>
  );
};

export default CountdownScreen;
