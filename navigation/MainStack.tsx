import { createStackNavigator } from "@react-navigation/stack";

import { Browse } from "../screens/browse/Browse";
import { DetailScreen } from "../screens/browse/DetailScreen";

const Stack = createStackNavigator();

export const MainStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Browse" component={Browse} />
      <Stack.Screen name="DetailScreen" component={DetailScreen} />
    </Stack.Navigator>
  );
};
