import { NavigationContainer } from "@react-navigation/native";
import { MainStack } from "./navigation/MainStack";

import { StatusBar } from "expo-status-bar";

export default function App() {
  return (
    <NavigationContainer>
      <MainStack />
    </NavigationContainer>
  );
}
