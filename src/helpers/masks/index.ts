function phoneMask(value: string) {
  let v = value?.toString();
  v = v?.replace(/\D/g, "");

  if (v?.length === 11) {
    // Celular
    v = v?.replace(/^(\d{2})(\d{5})(\d{4})/, "($1) $2-$3");
  } else if (v?.length === 10) {
    // Telefone fixo
    v = v?.replace(/^(\d{2})(\d{4})(\d{4})/, "($1) $2-$3");
  } else {
    return value;
  }

  return v;
}

function dateMask(value: string) {
  let cleanedText = value?.replace(/[^0-9]/g, "");

  if (cleanedText?.length > 2) {
    cleanedText = cleanedText?.slice(0, 2) + "/" + cleanedText?.slice(2);
  }

  if (cleanedText?.length > 5) {
    cleanedText = cleanedText?.slice(0, 5) + "/" + cleanedText?.slice(5, 10);
  }

  return cleanedText;
}

export { phoneMask, dateMask };
