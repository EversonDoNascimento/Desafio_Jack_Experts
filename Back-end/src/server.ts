import express from "express";
import helmet from "helmet";
import router from "./routes";
//Iniciando o servidor
const server = express();
// O helmet é utilizado para proteger a API de alguns ataques hack mais comuns
server.use(helmet());
// Definindo que por padrão a resposta da minha API será um json
server.use(express.json());
server.use(express.urlencoded({ extended: true }));

server.use("/", router);
// Definindo a porta que o meu servidor vai utilizar para disponibilizar o acesso a API
server.listen(process.env.PORT ? process.env.PORT : 3333, () => {
  console.log(
    `SERVER RUNNING ON PORT: ${process.env.PORT ? process.env.PORT : 3333}`
  );
});
