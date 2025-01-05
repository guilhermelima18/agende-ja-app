import { useCallback, useState } from "react";
import { api } from "@/libs/axios";

type ProfessionalsProps = {
  id: string;
  name: string;
  email: string;
  phoneNumber: string;
  companyId: string;
};

type GetProfessionalsParams = {
  companyId: string;
};

export function useProfessionals() {
  const [professionals, setProfessionals] = useState<ProfessionalsProps[]>([]);

  const getProfessionals = useCallback(
    async ({ companyId }: GetProfessionalsParams) => {
      try {
        const response = await api.get(`/professionals?companyId=${companyId}`);

        if (response) {
          setProfessionals(response.data.data);
        }
      } catch (error) {
        console.log(error);
      }
    },
    []
  );

  return {
    professionals,
    getProfessionals,
  };
}
