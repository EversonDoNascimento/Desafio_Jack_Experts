// Importando o módulo express para criar o servidor Web
import express from "express";

// Importando o módulo helmet para adicionar algumas proteções contra ataques comuns
import helmet from "helmet";
// Importando o arquivo de rotas do projeto
import router from "./routes/index";
import { requestIntercepter } from "./utils/requestIntercepter";
import cors from "cors";
//Iniciando o servidor
const server = express();

server.use(cors());
// O helmet é utilizado para proteger a API de alguns ataques hack mais comuns
server.use(helmet());
// Definindo que por padrão a resposta da minha API será um json
server.use(express.json());
server.use(express.urlencoded({ extended: true }));
// Interceptador de rotas, apenas para facilitar a visualização do comportamento das requisições
server.all("*", requestIntercepter);
server.use("/api", router);
// Definindo a porta que o meu servidor vai utilizar para disponibilizar o acesso a API
server.listen(process.env.PORT ? process.env.PORT : 3333, () => {
  console.log(
    `SERVER RUNNING ON PORT: ${process.env.PORT ? process.env.PORT : 3333}`
  );
});
