import React, { FunctionComponent } from "react";
import { View, Image } from "native-base";

interface Props {
  key: number;
  pngPath: string;
}

const SquareImage: FunctionComponent<Props> = (props) => {
  const { key, pngPath } = props;

  return (
    <View key={key}>
      <Image
        source={require(pngPath)}
        h="22"
        w="22"
        resizeMode="contain"
        alt="1"
        mr={(key + 1) % 5 === 0 ? 3 : 0}
        mb={2}
      />
    </View>
  );
};

export default SquareImage;
