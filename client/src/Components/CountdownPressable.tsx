import React, { FunctionComponent, Dispatch, SetStateAction } from "react";
import { View, Pressable, HStack } from "native-base";
import { setInMemory } from "../Helpers/storage";
import SquareImage from "./SquareImage";

interface Props {
  numberArray: boolean[];
  setNumberArray: Dispatch<SetStateAction<boolean[]>>;
  number: string;
  setNumber: Dispatch<SetStateAction<string>>;
  visible: boolean;
  setVisible: Dispatch<SetStateAction<boolean>>;
}

const CountdownPressable: FunctionComponent<Props> = (props) => {
  const {
    numberArray,
    setNumberArray,
    number,
    setNumber,
    visible,
    setVisible,
  } = props;

  const onPress = () => {
    let newArray = [...numberArray];
    for (let j = 0; j < newArray.length; j++) {
      if (!newArray[j]) {
        newArray[j] = true;
        setNumberArray(newArray);
        setNumber((parseInt(number) > 0 ? parseInt(number) - 1 : 0).toString());

        setInMemory("numberArray", numberArray);
        setInMemory("number", number);
        break;
      }
    }
  };

  const onLongPress = () => {
    setVisible(true);
    setInMemory("visible", visible);
  };

  return (
    <View flex="10">
      <Pressable
        onPress={onPress}
        h="100%"
        w="430"
        paddingLeft={10}
        onLongPress={onLongPress}
      >
        <HStack flexWrap="wrap" h="95%" w="375" mt={5}>
          {numberArray?.map((el, index) => {
            {
              return !el ? (
                <SquareImage
                  key={index}
                  pngPath={`../../assets/empty-square.png`}
                />
              ) : (
                <SquareImage
                  key={index}
                  pngPath={`../../assets/full-square.png`}
                />
              );
            }
          })}
        </HStack>
      </Pressable>
    </View>
  );
};

export default CountdownPressable;
