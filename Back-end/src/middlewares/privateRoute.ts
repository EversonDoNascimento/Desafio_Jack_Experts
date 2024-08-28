import { RequestHandler } from "express";
import JWT from "jsonwebtoken";

const privateRoute: RequestHandler = (req, res, next) => {
  // Verificando se no header existe o authorization
  if (!req.headers.authorization) {
    return res.status(401).json({ error: "Precisa de acesso!" });
  }
  // Separando a string e criando um array com o Bearer e o Token
  const authorizationToken = req.headers.authorization.split(" ");
  // Verificando se o Bearer foi enviado
  if (authorizationToken[0] !== "Bearer") {
    return res.status(401).json({ error: "Precisa de acesso!" });
  }
  let logged = false;
  try {
    // Verificando se o token enviado é válido
    JWT.verify(authorizationToken[1], process.env.JWT_KEY as string);
    // Mudando o status de logged para true
    logged = true;
  } catch (error) {
    return res.status(401).json({ error: "Não autorizado!" });
  }
  // Se logged for true, então significa que o usuário está logado
  if (logged) return next();

  // Caso logged seja false
  return res.status(401).json({ error: "Token inválido!" });
};

export default privateRoute;
