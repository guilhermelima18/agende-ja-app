import { useCallback, useState } from "react";
import { api } from "@/libs/axios";

type ServicesProps = {
  id: string;
  name: string;
  description: string;
  duration: number;
  price: string;
};

type GetServicesParams = {
  companyId: string;
  professionalId: string;
};

export function useServices() {
  const [services, setServices] = useState<ServicesProps[]>([]);

  const getServices = useCallback(
    async ({ companyId, professionalId }: GetServicesParams) => {
      try {
        const response = await api.get(
          `/services?companyId=${companyId}&professionalId=${professionalId}`
        );

        if (response) {
          setServices(response.data.data);
        }
      } catch (error) {
        console.log(error);
      }
    },
    []
  );

  return {
    services,
    getServices,
  };
}
