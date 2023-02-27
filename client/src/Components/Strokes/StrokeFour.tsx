import React, { FunctionComponent } from "react";
import { Image } from "native-base";

const StrokeFour: FunctionComponent = () => {
  return (
    <Image
      source={require(`../../../assets/4.png`)}
      resizeMode="contain"
      alt="1"
      h="9.5%"
      w="2.5%"
      ml={0.5}
    />
  );
};

export default StrokeFour;
