import { View, Text, Image, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Button } from "react-native-paper";
import { useFormContext } from "react-hook-form";

import { Layout } from "@/components/layout";
import { Select } from "@/components/select";
import { StepProgress } from "@/components/step-progress";

import { AppNavigationRoutes } from "@/@types/app-navigation";

export function SchedulingStepOne() {
  const { control, handleSubmit } = useFormContext();

  const { navigate } = useNavigation<AppNavigationRoutes>();

  function onSubmitStepOne() {
    navigate("scheduling-step-two");
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

          <StepProgress progress={33} />
          <Text>Profissional</Text>

          <View className="mt-10">
            <Select
              name="professional"
              control={control}
              options={[
                { label: "Teste", value: "teste" },
                { label: "Teste2", value: "teste2" },
                { label: "Teste3", value: "teste3" },
              ]}
              placeholder="Selecione um profissional"
            />

            <Button mode="contained" onPress={handleSubmit(onSubmitStepOne)}>
              Próximo
            </Button>
          </View>
        </View>
      </ScrollView>
    </Layout>
  );
}