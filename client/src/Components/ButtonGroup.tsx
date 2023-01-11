import React, { Dispatch, SetStateAction, FunctionComponent } from "react";
import { Button } from "native-base";
import { setInMemory } from "../Helpers/storage";

interface Props {
  checkMark: number[];
  setCheckMark: Dispatch<SetStateAction<number[]>>;
}

const ButtonGroup: FunctionComponent<Props> = (props) => {
  const { checkMark, setCheckMark } = props;

  const decreaseCheckMark = async () => {
    let lastElement = checkMark[checkMark.length - 1];

    if (!lastElement || lastElement === 1) {
      setCheckMark(checkMark.slice(0, -1));
    } else {
      let newArr = [...checkMark];
      newArr[newArr.length - 1]--;
      setCheckMark(newArr);
    }

    setInMemory("checkMark", checkMark);
  };

  const clearCheckMark = async () => {
    setCheckMark([]);
    setInMemory("checkMark", checkMark);
  };
  return (
    <Button.Group
      isAttached
      alignSelf="flex-end"
      colorScheme="teal"
      size="sm"
      mr={8}
    >
      <Button onPress={clearCheckMark}>Clear</Button>
      <Button w="45px" variant="outline" onPress={decreaseCheckMark}>
        -
      </Button>
    </Button.Group>
  );
};

export default ButtonGroup;
