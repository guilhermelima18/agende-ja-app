import { FlatList, View, Text } from "react-native";
import { Plus } from "lucide-react-native";

import { Layout } from "@/components/layout";
import { Button } from "@/components/button";
import { CardItem } from "./components/card-item";

import { theme } from "@/styles/theme";
import { Header } from "@/components/header";

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
  return (
    <Layout>
      <Header title="Agendamentos" />
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
          renderItem={({ item }) => <CardItem appointments={item} />}
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
    </Layout>
  );
}
