import React, { FC } from "react";
import { StyleSheet, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import MainScreen from "./src/Screens/Main";

const App: FC = () => {
  return (
    <View style={styles.container}>
      <NavigationContainer>
        <MainScreen />
      </NavigationContainer>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#2D3033",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default App;
