import { View, Text, ScrollView, Image } from "react-native";
import { Button } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { useFormContext } from "react-hook-form";

import { Layout } from "@/components/layout";
import { Select } from "@/components/select";
import { StepProgress } from "@/components/step-progress";

import { AppNavigationRoutes } from "@/@types/app-navigation";

export function SchedulingStepTwo() {
  const { control, handleSubmit } = useFormContext();

  const { navigate } = useNavigation<AppNavigationRoutes>();

  function onSubmitStepTwo() {
    navigate("scheduling-step-three");
  }

  return (
    <Layout>
      <ScrollView>
        <View className="w-full flex-1 flex-col justify-center gap-4">
          <View className="w-full items-center mb-10">
            <Image
              className="w-40 h-40"
              source={require("../../assets/icons/logo-agende-ja.png")}
            />
          </View>

          <StepProgress progress={66} />
          <Text>Serviço</Text>

          <View className="mt-10">
            <Select
              name="service"
              control={control}
              options={[
                { label: "Teste", value: "teste" },
                { label: "Teste2", value: "teste2" },
                { label: "Teste3", value: "teste3" },
              ]}
              placeholder="Selecione um serviço"
            />

            <Button mode="contained" onPress={handleSubmit(onSubmitStepTwo)}>
              Próximo
            </Button>
          </View>
        </View>
      </ScrollView>
    </Layout>
  );
}
