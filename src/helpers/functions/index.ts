const getTodayDate = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0"); // Adiciona zero à esquerda
  const day = String(today.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

const formatDate = (isoDate: string) => {
  return isoDate?.split("T")[0];
};

const formatHour = (isoHour: string) => {
  const splitHour = isoHour?.split("T")[1];
  return splitHour?.split(".")[0];
};

export { getTodayDate, formatDate, formatHour };
