import React, { FunctionComponent, PropsWithChildren, Children } from "react";
import { View, Pressable, HStack } from "native-base";

interface Props {
  onPress: () => void;
  onLongPress?: () => void;
}

const CoveringPressable: FunctionComponent<PropsWithChildren<Props>> = (
  props
) => {
  const { onPress, onLongPress } = props;

  return (
    <View flex="10">
      <Pressable
        onPress={onPress}
        h="100%"
        w="430"
        paddingLeft={10}
        onLongPress={onLongPress}
      >
        <HStack flexWrap="wrap" h="95%" w="375" mt={5}>
          {Children}
        </HStack>
      </Pressable>
    </View>
  );
};

export default CoveringPressable;
