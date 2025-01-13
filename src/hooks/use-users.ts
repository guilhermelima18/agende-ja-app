import { useCallback } from "react";
import { Alert } from "react-native";
import { api } from "@/libs/axios";

type CreateUserBody = {
  role: "admin" | "user";
  name: string;
  email: string;
  password: string;
  phoneNumber: string;
  dateOfBirth: string;
  companyId: string;
};

export function useUsers() {
  const createUser = useCallback(
    async ({
      role,
      name,
      email,
      password,
      dateOfBirth,
      phoneNumber,
      companyId,
    }: CreateUserBody) => {
      try {
        const response = await api.post("/users", {
          role,
          name,
          email,
          password,
          dateOfBirth,
          phoneNumber,
          companyId,
        });

        return {
          data: response.data,
          status: response.status,
        };
      } catch (error: any) {
        Alert.alert(
          "Ops!",
          error.response.data.message ||
            "Não foi possível cadastrar esse usuário!"
        );
      }
    },
    []
  );

  return {
    createUser,
  };
}
