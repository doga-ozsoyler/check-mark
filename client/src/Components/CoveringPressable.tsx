import React, { FunctionComponent, PropsWithChildren } from "react";
import { View, Pressable, HStack } from "native-base";

interface Props {
  children: React.ReactNode;
  onPress: () => void;
  onLongPress?: () => void;
}

const CoveringPressable: FunctionComponent<PropsWithChildren<Props>> = (
  props
) => {
  const { onPress, onLongPress, children } = props;

  return (
    <View alignItems="center" flex="10">
      <Pressable
        onPress={onPress}
        h="100%"
        w="85%"
        alignItems="center"
        onLongPress={onLongPress}
      >
        <HStack flexWrap="wrap" h="95%" w="100%" mt={5}>
          {children}
        </HStack>
      </Pressable>
    </View>
  );
};

export default CoveringPressable;
