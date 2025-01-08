import { NativeStackNavigationProp } from "@react-navigation/native-stack";

export type AppNavigation = {
  ["sign-in"]: undefined;
  ["user-register"]: undefined;
  ["home"]: undefined;
  ["scheduling-step-one"]: undefined;
  ["scheduling-step-two"]: {
    professionalId: string;
  };
  ["scheduling-step-three"]: {
    professionalId: string;
  };
};

export type AppNavigationRoutes = NativeStackNavigationProp<AppNavigation>;
