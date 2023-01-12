import React, { FunctionComponent } from "react";
import { Button, View } from "native-base";

interface Props {
  navigation: any;
  screenName: string;
}

const NavigaterButtonGroup: FunctionComponent<Props> = (props) => {
  const { navigation, screenName } = props;

  const navigateScreen = () => {
    navigation.navigate(screenName);
  };

  return (
    <View flex="1">
      <Button.Group
        isAttached
        alignSelf="center"
        colorScheme="teal"
        size="sm"
        borderRadius="50"
      >
        <Button
          w="100px"
          variant={screenName === "MainScreen" ? "solid" : "outline"}
          onPress={screenName === "MainScreen" ? navigateScreen : null}
        >
          Count
        </Button>
        <Button
          variant={screenName === "CountdownScreen" ? "solid" : "outline"}
          onPress={screenName === "CountdownScreen" ? navigateScreen : null}
        >
          Countdown
        </Button>
      </Button.Group>
    </View>
  );
};

export default NavigaterButtonGroup;
