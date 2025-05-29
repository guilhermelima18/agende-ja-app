import { useEffect } from "react";
import { FlatList, View, Text, ActivityIndicator } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Plus } from "lucide-react-native";

import { useUserContext } from "@/contexts/user";
import { useAppointments } from "@/hooks/use-appointments";

import { Layout } from "@/components/layout";
import { Button } from "@/components/button";
import { CardItem } from "./components/card-item";

import { AppNavigationRoutes } from "@/@types/app-navigation";

export function Appointments() {
  const navigation = useNavigation<AppNavigationRoutes>();

  const { userLogged } = useUserContext();
  const {
    appointments,
    appointmentLoading,
    updateAppointmentLoading,
    deleteAppointmentLoading,
    getAppointments,
    updateAppointment,
    deleteAppointment,
  } = useAppointments();

  const handleUpdateAppointment = async ({
    appointmentId,
  }: {
    appointmentId: string;
  }) => {
    const result = await updateAppointment({ appointmentId });

    if (result && result.status === 200) {
      if (userLogged?.role === "admin") {
        getAppointments({
          companyId: userLogged?.companyId,
        });
      }

      if (userLogged?.role === "user") {
        getAppointments({
          companyId: userLogged?.companyId,
          userId: userLogged?.id,
        });
      }
    }
  };

  const handleDeleteAppointment = async ({
    appointmentId,
  }: {
    appointmentId: string;
  }) => {
    const result = await deleteAppointment({ appointmentId });

    if (result && result.status === 200) {
      if (userLogged?.role === "admin") {
        getAppointments({
          companyId: userLogged?.companyId,
        });
      }

      if (userLogged?.role === "user") {
        getAppointments({
          companyId: userLogged?.companyId,
          userId: userLogged?.id,
        });
      }
    }
  };

  useEffect(() => {
    if (userLogged?.role === "admin") {
      getAppointments({
        companyId: userLogged?.companyId,
      });
    }

    if (userLogged?.role === "user") {
      getAppointments({
        companyId: userLogged?.companyId,
        userId: userLogged?.id,
      });
    }
  }, [userLogged]);

  return (
    <Layout headerTitle="Agendamentos">
      {appointmentLoading ||
      updateAppointmentLoading ||
      deleteAppointmentLoading ? (
        <View
          style={{
            width: "100%",
            flex: 1,
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <ActivityIndicator size="large" />
        </View>
      ) : (
        <View
          style={{
            width: "100%",
            flex: 1,
            flexDirection: "column",
            marginBottom: 20,
          }}
        >
          <FlatList
            data={appointments}
            keyExtractor={(item) => String(item.id)}
            renderItem={({ item }) => (
              <View
                style={{ flexDirection: "column", gap: 10, marginBottom: 14 }}
              >
                <CardItem
                  appointment={item}
                  handleUpdateAppointment={handleUpdateAppointment}
                  handleDeleteAppointment={handleDeleteAppointment}
                />
              </View>
            )}
          />

          <Button onPress={() => navigation.push("scheduling-step-one")}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                gap: 2,
              }}
            >
              <Plus color="#fff" size={20} />
              <Text style={{ color: "#fff" }}>Novo agendamento</Text>
            </View>
          </Button>
        </View>
      )}
    </Layout>
  );
}
