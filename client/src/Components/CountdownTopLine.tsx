import React, { FunctionComponent, Dispatch, SetStateAction } from "react";
import CounterAndButtonGroup from "../Components/CounterAndButtonGroup";
import { createArray } from "../Helpers/createAndSave";
import { setInMemory } from "../Helpers/storage";

interface Props {
  numberArray: { id: number; value: boolean }[];
  setNumberArray: Dispatch<SetStateAction<{ id: number; value: boolean }[]>>;
  numCounter: number;
  setNumCounter: Dispatch<SetStateAction<number>>;
}

const CountdownTopLine: FunctionComponent<Props> = (props) => {
  const { numberArray, setNumberArray, numCounter, setNumCounter } = props;

  const clearSquare = () => {
    let tempArray = createArray(numberArray.length);

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
    const tempCounter =
      numCounter + 1 <= newArray.length ? numCounter + 1 : numCounter;
    setNumberArray(newArray);
    setNumCounter(tempCounter);

    setInMemory("numberArray", newArray);
    setInMemory("numCounter", tempCounter);
  };

  return (
    <CounterAndButtonGroup
      counter={numCounter}
      onPressClear={clearSquare}
      onPressMinus={deleteCross}
    />
  );
};

export default CountdownTopLine;
