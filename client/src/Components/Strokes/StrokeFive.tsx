import React, { FunctionComponent } from "react";
import { Image } from "native-base";

const StrokeFive: FunctionComponent = () => {
  return (
    <Image
      source={require("../../../assets/5.png")}
      resizeMode="contain"
      alt="1"
      h="70"
      w="60"
      mb={3}
    />
  );
};

export default StrokeFive;
