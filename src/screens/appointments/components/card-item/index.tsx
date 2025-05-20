import { View, Text, TouchableOpacity } from "react-native";
import { Pencil, Trash } from "lucide-react-native";

import { Appointments } from "../..";

type CardItemProps = {
  appointments: Appointments;
};

export function CardItem({ appointments }: CardItemProps) {
  return (
    <View className="p-4 border-b border-b-gray-300 flex flex-row items-center justify-between">
      <Text>{appointments?.name}</Text>
      <View className="flex flex-row items-center gap-2">
        <TouchableOpacity className="bg-blue-500 p-2 rounded-md">
          <Pencil color="#fff" size={18} />
        </TouchableOpacity>

        <TouchableOpacity className="bg-red-500 p-2 rounded-md">
          <Trash color="#fff" size={18} />
        </TouchableOpacity>
      </View>
    </View>
  );
}
