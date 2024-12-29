import { View, Image, Text, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Button, TextInput } from "react-native-paper";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Layout } from "@/components/layout";
import { dateMask, phoneMask } from "@/helpers/masks";
import {
  userRegisterSchema,
  UserRegisterType,
} from "@/validations/user-register";
import { AppNavigationRoutes } from "@/@types/app-navigation";

export function UserRegister() {
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<UserRegisterType>({
    resolver: zodResolver(userRegisterSchema),
    mode: "onChange",
  });

  const { navigate } = useNavigation<AppNavigationRoutes>();

  async function onRegister(data: UserRegisterType) {
    console.log(data);

    navigate("sign-in");
  }

  return (
    <Layout>
      <ScrollView>
        <View className="w-full flex-1 flex-col items-center mt-10">
          <Image
            className="w-40 h-40 mb-4"
            source={require("../assets/icons/logo-agende-ja.png")}
          />

          <View className="w-full">
            <View className="flex-col gap-2 mb-4">
              <View>
                <Controller
                  name="name"
                  control={control}
                  render={({ field: { value, onChange } }) => (
                    <TextInput
                      autoCapitalize="words"
                      mode="outlined"
                      label="Nome"
                      placeholder="Digite seu nome"
                      value={value}
                      onChangeText={onChange}
                    />
                  )}
                />
                {errors.name?.message && (
                  <Text className="text-red-500 text-xs mt-1">
                    {errors.name?.message}
                  </Text>
                )}
              </View>

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
                      secureTextEntry
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

              <View>
                <Controller
                  name="phone"
                  control={control}
                  render={({ field: { value, onChange } }) => (
                    <TextInput
                      keyboardType="numeric"
                      mode="outlined"
                      label="Celular"
                      placeholder="Digite seu telefone ou celular"
                      maxLength={15}
                      value={phoneMask(value)}
                      onChangeText={onChange}
                    />
                  )}
                />
                {errors.phone?.message && (
                  <Text className="text-red-500 text-xs mt-1">
                    {errors.phone?.message}
                  </Text>
                )}
              </View>

              <View>
                <Controller
                  name="dateOfBirth"
                  control={control}
                  render={({ field: { value, onChange } }) => (
                    <TextInput
                      keyboardType="numeric"
                      mode="outlined"
                      label="Data de nascimento"
                      maxLength={10}
                      value={dateMask(value)}
                      onChangeText={onChange}
                    />
                  )}
                />
                {errors.dateOfBirth?.message && (
                  <Text className="text-red-500 text-xs mt-1">
                    {errors.dateOfBirth?.message}
                  </Text>
                )}
              </View>
            </View>

            <View>
              <Button
                mode="contained"
                disabled={isSubmitting}
                onPress={handleSubmit(onRegister)}
              >
                Cadastrar
              </Button>
            </View>
          </View>
        </View>
      </ScrollView>
    </Layout>
  );
}
