import React, { FunctionComponent } from "react";
import { Image } from "native-base";

const StrokeOne: FunctionComponent = () => {
  return (
    <Image
      source={require(`../../../assets/1.png`)}
      resizeMode="contain"
      alt="1"
      h="9.5%"
      w="3%"
      ml={1.5}
    />
  );
};

export default StrokeOne;
