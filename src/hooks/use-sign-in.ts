import { useCallback } from "react";
import { Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { api } from "@/libs/axios";

type SignInBody = {
  email: string;
  password: string;
};

export function useSignIn() {
  const onSignIn = useCallback(async ({ email, password }: SignInBody) => {
    try {
      const response = await api.post("/sign-in", {
        email,
        password,
      });

      if (response && response.status === 200) {
        await AsyncStorage.removeItem("@agende-ja:user");
        await AsyncStorage.setItem(
          "@agende-ja:user",
          JSON.stringify(response.data)
        );
      }

      return {
        data: response.data,
        status: response.status,
      };
    } catch (error: any) {
      Alert.alert(
        "Ops!",
        error.response.data.message ||
          "Não foi possível encontrar esse usuário!"
      );
    }
  }, []);

  return {
    onSignIn,
  };
}
