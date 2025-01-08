import { useCallback, useState } from "react";
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

  return {
    appointments,
    getAppointments,
  };
}
