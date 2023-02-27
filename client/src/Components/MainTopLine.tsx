import React, { FunctionComponent, Dispatch, SetStateAction } from "react";
import { setInMemory } from "../Helpers/storage";
import CounterAndButtonGroup from "../Components/CounterAndButtonGroup";
import { getMarkNumber } from "../Helpers/createAndSave";

interface Props {
  checkMark: number[];
  setCheckMark: Dispatch<SetStateAction<number[]>>;
}

const MainTopLine: FunctionComponent<Props> = (props) => {
  const { checkMark, setCheckMark } = props;

  const decreaseCheckMark = async () => {
    let lastElement = checkMark[checkMark.length - 1];
    let tempArray = [...checkMark];

    if (!lastElement || lastElement === 1) {
      tempArray = checkMark.slice(0, -1);
    } else {
      tempArray[tempArray.length - 1]--;
    }

    setCheckMark(tempArray);
    setInMemory("checkMark", tempArray);
  };

  const clearCheckMark = async () => {
    setCheckMark([]);
    setInMemory("checkMark", []);
  };

  return (
    <CounterAndButtonGroup
      counter={getMarkNumber(checkMark)}
      onPressClear={clearCheckMark}
      onPressMinus={decreaseCheckMark}
    />
  );
};

export default MainTopLine;
