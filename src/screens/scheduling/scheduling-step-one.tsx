import { useEffect, useMemo } from "react";
import { View, Text, Image, ScrollView, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Button } from "react-native-paper";
import { useFormContext } from "react-hook-form";

import { useUser } from "@/contexts/user";
import { useProfessionals } from "@/hooks/use-professionals";

import { Layout } from "@/components/layout";
import { Select } from "@/components/select";
import { StepProgress } from "@/components/step-progress";

import { AppNavigationRoutes } from "@/@types/app-navigation";

export function SchedulingStepOne() {
  const { control, handleSubmit } = useFormContext();
  const { navigate } = useNavigation<AppNavigationRoutes>();
  const { userLogged } = useUser();
  const { professionals, getProfessionals } = useProfessionals();

  const professionalsSelectAdapter = useMemo(() => {
    if (!!professionals?.length && professionals?.length > 0) {
      return professionals.map((professional) => ({
        label: professional.name,
        value: professional.id,
      }));
    }

    return [];
  }, [professionals]);

  function onSubmitStepOne(data: any) {
    if (!data.professional) {
      return Alert.alert("Atenção!", "Selecione um profissional.");
    }

    navigate("scheduling-step-two", {
      professionalId: data.professional,
    });
  }

  useEffect(() => {
    if (userLogged?.companyId) {
      getProfessionals({
        companyId: userLogged?.companyId,
      });
    }
  }, [userLogged?.companyId]);

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
              options={professionalsSelectAdapter}
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
