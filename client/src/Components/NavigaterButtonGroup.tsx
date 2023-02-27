import React, { FunctionComponent } from "react";
import { Button, View, useToast } from "native-base";

interface Props {
  navigation: any;
  screenName: string;
}

const NavigaterButtonGroup: FunctionComponent<Props> = (props) => {
  const { navigation, screenName } = props;
  const toast = useToast();

  const navigateScreen = () => {
    navigation.navigate(screenName);

    toast.closeAll();
    if (screenName === "CountdownScreen") {
      toast.show({
        title: "Use long press to change the number",
        placement: "top",
        duration: 2000,
      });
    }
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
