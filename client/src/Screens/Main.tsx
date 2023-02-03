import React, { FC, useState, useEffect } from "react";
import { StyleSheet } from "react-native";
import { View } from "native-base";
import MainPressable from "../Components/MainPressable";
import { getFromMemory, setInMemory } from "../Helpers/storage";
import CounterAndButtonGroup from "../Components/CounterAndButtonGroup";
import NavigaterButtonGroup from "../Components/NavigaterButtonGroup";
import MainTopLine from "../Components/MainTopLine";
interface Props {
  navigation: any;
}

const MainScreen: FC<Props> = ({ navigation }) => {
  const [checkMark, setCheckMark] = useState<number[]>([]);

  const getLocalData = async () => {
    setCheckMark(await getFromMemory("checkMark", checkMark));
  };

  useEffect(() => {
    getLocalData();

    return () => {
      setCheckMark([]);
    };
  }, []);

  return (
    <View style={styles.container}>
      <MainTopLine checkMark={checkMark} setCheckMark={setCheckMark} />
      <MainPressable checkMark={checkMark} setCheckMark={setCheckMark} />
      <NavigaterButtonGroup
        navigation={navigation}
        screenName="CountdownScreen"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#2D3033",
  },
});

export default MainScreen;
