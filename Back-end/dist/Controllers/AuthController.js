"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Hash_1 = __importDefault(require("../utils/Hash"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const AuthSchema_1 = __importDefault(require("../Zod/AuthSchema"));
const user_1 = require("../services/user");
class AuthController {
    static userPrisma = new user_1.UserPrisma();
    static login = async (req, res, next) => {
        // Verificando se os dados estão vindo do userController
        if (req.user) {
            const userInfo = req.user;
            return res.json({ userInfo });
        }
        // Validando o que foi recebido no corpo da requisição com o schema definido no zod;
        const body = AuthSchema_1.default.safeParse(req.body);
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
        const verifyPass = await Hash_1.default.verifyPass(password, findUserByEmail.getPassword());
        // Veficando se as senhas coincidem
        if (!verifyPass) {
            return res.json({ error: "Email e/ou senha inválidos!" });
        }
        // Gerando o token de acesso para o usuário
        const token = jsonwebtoken_1.default.sign({ id: findUserByEmail.getId(), email: findUserByEmail.getEmail() }, process.env.JWT_KEY, { expiresIn: "1 hour" });
        return res.status(200).json(token);
    };
}
exports.default = AuthController;
