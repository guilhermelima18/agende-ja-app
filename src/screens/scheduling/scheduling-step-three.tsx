import { View, Text, Image, ScrollView } from "react-native";
import { Button } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { useFormContext } from "react-hook-form";

import { Layout } from "@/components/layout";
import { Select } from "@/components/select";
import { AppNavigationRoutes } from "@/@types/app-navigation";
import { StepProgress } from "@/components/step-progress";

export function SchedulingStepThree() {
  const { control, handleSubmit } = useFormContext();

  const { navigate } = useNavigation<AppNavigationRoutes>();

  function onSubmitStepThree(data: any) {
    console.log(data);
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

          <StepProgress progress={100} />
          <Text>Dia e horário</Text>

          <View className="mt-10">
            <Select
              name="availability"
              control={control}
              options={[
                { label: "Teste", value: "teste" },
                { label: "Teste2", value: "teste2" },
                { label: "Teste3", value: "teste3" },
              ]}
              placeholder="Selecione um horário"
            />

            <Button mode="contained" onPress={handleSubmit(onSubmitStepThree)}>
              Finalizar agendamento
            </Button>
          </View>
        </View>
      </ScrollView>
    </Layout>
  );
}
