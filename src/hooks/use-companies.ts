import { useCallback, useState } from "react";
import { api } from "@/libs/axios";

export type CompaniesProps = {
  id: string;
  name: string;
  phone: string;
  address: string;
  addressNumber: string;
  city: string;
  uf: string;
};

export function useCompanies() {
  const [companies, setCompanies] = useState<CompaniesProps[]>([]);

  const getCompanies = useCallback(async () => {
    try {
      const response = await api.get("/companies");

      console.log(response.data);

      if (response) {
        setCompanies(response.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  }, []);

  return {
    companies,
    getCompanies,
  };
}
