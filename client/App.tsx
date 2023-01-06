import React, { FC } from "react";
import { StyleSheet, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import MainScreen from "./src/Screens/Main";
import CountdownScreen from "./src/Screens/Countdown";
import { NativeBaseProvider } from "native-base";

type StackParamList = {
  MainScreen: undefined;
  CountdownScreen: undefined; //{ userId: string }; or { sort: 'latest' | 'top' } | undefined;
};

const App: FC = () => {
  const Stack = createStackNavigator<StackParamList>();

  const Navigator: FC = () => {
    return (
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="MainScreen" component={MainScreen} />
        <Stack.Screen name="CountdownScreen" component={CountdownScreen} />
      </Stack.Navigator>
    );
  };

  return (
    <NavigationContainer>
      <NativeBaseProvider>
        <Navigator />
      </NativeBaseProvider>
    </NavigationContainer>
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
