import React, { FunctionComponent, Dispatch, SetStateAction } from "react";
import { setInMemory } from "../Helpers/storage";
import CoveringPressable from "./CoveringPressable";
import StrokeOne from "./Strokes/StrokeOne";
import StrokeTwo from "./Strokes/StrokeTwo";
import StrokeThree from "./Strokes/StrokeThree";
import StrokeFour from "./Strokes/StrokeFour";
import StrokeFive from "./Strokes/StrokeFive";

interface Props {
  checkMark: number[];
  setCheckMark: Dispatch<SetStateAction<number[]>>;
}

const ScreenPressable: FunctionComponent<Props> = (props) => {
  const { checkMark, setCheckMark } = props;

  const addCheckMark = async () => {
    let lastElement = checkMark[checkMark.length - 1];
    let tempArray = [...checkMark];

    if (!lastElement || lastElement === 5) {
      tempArray = [...tempArray, 1];
    } else {
      tempArray[tempArray.length - 1]++;
    }

    setCheckMark(tempArray);
    setInMemory("checkMark", tempArray);
  };

  return (
    <CoveringPressable onPress={addCheckMark}>
      {checkMark.map((element, index) => {
        if (element === 5) {
          return <StrokeFive key={index} />;
        } else {
          return Array(element)
            .fill(true)
            .map((_, index) => {
              if (index === 0) {
                return <StrokeOne key={index} />;
              } else if (index === 1) {
                return <StrokeTwo key={index} />;
              } else if (index === 2) {
                return <StrokeThree key={index} />;
              } else {
                return <StrokeFour key={index} />;
              }
            });
        }
      })}
    </CoveringPressable>
  );
};

export default ScreenPressable;
