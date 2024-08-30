"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const AuthSchema_1 = __importDefault(require("../Zod/AuthSchema"));
const UserDao_1 = require("../DAO/UserDao");
const Hash_1 = __importDefault(require("../utils/Hash"));
const user_1 = require("../services/user");
class UserController {
    // Criando um atributo com uma instância da classe UserPrisma
    static userPrisma = new user_1.UserPrisma();
    static registerUser = async (req, res, next) => {
        // Validando o que foi recebido no corpo da requisição com o meu schema definido no zod;
        const body = AuthSchema_1.default.safeParse(req.body);
        // Se a validação não estiver correta um aviso é retornado
        if (!body.success) {
            return res.status(500).json({ error: "Dados inválidos" });
        }
        const { email, password } = req.body;
        // utilizando o método createdPass da classe Hash para encriptar a senha antes de salvar no banco de dados
        const hashPass = await Hash_1.default.createdPass(password);
        // Criando a instancia da classe User
        const user = new UserDao_1.User();
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
    };
}
exports.default = UserController;
