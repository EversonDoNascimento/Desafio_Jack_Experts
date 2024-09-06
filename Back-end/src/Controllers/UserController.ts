import { RequestHandler } from "express";
import AuthSchema from "../Zod/AuthSchema";
import { User } from "../DAO/UserDao";
import Hash from "../utils/Hash";
import { UserPrisma } from "../services/user";
class UserController {
  // Criando um atributo com uma instância da classe UserPrisma
  private static userPrisma: UserPrisma = new UserPrisma();

  public static registerUser: RequestHandler = async (req, res, next) => {
    try {
      // Validando o que foi recebido no corpo da requisição com o meu schema definido no zod;
      const body = AuthSchema.safeParse(req.body);
      // Se a validação não estiver correta um aviso é retornado
      if (!body.success) {
        return res.status(500).json({ error: "Dados inválidos" });
      }
      const { email, password } = req.body;
      // utilizando o método createdPass da classe Hash para encriptar a senha antes de salvar no banco de dados
      const hashPass = await Hash.createdPass(password);
      // Criando a instancia da classe User
      const user = new User();
      // Preenchendo a instancia com informações do email e a senha criptografada
      user.setEmail(email);
      user.setPassword(hashPass);
      // Utilizando a conexão com o banco de dados para criar o usuário
      const created = await this.userPrisma.createUser(user);
      // Verificando se o usuário foi criado com sucesso
      if (created == null) {
        return res.status(500).json({ error: "Erro ao cadastrar usuário!" });
      }
      req.user = created;
      next();
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: error });
    }
  };
}

export default UserController;
