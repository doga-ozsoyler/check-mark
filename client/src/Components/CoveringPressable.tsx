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
    <View flex="10">
      <Pressable
        onPress={onPress}
        h="100%"
        w="430"
        paddingLeft={10}
        onLongPress={onLongPress}
      >
        <HStack flexWrap="wrap" h="95%" w="375" mt={5}>
          {children}
        </HStack>
      </Pressable>
    </View>
  );
};

export default CoveringPressable;
