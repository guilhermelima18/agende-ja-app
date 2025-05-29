import { View, Text, TouchableOpacity } from "react-native";
import { Check, X } from "lucide-react-native";

import { AppointmentsProps } from "@/hooks/use-appointments";

import { appointmentsStatus } from "@/helpers/constants";
import { theme } from "@/styles/theme";

type CardItemProps = {
  appointment: AppointmentsProps;
  handleUpdateAppointment: ({
    appointmentId,
  }: {
    appointmentId: string;
  }) => void;
  handleDeleteAppointment: ({
    appointmentId,
  }: {
    appointmentId: string;
  }) => void;
};

export function CardItem({
  appointment,
  handleUpdateAppointment,
  handleDeleteAppointment,
}: CardItemProps) {
  const appointmentsStatusColor = (status: string) => {
    return status === "PENDING"
      ? theme.colors.blue[500]
      : status === "CANCELED"
      ? theme.colors.red[500]
      : theme.colors.green[500];
  };

  return (
    <View
      style={{
        width: "100%",
        padding: 8,
        borderWidth: 1,
        borderColor: theme.colors.gray[200],
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        borderRadius: 8,
      }}
    >
      <View
        style={{
          flex: 1,
          flexDirection: "column",
          gap: 4,
          paddingRight: 8,
        }}
      >
        <Text style={{ fontSize: theme.fontSizes.md, fontWeight: "600" }}>
          Cliente: {appointment?.user}
        </Text>
        <Text
          style={{
            fontSize: theme.fontSizes.sm,
            flexShrink: 1,
          }}
        >
          Serviço: {appointment?.service}
        </Text>
        <Text style={{ fontSize: theme.fontSizes.sm }}>
          Data: {appointment?.scheduledAt}
        </Text>
        <Text style={{ fontSize: theme.fontSizes.sm }}>
          Status:{" "}
          <Text
            style={{
              color: appointmentsStatusColor(appointment?.status),
              fontWeight: "600",
            }}
          >
            {appointmentsStatus[appointment?.status]}
          </Text>
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
            backgroundColor: theme.colors.green[500],
            padding: 12,
            borderRadius: 6,
          }}
          onPress={() =>
            handleUpdateAppointment({ appointmentId: appointment?.id })
          }
        >
          <Check color="#fff" size={18} />
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            backgroundColor: theme.colors.red[500],
            padding: 12,
            borderRadius: 6,
          }}
          onPress={() =>
            handleDeleteAppointment({ appointmentId: appointment?.id })
          }
        >
          <X color="#fff" size={18} />
        </TouchableOpacity>
      </View>
    </View>
  );
}
