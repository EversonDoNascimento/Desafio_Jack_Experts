"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Importando o módulo zod para criar schema de validações
const zod_1 = require("zod");
// Criando schema de validação para autenticação
const AuthSchema = zod_1.z.object({
    email: zod_1.z.string().email("Email inválido!"),
    password: zod_1.z.string().min(4, "A senha deve conter pelo menos 4 caracteres"),
});
exports.default = AuthSchema;
