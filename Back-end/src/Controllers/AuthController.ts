import { RequestHandler } from "express";
import Hash from "../utils/Hash";
import JWT from "jsonwebtoken";
import AuthSchema from "../Zod/AuthSchema";
import { findUserByEmailAndPass } from "../tempJWT/User";

class AuthController {
  public static login: RequestHandler = (req, res, next) => {
    // Validando o que foi recebido no corpo da requisição com o meu schema definido no zod;
    const body = AuthSchema.safeParse(req.body);
    // Se a validação não estiver correta um aviso é retornado
    if (!body.success) {
      return res.status(500).json({ error: "Dados inválidos" });
    }
    const { email, password } = req.body;
    // Verificando se o email existe no banco de dados
    const findUserByEmail = findUserByEmailAndPass({
      email,
      pass: password,
      id: 1,
    });
    if (!findUserByEmail)
      return res.status(404).json({ error: "Usuário não encontrado!" });
    // Fazer verificação de senha utilizando o Hash
    const token = JWT.sign(
      { id: findUserByEmail.id, email: findUserByEmail.email },
      process.env.JWT_KEY as string,
      { expiresIn: "1 minute" }
    );
    return res.status(200).json(token);
  };
}

export default AuthController;
