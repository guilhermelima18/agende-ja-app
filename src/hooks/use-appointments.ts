import { useCallback, useState } from "react";
import { Alert } from "react-native";
import { api } from "@/libs/axios";

type AppointmentsProps = {
  id: string;
  userId: string;
  serviceId: string;
  scheduledAt: string;
  status: "PENDING" | "CONFIRMED" | "CANCELED";
  createdAt: string;
  professionalId: string;
  companyId: string;
};

type GetAppointmentsParams = {
  professionalId: string;
  companyId: string;
};

type CreateAppointmentBody = {
  userId: string;
  serviceId: string;
  professionalId: string;
  companyId: string;
  status: "PENDING" | "CANCELED" | "CONFIRMED";
  scheduledAt: string;
};

export function useAppointments() {
  const [appointments, setAppointments] = useState<AppointmentsProps[]>([]);

  const getAppointments = useCallback(
    async ({ professionalId, companyId }: GetAppointmentsParams) => {
      try {
        const response = await api.get(
          `/appointments?professionalId=${professionalId}&companyId=${companyId}`
        );

        if (response) {
          setAppointments(response.data.data);
        }
      } catch (error) {
        console.log(error);
      }
    },
    []
  );

  const createAppointment = useCallback(
    async ({
      serviceId,
      professionalId,
      userId,
      companyId,
      scheduledAt,
      status,
    }: CreateAppointmentBody) => {
      try {
        const response = await api.post("/appointments", {
          serviceId,
          professionalId,
          userId,
          companyId,
          scheduledAt,
          status,
        });

        return {
          data: response.data,
          status: response.status,
        };
      } catch (error: any) {
        Alert.alert(
          "Ops!",
          error.response.data.message || "Não foi possível fazer o agendamento!"
        );
      }
    },
    []
  );

  return {
    appointments,
    getAppointments,
    createAppointment,
  };
}
