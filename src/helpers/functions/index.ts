import { parse } from "date-fns";
import { ptBR } from "date-fns/locale";

const getTodayDate = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

export const parseCustomDate = (dateStr: string) => {
  return parse(dateStr, "d 'de' MMMM 'de' yyyy 'às' HH:mm", new Date(), {
    locale: ptBR,
  });
};

const formatDate = (isoDate: string) => {
  const date = new Date(isoDate);
  return date.toISOString().split("T")[0];
};

const formatHour = (isoHour: string) => {
  const date = new Date(isoHour);
  return date.toLocaleTimeString("pt-BR", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  });
};

export { getTodayDate, formatDate, formatHour };
