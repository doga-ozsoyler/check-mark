import React, { FC, useState } from "react";
import { StyleSheet } from "react-native";
import { Button, View, Text, Pressable, Image, HStack } from "native-base";
import EnterNumberModal from "../Components/EnterNumberModal";

interface Props {
  navigation: any;
}

const CountdownScreen: FC<Props> = ({ navigation }) => {
  const [visible, setVisible] = useState<boolean>(true);
  const [number, setNumber] = useState<string>("");

  const handleChange = (number: string) => setNumber(number); //Also works: const handleChange: (number: string) => void = (number) => setNumber(number);

  return (
    <View style={styles.container}>
      <EnterNumberModal
        navigation={navigation}
        setVisible={setVisible}
        visible={visible}
        number={number}
        handleChange={handleChange}
      />
      <View flexDirection="row" flex="1" justifyContent="space-between">
        <Text color="#fff" ml={9} fontSize="2xl" alignSelf="flex-end" bold>
          {number}
        </Text>
      </View>
      <View flex="10">
        <Pressable
          onPress={() => console.log("pressed")}
          h="100%"
          w="430"
          paddingLeft={10}
        >
          <HStack flexWrap="wrap" h="95%" w="375" mt={5}>
            {Array(Number(number))
              .fill(true)
              .map((_, index) => {
                return (
                  <Image
                    source={require(`../../assets/empty-square.png`)}
                    h="22"
                    w="22"
                    resizeMode="contain"
                    alt="1"
                    mr={(index + 1) % 5 === 0 ? 3 : 0}
                    mb={2}
                    key={index}
                  />
                );
              })}
          </HStack>
        </Pressable>
      </View>
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
            variant="outline"
            onPress={() => navigation.navigate("MainScreen")}
          >
            Count
          </Button>
          <Button>Countdown</Button>
        </Button.Group>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#2D3033",
  },
});

export default CountdownScreen;
