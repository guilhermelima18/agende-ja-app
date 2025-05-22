import { View, Text, TouchableOpacity } from "react-native";
import { Pencil, Trash } from "lucide-react-native";

import { Appointments } from "../..";
import { theme } from "@/styles/theme";

type CardItemProps = {
  appointments: Appointments;
};

export function CardItem({ appointments }: CardItemProps) {
  return (
    <View
      style={{
        padding: 4,
        borderBottomWidth: 1,
        borderBottomColor: theme.colors.gray[300],
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <Text style={{ fontSize: theme.fontSizes.md }}>{appointments?.name}</Text>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: 8,
        }}
      >
        <TouchableOpacity
          style={{
            backgroundColor: theme.colors.blue[500],
            padding: 8,
            borderRadius: 6,
          }}
        >
          <Pencil color="#fff" size={18} />
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            backgroundColor: theme.colors.red[500],
            padding: 8,
            borderRadius: 6,
          }}
        >
          <Trash color="#fff" size={18} />
        </TouchableOpacity>
      </View>
    </View>
  );
}
