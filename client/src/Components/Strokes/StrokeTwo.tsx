import React, { FunctionComponent } from "react";
import { Image } from "native-base";

const StrokeTwo: FunctionComponent = () => {
  return (
    <Image
      source={require(`../../../assets/2.png`)}
      resizeMode="contain"
      alt="1"
      h="9.5%"
      w="3%"
    />
  );
};

export default StrokeTwo;
