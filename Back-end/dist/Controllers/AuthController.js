"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const Hash_1 = __importDefault(require("../utils/Hash"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const AuthSchema_1 = __importDefault(require("../Zod/AuthSchema"));
const user_1 = require("../services/user");
class AuthController {
}
_a = AuthController;
AuthController.userPrisma = new user_1.UserPrisma();
AuthController.login = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    // Validando o que foi recebido no corpo da requisição com o schema definido no zod;
    // A verificação que está sendo passada como parâmetro serve para verificar se o usuário tá se cadastrando ou
    // fazendo login
    const body = AuthSchema_1.default.safeParse(req.user ? req.user : req.body);
    // Se a validação não estiver correta um aviso é retornado
    if (!body.success) {
        return res.status(500).json({ error: "Dados inválidos" });
    }
    const { email, password } = req.body;
    // Verificando se o email existe no banco de dados
    const findUserByEmail = yield _a.userPrisma.findUserByEmail(email);
    if (!findUserByEmail)
        return res.status(404).json({ error: "Usuário não encontrado!" });
    // Fazer verificação de senha utilizando o Hash
    const verifyPass = yield Hash_1.default.verifyPass(password, findUserByEmail.getPassword());
    // Veficando se as senhas coincidem
    if (!verifyPass) {
        return res.status(401).json({ error: "Email e/ou senha inválidos!" });
    }
    // Gerando o token de acesso para o usuário
    const token = jsonwebtoken_1.default.sign({ id: findUserByEmail.getId(), email: findUserByEmail.getEmail() }, process.env.JWT_KEY, { expiresIn: "1 hour" });
    return res.status(200).json({ token });
});
AuthController.verifyToken = (_, res) => __awaiter(void 0, void 0, void 0, function* () {
    return res.status(200).json({ success: true });
});
exports.default = AuthController;
