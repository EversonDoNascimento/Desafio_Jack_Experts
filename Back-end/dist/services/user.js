"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserPrisma = void 0;
// Importando o prisma para estabelecer a conexão com o banco de dados e manipular
const prisma_1 = require("./../libs/prisma");
// Importando a interface UserDAO para garantir que minha Class UserPrisma implemente todos os métodos definido por ela
const UserDao_1 = require("../DAO/UserDao");
class UserPrisma {
    // Método responsável pela criação usuário no banco de dados
    async createUser(user) {
        try {
            const data = { email: user.getEmail(), password: user.getPassword() };
            // Garantido que não haverá usuários com o mesmo email cadastrados no sistema
            const verifyDuplicateUsert = await this.findUserByEmail(data.email);
            if (verifyDuplicateUsert)
                return null;
            // Criando o usuário no banco de dados
            const register = await prisma_1.prisma.user.create({ data });
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
    }
    // Método responsável por buscar usuários no banco de dados por email
    async findUserByEmail(email) {
        try {
            // Criando uma instancia de User
            const user = new UserDao_1.User();
            // Buscando algum usuário no banco de dados que corresponda com o email de busca
            const userFind = await prisma_1.prisma.user.findFirst({ where: { email: email } });
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
    }
    async findUserById(id) {
        const userTemp = new UserDao_1.User();
        try {
            const findUser = await prisma_1.prisma.user.findFirst({ where: { id } });
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
    }
}
exports.UserPrisma = UserPrisma;
