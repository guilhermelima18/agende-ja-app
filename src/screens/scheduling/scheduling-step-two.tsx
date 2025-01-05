import { useEffect, useMemo } from "react";
import { View, Text, ScrollView, Image, Alert } from "react-native";
import { Button } from "react-native-paper";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useFormContext } from "react-hook-form";

import { useUser } from "@/contexts/user";
import { useServices } from "@/hooks/use-services";

import { Layout } from "@/components/layout";
import { Select } from "@/components/select";
import { StepProgress } from "@/components/step-progress";

import { AppNavigationRoutes } from "@/@types/app-navigation";

type RouteParams = {
  professionalId: string;
};

export function SchedulingStepTwo() {
  const { control, handleSubmit } = useFormContext();
  const { navigate } = useNavigation<AppNavigationRoutes>();
  const { params } = useRoute();
  const { userLogged } = useUser();
  const { services, getServices } = useServices();

  const { professionalId } = params as RouteParams;

  const servicesSelectAdapter = useMemo(() => {
    if (!!services?.length && services?.length > 0) {
      return services.map((service) => ({
        label: `${service.name} - R$ ${service.price}`,
        value: service.id,
      }));
    }

    return [];
  }, [services]);

  function onSubmitStepTwo(data: any) {
    if (!data.service) {
      return Alert.alert("Atenção!", "Selecione um serviço.");
    }

    navigate("scheduling-step-three");
  }

  useEffect(() => {
    if (professionalId && userLogged?.companyId) {
      getServices({
        companyId: userLogged?.companyId,
        professionalId,
      });
    }
  }, [professionalId, userLogged?.companyId]);

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
              options={servicesSelectAdapter}
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
