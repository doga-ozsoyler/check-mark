import React, { FunctionComponent } from "react";
import { Button, View, Text } from "native-base";

interface Props {
  counter: number;
  onPressClear: () => void;
  onPressMinus: () => void;
}

const CounterAndButtonGroup: FunctionComponent<Props> = (props) => {
  const { counter, onPressClear, onPressMinus } = props;

  return (
    <View flexDirection="row" flex="1" justifyContent="space-between">
      <Text color="#fff" ml={9} fontSize="2xl" alignSelf="flex-end" bold>
        {counter ? counter : 0}
      </Text>
      <Button.Group
        isAttached
        alignSelf="flex-end"
        colorScheme="teal"
        size="sm"
        mr={8}
      >
        <Button onPress={onPressClear}>Clear</Button>
        <Button w="45px" variant="outline" onPress={onPressMinus}>
          -
        </Button>
      </Button.Group>
    </View>
  );
};
export default CounterAndButtonGroup;
