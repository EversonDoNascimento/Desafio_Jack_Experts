import { RequestHandler } from "express";
import Hash from "../utils/Hash";
import JWT from "jsonwebtoken";
import AuthSchema from "../Zod/AuthSchema";
import { UserPrisma } from "../services/user";

class AuthController {
  private static userPrisma: UserPrisma = new UserPrisma();
  public static login: RequestHandler = async (req, res, next) => {
    // Verificando se os dados estão vindo do userController
    if (req.user) {
      const userInfo = req.user;
      return res.json({ userInfo });
    }

    // Validando o que foi recebido no corpo da requisição com o schema definido no zod;
    const body = AuthSchema.safeParse(req.body);
    // Se a validação não estiver correta um aviso é retornado
    if (!body.success) {
      return res.status(500).json({ error: "Dados inválidos" });
    }
    const { email, password } = req.body;
    // Verificando se o email existe no banco de dados
    const findUserByEmail = await this.userPrisma.findUserByEmail(email);
    if (!findUserByEmail)
      return res.status(404).json({ error: "Usuário não encontrado!" });
    // Fazer verificação de senha utilizando o Hash
    const verifyPass = await Hash.verifyPass(
      password,
      findUserByEmail.getPassword()
    );
    // Veficando se as senhas coincidem
    if (!verifyPass) {
      return res.json({ error: "Email e/ou senha inválidos!" });
    }
    // Gerando o token de acesso para o usuário
    const token = JWT.sign(
      { id: findUserByEmail.getId(), email: findUserByEmail.getEmail() },
      process.env.JWT_KEY as string,
      { expiresIn: "1 minute" }
    );
    return res.status(200).json(token);
  };
}

export default AuthController;
