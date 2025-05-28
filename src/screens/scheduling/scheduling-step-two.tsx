import { useEffect, useMemo } from "react";
import { View, Text, ScrollView, Image, Alert } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useFormContext } from "react-hook-form";

import { useUserContext } from "@/contexts/user";
import { useServices } from "@/hooks/use-services";

import { Layout } from "@/components/layout";
import { Select } from "@/components/select";
import { StepProgress } from "@/components/step-progress";
import { Button } from "@/components/button";

import { AppNavigationRoutes } from "@/@types/app-navigation";
import { theme } from "@/styles/theme";

type RouteParams = {
  professionalId: string;
};

export function SchedulingStepTwo() {
  const { control, handleSubmit } = useFormContext();
  const { navigate } = useNavigation<AppNavigationRoutes>();
  const { params } = useRoute();
  const { userLogged } = useUserContext();
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

    navigate("scheduling-step-three", {
      professionalId,
    });
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
        <View
          style={{
            width: "100%",
            flex: 1,
            flexDirection: "column",
            justifyContent: "center",
            gap: 4,
          }}
        >
          <View
            style={{
              width: "100%",
              alignItems: "center",
              marginBottom: 10,
            }}
          >
            <Image
              style={{ width: 140, height: 140 }}
              source={require("../../assets/icons/logo-agende-ja.png")}
            />
          </View>

          <StepProgress progress={66} />
          <Text>Serviço</Text>

          <View style={{ marginTop: 10, flexDirection: "column", gap: 20 }}>
            <Select
              name="service"
              control={control}
              options={servicesSelectAdapter}
              placeholder="Selecione um serviço"
            />

            <Button onPress={handleSubmit(onSubmitStepTwo)}>
              <Text style={{ color: theme.colors.white }}>Próximo</Text>
            </Button>
          </View>
        </View>
      </ScrollView>
    </Layout>
  );
}
