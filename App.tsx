import { StatusBar } from "expo-status-bar";
import { PaperProvider } from "react-native-paper";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import { SignIn } from "@/screens/sign-in";
import { UserRegister } from "@/screens/user-register";
import { Home } from "./src/screens/home";

const Stack = createStackNavigator();

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <PaperProvider>
          <StatusBar style="auto" />
          <Stack.Navigator
            initialRouteName="sign-in"
            screenOptions={{ headerShown: false }}
          >
            <Stack.Screen name="sign-in" component={SignIn} />
            <Stack.Screen name="user-register" component={UserRegister} />
          </Stack.Navigator>
        </PaperProvider>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
