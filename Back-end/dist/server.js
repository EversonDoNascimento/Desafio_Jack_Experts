"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Importando o módulo express para criar o servidor Web
const express_1 = __importDefault(require("express"));
// Importando o módulo helmet para adicionar algumas proteções contra ataques comuns
const helmet_1 = __importDefault(require("helmet"));
// Importando o arquivo de rotas do projeto
const index_1 = __importDefault(require("./routes/index"));
const requestIntercepter_1 = require("./utils/requestIntercepter");
const cors_1 = __importDefault(require("cors"));
//Iniciando o servidor
const server = (0, express_1.default)();
server.use((0, cors_1.default)());
// O helmet é utilizado para proteger a API de alguns ataques hack mais comuns
server.use((0, helmet_1.default)());
// Definindo que por padrão a resposta da minha API será um json
server.use(express_1.default.json());
server.use(express_1.default.urlencoded({ extended: true }));
// Interceptador de rotas, apenas para facilitar a visualização do comportamento das requisições
server.all("*", requestIntercepter_1.requestIntercepter);
server.use("/api", index_1.default);
// Definindo a porta que o meu servidor vai utilizar para disponibilizar o acesso a API
server.listen(process.env.PORT ? process.env.PORT : 3333, () => {
    console.log(`SERVER RUNNING ON PORT: ${process.env.PORT ? process.env.PORT : 3333}`);
});
