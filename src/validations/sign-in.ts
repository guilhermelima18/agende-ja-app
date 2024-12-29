import { z } from "zod";

const signInSchema = z.object({
  email: z
    .string({ required_error: "Campo obrigatório" })
    .email("E-mail inválido"),
  password: z
    .string({ required_error: "Campo obrigatório" })
    .min(6, "Mínimo de 6 dígitos"),
});

type SignInType = z.infer<typeof signInSchema>;

export { signInSchema, SignInType };
