import React, { FunctionComponent, Dispatch, SetStateAction } from "react";
import { setInMemory } from "../Helpers/storage";
import SquareImage from "./SquareImage";
import CoveringPressable from "./CoveringPressable";
import { View } from "react-native";
import { Image } from "native-base";

interface Props {
  numberArray: { id: number; value: boolean }[];
  setNumberArray: Dispatch<SetStateAction<{ id: number; value: boolean }[]>>;
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

  const tickUp = () => {
    let newArray = [...numberArray];
    for (let j = 0; j < newArray.length; j++) {
      if (!newArray[j].value) {
        newArray[j].value = true;
        setNumberArray(newArray);
        setNumber((parseInt(number) > 0 ? parseInt(number) - 1 : 0).toString());

        setInMemory("numberArray", numberArray);
        setInMemory("number", number);
        break;
      }
    }
  };

  const openModal = () => {
    setVisible(true);
    setInMemory("visible", visible);
  };

  return (
    <CoveringPressable onPress={tickUp} onLongPress={openModal}>
      {numberArray?.map((element, index) => {
        return (
          <SquareImage
            index={index}
            squareType={element.value}
            key={element.value ? element.id : element.id + 1}
          />
        );
      })}
    </CoveringPressable>
  );
};

export default CountdownPressable;
