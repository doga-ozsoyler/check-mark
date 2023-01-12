import React, { FunctionComponent } from "react";
import { Image } from "native-base";

const StrokeThree: FunctionComponent = () => {
  return (
    <Image
      source={require(`../../../assets/3.png`)}
      resizeMode="contain"
      alt="1"
      h="70"
      w="3"
    />
  );
};

export default StrokeThree;
