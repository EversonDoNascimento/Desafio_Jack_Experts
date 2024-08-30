"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
// Criando a classe User
class User {
    id;
    email;
    password;
    constructor(id = "", email = "", password = "") {
        this.id = id;
        this.email = email;
        this.password = password;
    }
    // Declarando os métodos getters e setters da classe User
    getId() {
        return this.id;
    }
    setId(id) {
        this.id = id;
    }
    getEmail() {
        return this.email;
    }
    setEmail(email) {
        this.email = email.toLowerCase();
    }
    getPassword() {
        return this.password;
    }
    setPassword(pass) {
        this.password = pass;
    }
}
exports.User = User;
