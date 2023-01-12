import React, { FunctionComponent, Dispatch, SetStateAction } from "react";
import { setInMemory } from "../Helpers/storage";
import SquareImage from "./SquareImage";
import CoveringPressable from "./CoveringPressable";

interface Props {
  numberArray: { id: number; value: boolean }[];
  setNumberArray: Dispatch<SetStateAction<{ id: number; value: boolean }[]>>;
  numCounter: number;
  setNumCounter: Dispatch<SetStateAction<number>>;
  visible: boolean;
  setVisible: Dispatch<SetStateAction<boolean>>;
}

const CountdownPressable: FunctionComponent<Props> = (props) => {
  const {
    numberArray,
    setNumberArray,
    numCounter,
    setNumCounter,
    visible,
    setVisible,
  } = props;

  const tickUp = () => {
    let newArray = [...numberArray];
    for (let j = 0; j < newArray.length; j++) {
      if (!newArray[j].value) {
        newArray[j].value = true;
        setNumberArray(newArray);
        setNumCounter(numCounter > 0 ? numCounter - 1 : 0);

        setInMemory("numberArray", numberArray);
        setInMemory("numCounter", numCounter - 1);
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
