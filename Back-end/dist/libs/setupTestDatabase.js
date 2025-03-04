"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const child_process_1 = require("child_process");
// Configurando o banco de dados de teste
const setupTestDatabase = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Sempre que o comando de teste rodar o prisma irá resetar o banco de dados
        // Isso evita possíveis conflitos de dados existentes
        console.log("Resetando banco de dados de teste...");
        (0, child_process_1.execSync)("npx prisma migrate reset --force --skip-generate --skip-seed");
    }
    catch (error) {
        // Caso algum erro ocorra
        console.error("Erro ao configurar o banco de dados de teste:", error);
        process.exit(1);
    }
});
setupTestDatabase();
