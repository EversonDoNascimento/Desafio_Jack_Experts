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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserPrisma = void 0;
// Importando o prisma para estabelecer a conexão com o banco de dados e manipular
const prisma_1 = require("./../libs/prisma");
// Importando a interface UserDAO para garantir que minha Class UserPrisma implemente todos os métodos definido por ela
const UserDao_1 = require("../DAO/UserDao");
class UserPrisma {
    // Método responsável pela criação usuário no banco de dados
    createUser(user) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = { email: user.getEmail(), password: user.getPassword() };
                // Garantido que não haverá usuários com o mesmo email cadastrados no sistema
                const verifyDuplicateUser = yield this.findUserByEmail(data.email);
                if (verifyDuplicateUser)
                    return null;
                // Criando o usuário no banco de dados
                const register = yield prisma_1.prisma.user.create({ data });
                if (register) {
                    const userTemp = new UserDao_1.User();
                    userTemp.setId(register.id);
                    userTemp.setEmail(register.email);
                    userTemp.setPassword(register.password);
                    return userTemp;
                }
                return null;
            }
            catch (error) {
                console.error(error);
                return null;
            }
        });
    }
    // Método responsável por buscar usuários no banco de dados por email
    findUserByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Criando uma instancia de User
                const user = new UserDao_1.User();
                // Buscando algum usuário no banco de dados que corresponda com o email de busca
                const userFind = yield prisma_1.prisma.user.findFirst({ where: { email: email } });
                // Verificando se algum usuário foi retornado
                if (userFind) {
                    // Preenchendo a instancia de User com as informações do user que retornou do banco de dados
                    user.setId(userFind.id);
                    user.setEmail(userFind.email);
                    user.setPassword(userFind.password);
                    // Retornando o user
                    return user;
                }
                return null;
            }
            catch (error) {
                // Caso algum erro ocorra, será informado no console
                console.error(error);
                return null;
            }
        });
    }
    findUserById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const userTemp = new UserDao_1.User();
            try {
                const findUser = yield prisma_1.prisma.user.findFirst({ where: { id } });
                if (findUser) {
                    userTemp.setEmail(findUser.email);
                    userTemp.setPassword(findUser.password);
                    userTemp.setId(findUser.id);
                    return userTemp;
                }
                return null;
            }
            catch (error) {
                console.log(error);
                return null;
            }
        });
    }
}
exports.UserPrisma = UserPrisma;
