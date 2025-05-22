import {
  View,
  Image,
  Text,
  ActivityIndicator,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LogIn } from "lucide-react-native";

import { useSignIn } from "@/hooks/use-sign-in";

import { Layout } from "@/components/layout";
import { Input } from "@/components/input";
import { Button } from "@/components/button";

import { AppNavigationRoutes } from "@/@types/app-navigation";
import { signInSchema, SignInType } from "@/validations/sign-in";

import { theme } from "@/styles/theme";

export function SignIn() {
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignInType>({
    resolver: zodResolver(signInSchema),
    mode: "onChange",
  });

  const navigation = useNavigation<AppNavigationRoutes>();

  const { onSignIn } = useSignIn();

  async function handleSignIn(data: SignInType) {
    const response = await onSignIn({
      email: data.email,
      password: data.password,
    });

    if (response && response.status === 200) {
      navigation.push("home");
    }
  }

  return (
    <Layout>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"} // Ajuste conforme o sistema operacional
        style={{ flex: 1 }}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{ flexGrow: 1 }}
          style={{
            width: "100%",
            flex: 1,
          }}
        >
          <View
            style={{
              width: "100%",
              flex: 1,
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Image
              style={{
                width: 140,
                height: 140,
                marginBottom: 4,
              }}
              source={require("../assets/icons/logo-agende-ja.png")}
            />

            <View style={{ width: "100%" }}>
              <View
                style={{ flexDirection: "column", gap: 20, marginBottom: 4 }}
              >
                <View style={{ flexDirection: "column" }}>
                  <Text
                    style={{
                      fontSize: theme.fontSizes.md,
                      fontWeight: "600",
                      marginBottom: 2,
                    }}
                  >
                    E-mail
                  </Text>
                  <Controller
                    name="email"
                    control={control}
                    render={({ field: { value, onChange } }) => (
                      <Input
                        autoCapitalize="none"
                        keyboardType="email-address"
                        placeholder="Digite seu e-mail"
                        value={value}
                        onChangeText={onChange}
                      />
                    )}
                  />
                  {errors.email?.message && (
                    <Text
                      style={{
                        color: theme.colors.red[500],
                        fontSize: theme.fontSizes.xs,
                        marginTop: 2,
                      }}
                    >
                      {errors.email?.message}
                    </Text>
                  )}
                </View>

                <View style={{ flexDirection: "column" }}>
                  <Text
                    style={{
                      fontSize: theme.fontSizes.md,
                      fontWeight: "600",
                      marginBottom: 2,
                    }}
                  >
                    Senha
                  </Text>
                  <Controller
                    name="password"
                    control={control}
                    render={({ field: { value, onChange } }) => (
                      <Input
                        placeholder="Digite sua senha"
                        secureTextEntry
                        value={value}
                        onChangeText={onChange}
                      />
                    )}
                  />
                  {errors.password?.message && (
                    <Text
                      style={{
                        color: theme.colors.red[500],
                        fontSize: theme.fontSizes.xs,
                        marginTop: 2,
                      }}
                    >
                      {errors.password?.message}
                    </Text>
                  )}
                </View>
              </View>

              <View style={{ flexDirection: "column", gap: 10, marginTop: 20 }}>
                <Button
                  disabled={isSubmitting}
                  onPress={handleSubmit(handleSignIn)}
                >
                  {isSubmitting ? (
                    <ActivityIndicator animating color="#fff" />
                  ) : (
                    <View style={{ flexDirection: "row", gap: 4 }}>
                      <Text
                        style={{
                          color: theme.colors.white,
                          fontWeight: "600",
                          fontSize: theme.fontSizes.md,
                        }}
                      >
                        Entrar
                      </Text>
                      <LogIn color={theme.colors.white} />
                    </View>
                  )}
                </Button>

                <Button
                  backgroundColor={theme.colors.red[500]}
                  disabled={isSubmitting}
                  onPress={() => navigation.push("user-register")}
                >
                  <Text
                    style={{
                      color: theme.colors.white,
                      fontWeight: "600",
                      fontSize: theme.fontSizes.md,
                    }}
                  >
                    Cadastrar-se
                  </Text>
                </Button>
              </View>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </Layout>
  );
}
