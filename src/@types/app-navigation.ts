import { NativeStackNavigationProp } from "@react-navigation/native-stack";

export type AppNavigation = {
  ["sign-in"]: undefined;
  ["user-register"]: undefined;
  ["home"]: undefined;
};

export type AppNavigationRoutes = NativeStackNavigationProp<AppNavigation>;
