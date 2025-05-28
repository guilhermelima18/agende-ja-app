import { useEffect, useMemo } from "react";
import { View, Text, Image, ScrollView, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useFormContext } from "react-hook-form";

import { useUserContext } from "@/contexts/user";
import { useProfessionals } from "@/hooks/use-professionals";

import { Layout } from "@/components/layout";
import { Select } from "@/components/select";
import { StepProgress } from "@/components/step-progress";
import { Button } from "@/components/button";

import { AppNavigationRoutes } from "@/@types/app-navigation";
import { theme } from "@/styles/theme";

export function SchedulingStepOne() {
  const { control, handleSubmit } = useFormContext();
  const { navigate } = useNavigation<AppNavigationRoutes>();
  const { userLogged } = useUserContext();
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

          <StepProgress progress={33} />
          <Text>Profissional</Text>

          <View style={{ marginTop: 10, flexDirection: "column", gap: 20 }}>
            <Select
              name="professional"
              control={control}
              options={professionalsSelectAdapter}
              placeholder="Selecione um profissional"
            />

            <Button onPress={handleSubmit(onSubmitStepOne)}>
              <Text style={{ color: theme.colors.white }}>Próximo</Text>
            </Button>
          </View>
        </View>
      </ScrollView>
    </Layout>
  );
}
