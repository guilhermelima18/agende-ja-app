import { useState } from "react";
import { View, Image, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Button, TextInput, ActivityIndicator } from "react-native-paper";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { useSignIn } from "@/hooks/use-sign-in";
import { Layout } from "@/components/layout";
import { AppNavigationRoutes } from "@/@types/app-navigation";
import { signInSchema, SignInType } from "@/validations/sign-in";

export function SignIn() {
  const [showPassword, setShowPassword] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignInType>({
    resolver: zodResolver(signInSchema),
    mode: "onChange",
  });

  const { navigate } = useNavigation<AppNavigationRoutes>();

  const { onSignIn } = useSignIn();

  async function handleSignIn(data: SignInType) {
    const response = await onSignIn({
      email: data.email,
      password: data.password,
    });

    if (response && response.status === 200) {
      navigate("home");
    }
  }

  return (
    <Layout>
      <View className="w-full flex-1 flex-col items-center mt-40">
        <Image
          className="w-40 h-40 mb-4"
          source={require("../assets/icons/logo-agende-ja.png")}
        />

        <View className="w-full">
          <View className="flex-col gap-2 mb-4">
            <View>
              <Controller
                name="email"
                control={control}
                render={({ field: { value, onChange } }) => (
                  <TextInput
                    autoCapitalize="none"
                    keyboardType="email-address"
                    mode="outlined"
                    label="E-mail"
                    placeholder="Digite seu e-mail"
                    value={value}
                    onChangeText={onChange}
                  />
                )}
              />
              {errors.email?.message && (
                <Text className="text-red-500 text-xs mt-1">
                  {errors.email?.message}
                </Text>
              )}
            </View>

            <View>
              <Controller
                name="password"
                control={control}
                render={({ field: { value, onChange } }) => (
                  <TextInput
                    mode="outlined"
                    label="Senha"
                    placeholder="Digite sua senha"
                    secureTextEntry={!showPassword}
                    right={
                      <TextInput.Icon
                        icon={showPassword ? "eye-off-outline" : "eye-outline"}
                        onPress={() => setShowPassword(!showPassword)}
                      />
                    }
                    value={value}
                    onChangeText={onChange}
                  />
                )}
              />
              {errors.password?.message && (
                <Text className="text-red-500 text-xs mt-1">
                  {errors.password?.message}
                </Text>
              )}
            </View>
          </View>

          <View className="flex-col gap-4">
            <Button
              mode="contained"
              disabled={isSubmitting}
              onPress={handleSubmit(handleSignIn)}
            >
              {isSubmitting ? (
                <ActivityIndicator animating color="#fff" />
              ) : (
                "Entrar"
              )}
            </Button>
            <Button
              mode="outlined"
              disabled={isSubmitting}
              onPress={() => navigate("user-register")}
            >
              Cadastrar-se
            </Button>
          </View>
        </View>
      </View>
    </Layout>
  );
}
