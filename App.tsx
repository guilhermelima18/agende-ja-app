import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { FormProvider, useForm } from "react-hook-form";

import { Contexts } from "@/contexts";

import { SignIn } from "@/screens/sign-in";
import { UserRegister } from "@/screens/user-register";
import { Home } from "@/screens/home";
import { Appointments } from "@/screens/appointments";
import { SchedulingStepOne } from "@/screens/scheduling/scheduling-step-one";
import { SchedulingStepTwo } from "@/screens/scheduling/scheduling-step-two";
import { SchedulingStepThree } from "@/screens/scheduling/scheduling-step-three";

const Stack = createStackNavigator();

export default function App() {
  const methods = useForm();

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <StatusBar style="auto" />
        <Contexts>
          <FormProvider {...methods}>
            <Stack.Navigator
              initialRouteName="sign-in"
              screenOptions={{ headerShown: false }}
            >
              <Stack.Screen name="sign-in" component={SignIn} />
              <Stack.Screen name="user-register" component={UserRegister} />
              <Stack.Screen name="home" component={Home} />
              <Stack.Screen name="appointments" component={Appointments} />

              <Stack.Screen
                name="scheduling-step-one"
                component={SchedulingStepOne}
              />
              <Stack.Screen
                name="scheduling-step-two"
                component={SchedulingStepTwo}
              />
              <Stack.Screen
                name="scheduling-step-three"
                component={SchedulingStepThree}
              />
            </Stack.Navigator>
          </FormProvider>
        </Contexts>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
