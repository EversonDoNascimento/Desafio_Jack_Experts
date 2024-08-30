"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Importando o módulo bcrypt
const bcrypt_1 = __importDefault(require("bcrypt"));
// A Class hash utiliza a biblioteca bcrypt que é responsável por criptografar a senha e verificar se está correta
class Hash {
    static createdPass = async (password) => {
        return await bcrypt_1.default.hash(password, 10);
    };
    static verifyPass = async (password, hashedPassword) => {
        return await bcrypt_1.default.compare(password, hashedPassword);
    };
}
exports.default = Hash;
