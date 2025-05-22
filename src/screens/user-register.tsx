import { useEffect, useMemo } from "react";
import {
  View,
  Image,
  Text,
  ScrollView,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { useUsers } from "@/hooks/use-users";
import { useCompanies } from "@/hooks/use-companies";

import { Layout } from "@/components/layout";
import { Select } from "@/components/select";
import { Input } from "@/components/input";
import { Button } from "@/components/button";

import { dateMask, phoneMask } from "@/helpers/masks";
import {
  userRegisterSchema,
  UserRegisterType,
} from "@/validations/user-register";
import { AppNavigationRoutes } from "@/@types/app-navigation";

import { theme } from "@/styles/theme";

export function UserRegister() {
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<UserRegisterType>({
    resolver: zodResolver(userRegisterSchema),
    mode: "onChange",
  });

  const navigation = useNavigation<AppNavigationRoutes>();
  const { createUser } = useUsers();
  const { companies, getCompanies } = useCompanies();

  const companiesAdapterSelect = useMemo(() => {
    if (!!companies?.length && companies?.length > 0) {
      return companies.map((company) => ({
        label: company.name,
        value: company.id,
      }));
    }

    return [];
  }, [companies]);

  async function onRegister(data: UserRegisterType) {
    const values = {
      role: "user" as "admin" | "user",
      name: data.name,
      email: data.email,
      password: data.password,
      dateOfBirth: data.dateOfBirth?.split("/").reverse().join("-"),
      phoneNumber: data.phone?.replace(/\D/g, ""),
      companyId: data.company,
    };

    const response = await createUser(values);

    if (response && response.status === 201) {
      Alert.alert("Sucesso", "Usuário cadastrado!", [
        {
          text: "OK",
          onPress: async () => {
            navigation.push("sign-in");
          },
        },
      ]);
    }
  }

  useEffect(() => {
    getCompanies();
  }, []);

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
                    Nome
                  </Text>

                  <Controller
                    name="name"
                    control={control}
                    render={({ field: { value, onChange } }) => (
                      <Input
                        autoCapitalize="words"
                        placeholder="Digite seu nome"
                        value={value}
                        onChangeText={onChange}
                      />
                    )}
                  />
                  {errors.name?.message && (
                    <Text
                      style={{
                        color: theme.colors.red[500],
                        fontSize: theme.fontSizes.xs,
                        marginTop: 2,
                      }}
                    >
                      {errors.name?.message}
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

                <View style={{ flexDirection: "column" }}>
                  <Text
                    style={{
                      fontSize: theme.fontSizes.md,
                      fontWeight: "600",
                      marginBottom: 2,
                    }}
                  >
                    Celular
                  </Text>

                  <Controller
                    name="phone"
                    control={control}
                    render={({ field: { value, onChange } }) => (
                      <Input
                        keyboardType="numeric"
                        placeholder="Digite seu telefone ou celular"
                        maxLength={15}
                        value={phoneMask(value)}
                        onChangeText={onChange}
                      />
                    )}
                  />
                  {errors.phone?.message && (
                    <Text
                      style={{
                        color: theme.colors.red[500],
                        fontSize: theme.fontSizes.xs,
                        marginTop: 2,
                      }}
                    >
                      {errors.phone?.message}
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
                    Data de nascimento
                  </Text>

                  <Controller
                    name="dateOfBirth"
                    control={control}
                    render={({ field: { value, onChange } }) => (
                      <Input
                        keyboardType="numeric"
                        placeholder="Digite sua data de nascimento"
                        maxLength={10}
                        value={dateMask(value)}
                        onChangeText={onChange}
                      />
                    )}
                  />
                  {errors.dateOfBirth?.message && (
                    <Text
                      style={{
                        color: theme.colors.red[500],
                        fontSize: theme.fontSizes.xs,
                        marginTop: 2,
                      }}
                    >
                      {errors.dateOfBirth?.message}
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
                    Estabelecimento
                  </Text>

                  <Select
                    name="company"
                    control={control}
                    options={companiesAdapterSelect}
                    placeholder="Selecione um estabelecimento"
                  />
                  {errors.company?.message && (
                    <Text
                      style={{
                        color: theme.colors.red[500],
                        fontSize: theme.fontSizes.xs,
                        marginTop: 2,
                      }}
                    >
                      {errors.company?.message}
                    </Text>
                  )}
                </View>
              </View>

              <View style={{ flexDirection: "column", gap: 10, marginTop: 20 }}>
                <Button
                  disabled={isSubmitting}
                  onPress={handleSubmit(onRegister)}
                >
                  <Text
                    style={{
                      color: theme.colors.white,
                      fontWeight: "600",
                      fontSize: theme.fontSizes.md,
                    }}
                  >
                    Cadastrar
                  </Text>
                </Button>

                <Button
                  backgroundColor={theme.colors.red[500]}
                  disabled={isSubmitting}
                  onPress={() => navigation.push("sign-in")}
                >
                  <Text
                    style={{
                      color: theme.colors.white,
                      fontWeight: "600",
                      fontSize: theme.fontSizes.md,
                    }}
                  >
                    Cancelar
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
