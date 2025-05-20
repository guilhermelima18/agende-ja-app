import { FlatList, View, Text } from "react-native";
import { Button } from "react-native-paper";
import { Plus } from "lucide-react-native";

import { Layout } from "@/components/layout";
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
  return (
    <Layout>
      <View className="w-full flex-1 flex-col">
        <View className="flex flex-col gap-4">
          <View className="my-4">
            <Text className="font-semibold text-2xl">Agendamentos</Text>
          </View>

          <FlatList
            data={appointments}
            keyExtractor={(item) => String(item.id)}
            renderItem={({ item }) => <CardItem appointments={item} />}
          />

          <Button mode="contained" className="w-full mt-20">
            <View className="flex-row items-center justify-center gap-1">
              <Plus color="#fff" size={20} />
              <Text style={{ color: "#fff" }}>Novo agendamento</Text>
            </View>
          </Button>
        </View>
      </View>
    </Layout>
  );
}
