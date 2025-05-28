import { useEffect } from "react";
import { FlatList, View, Text, ActivityIndicator } from "react-native";
import { Plus } from "lucide-react-native";

import { useUserContext } from "@/contexts/user";
import { useAppointments } from "@/hooks/use-appointments";

import { Layout } from "@/components/layout";
import { Button } from "@/components/button";
import { Header } from "@/components/header";
import { CardItem } from "./components/card-item";

export type Appointments = {
  id: number;
  name: string;
  service: string;
  professional: string;
  status: string;
};

const appointments: Appointments[] = [
  {
    id: 1,
    name: "Joelma Lima",
    service: "Unhas em fibra (Alongamento)",
    professional: "Jéssica Urniani",
    status: "PENDENTE",
  },
  {
    id: 2,
    name: "Silvia Navarro",
    service: "Unhas em fibra (Alongamento)",
    professional: "Jéssica Urniani",
    status: "CONFIRMADO",
  },
];

export function Appointments() {
  const { userLogged } = useUserContext();
  const {
    appointments,
    deleteAppointmentLoading,
    getAppointments,
    deleteAppointment,
  } = useAppointments();

  const handleDeleteAppointment = async ({
    appointmentId,
  }: {
    appointmentId: string;
  }) => {
    const result = await deleteAppointment({ appointmentId });

    if (result && result.status === 200) {
      await getAppointments({ companyId: userLogged?.companyId });
    }
  };

  useEffect(() => {
    getAppointments({
      companyId: userLogged?.companyId,
    });
  }, []);

  return (
    <Layout>
      <Header title="Agendamentos" />
      {deleteAppointmentLoading ? (
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
              <CardItem
                appointment={item}
                handleDeleteAppointment={handleDeleteAppointment}
              />
            )}
          />

          <Button>
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
