import { View, Text, TouchableOpacity } from "react-native";
import { Pencil, Trash } from "lucide-react-native";

import { AppointmentsProps } from "@/hooks/use-appointments";

import { theme } from "@/styles/theme";

type CardItemProps = {
  appointment: AppointmentsProps;
  handleDeleteAppointment: ({
    appointmentId,
  }: {
    appointmentId: string;
  }) => void;
};

export function CardItem({
  appointment,
  handleDeleteAppointment,
}: CardItemProps) {
  return (
    <View
      style={{
        padding: 8,
        borderBottomWidth: 1,
        borderBottomColor: theme.colors.gray[300],
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <View style={{ flexDirection: "column", gap: 4 }}>
        <Text style={{ fontSize: theme.fontSizes.md, fontWeight: "600" }}>
          {appointment?.user}
        </Text>
        <Text style={{ fontSize: theme.fontSizes.sm }}>
          {appointment?.service}
        </Text>
        <Text style={{ fontSize: theme.fontSizes.sm }}>
          {appointment?.scheduledAt}
        </Text>
      </View>

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
          onPress={() =>
            handleDeleteAppointment({ appointmentId: appointment?.id })
          }
        >
          <Trash color="#fff" size={18} />
        </TouchableOpacity>
      </View>
    </View>
  );
}
