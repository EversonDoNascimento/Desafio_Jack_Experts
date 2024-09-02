import { RequestHandler } from "express";
import Hash from "../utils/Hash";
import JWT from "jsonwebtoken";
import AuthSchema from "../Zod/AuthSchema";
import { UserPrisma } from "../services/user";

class AuthController {
  private static userPrisma: UserPrisma = new UserPrisma();
  public static login: RequestHandler = async (req, res, next) => {
    // Validando o que foi recebido no corpo da requisição com o schema definido no zod;
    // A verificação que está sendo passada como parâmetro serve para verificar se o usuário tá se cadastrando ou
    // fazendo login
    const body = AuthSchema.safeParse(req.user ? req.user : req.body);
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
      return res.status(401).json({ error: "Email e/ou senha inválidos!" });
    }
    // Gerando o token de acesso para o usuário
    const token = JWT.sign(
      { id: findUserByEmail.getId(), email: findUserByEmail.getEmail() },
      process.env.JWT_KEY as string,
      { expiresIn: "1 hour" }
    );
    return res.status(200).json({ token });
  };
  public static verifyToken: RequestHandler = async (_, res) => {
    return res.status(200).json({ success: true });
  };
}

export default AuthController;
