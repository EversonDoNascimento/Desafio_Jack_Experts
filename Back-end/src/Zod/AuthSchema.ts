// Importando o módulo zod para criar schema de validações
import { z } from "zod";

// Criando schema de validação para autenticação
const AuthSchema = z.object({
  email: z.string().email("Email inválido!"),
  password: z.string().min(4, "Senha deve conter pelo menos 4 caracteres"),
});

export default AuthSchema;
