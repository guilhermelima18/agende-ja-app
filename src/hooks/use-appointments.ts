import { useCallback, useState } from "react";
import { Alert } from "react-native";
import { format, parse } from "date-fns";
import { ptBR } from "date-fns/locale";

import { api } from "@/libs/axios";

export type AppointmentsProps = {
  id: string;
  scheduledAt: string;
  status: "PENDING" | "CONFIRMED" | "CANCELED";
  company: string;
  professional: string;
  service: string;
  user: string;
};

type GetAppointmentsParams = {
  professionalId?: string;
  companyId: string;
  userId?: string;
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
  const [appointmentLoading, setAppointmentLoading] = useState(false);
  const [createAppointmentLoading, setCreateAppointmentLoading] =
    useState(false);
  const [updateAppointmentLoading, setUpdateAppointmentLoading] =
    useState(false);
  const [deleteAppointmentLoading, setDeleteAppointmentLoading] =
    useState(false);

  const getAppointments = useCallback(
    async ({ professionalId, companyId, userId }: GetAppointmentsParams) => {
      try {
        setAppointmentLoading(true);

        const response = await api.get("/appointments", {
          params: {
            ...(companyId && {
              companyId,
            }),
            ...(professionalId && {
              professionalId,
            }),
            ...(userId && {
              userId,
            }),
          },
        });

        if (response) {
          const appointmentsFormatted = response.data.data.map(
            (appointment: AppointmentsProps) => ({
              ...appointment,
              scheduledAt: format(
                appointment.scheduledAt,
                "dd 'de' MMMM 'de' yyyy 'às' HH:mm",
                {
                  locale: ptBR,
                }
              ),
            })
          );

          setAppointments(appointmentsFormatted);
        }
      } catch (error: any) {
        console.log(error.response.data.error);
      } finally {
        setAppointmentLoading(false);
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
        setCreateAppointmentLoading(true);

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
        console.log(error.response.data.error);

        Alert.alert(
          "Ops!",
          error.response.data.error || "Não foi possível fazer o agendamento!"
        );
      } finally {
        setCreateAppointmentLoading(false);
      }
    },
    []
  );

  const updateAppointment = useCallback(
    async ({ appointmentId }: { appointmentId: string }) => {
      try {
        setUpdateAppointmentLoading(true);

        const response = await api.put(`/appointments/${appointmentId}`);

        return {
          data: response.data,
          status: response.status,
        };
      } catch (error: any) {
        console.log(error.response.data.error);

        Alert.alert(
          "Ops!",
          error.response.data.error ||
            "Não foi possível atualizar o agendamento!"
        );
      } finally {
        setUpdateAppointmentLoading(false);
      }
    },
    []
  );

  const deleteAppointment = useCallback(
    async ({ appointmentId }: { appointmentId: string }) => {
      try {
        setDeleteAppointmentLoading(true);

        const response = await api.delete(`/appointments/${appointmentId}`);

        return {
          data: response.data,
          status: response.status,
        };
      } catch (error: any) {
        console.log(error.response.data.error);

        Alert.alert(
          "Ops!",
          error.response.data.error || "Não foi possível excluir o agendamento!"
        );
      } finally {
        setDeleteAppointmentLoading(false);
      }
    },
    []
  );

  return {
    appointments,
    appointmentLoading,
    createAppointmentLoading,
    updateAppointmentLoading,
    deleteAppointmentLoading,
    getAppointments,
    createAppointment,
    updateAppointment,
    deleteAppointment,
  };
}
