import { z } from "zod";

const userRegisterSchema = z.object({
  name: z
    .string({ required_error: "Campo obrigatório" })
    .min(1, "Campo obrigatório"),
  email: z
    .string({ required_error: "Campo obrigatório" })
    .email("E-mail inválido"),
  password: z
    .string({ required_error: "Campo obrigatório" })
    .min(6, "Mínimo de 6 dígitos"),
  phone: z
    .string({ required_error: "Campo obrigatório" })
    .min(15, "Celular inválido"),
  dateOfBirth: z
    .string({ required_error: "Campo obrigatório" })
    .min(10, "Data inválida"),
  company: z
    .string({ required_error: "Campo obrigatório" })
    .min(1, "Campo obrigatório"),
});

type UserRegisterType = z.infer<typeof userRegisterSchema>;

export { userRegisterSchema, UserRegisterType };
