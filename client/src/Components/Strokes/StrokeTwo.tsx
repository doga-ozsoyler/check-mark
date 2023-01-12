import React, { FunctionComponent } from "react";
import { Image } from "native-base";

const StrokeTwo: FunctionComponent = () => {
  return (
    <Image
      source={require(`../../../assets/2.png`)}
      resizeMode="contain"
      alt="1"
      h="70"
      w="2.5"
    />
  );
};

export default StrokeTwo;
