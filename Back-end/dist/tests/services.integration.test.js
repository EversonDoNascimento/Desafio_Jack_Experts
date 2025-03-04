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
const UserDao_1 = require("../DAO/UserDao");
const user_1 = require("../services/user");
const TaskDao_1 = require("../DAO/TaskDao");
const task_1 = require("../services/task");
const userPrisma = new user_1.UserPrisma();
const user = new UserDao_1.User();
const generatorEmail = Math.floor(Math.random() * 1000);
user.setEmail(`jest${generatorEmail}@test.com`);
user.setPassword("1234");
const taskPrisma = new task_1.TaskPrisma();
const task = new TaskDao_1.Task();
task.setTitle("Estudar");
task.setDescription("Estudar lógica de programação");
task.setCompleted(0);
describe("Test suite responsible for testing the user service", () => {
    // Teste responsável pela criação de usuário
    it("Should create a new user", () => __awaiter(void 0, void 0, void 0, function* () {
        const userCreate = yield userPrisma.createUser(user);
        // Verificando se a instância da classe retornada é do tipo User
        expect(userCreate).toBeInstanceOf(UserDao_1.User);
        // Testando se o email que foi enviado é o mesmo retornado pelo banco de dados
        expect(userCreate === null || userCreate === void 0 ? void 0 : userCreate.getEmail()).toBe(user.getEmail());
        // Preenchendo o ID do objeto local com o id do usuário criado para continuar os testes
        user.setId(userCreate === null || userCreate === void 0 ? void 0 : userCreate.getId());
        // Setando o user id da task com o id do usuário criado
        task.setUserId(userCreate === null || userCreate === void 0 ? void 0 : userCreate.getId());
    }));
    // Teste responsável por buscar usuário pelo ID
    it("Should return a user by id", () => __awaiter(void 0, void 0, void 0, function* () {
        // Buscando usuário por ID
        const findUserById = yield userPrisma.findUserById(user.getId());
        // Verificando se a instância da classe retornada é do tipo User
        expect(findUserById).toBeInstanceOf(UserDao_1.User);
        // Verificando se o usuário retornado é o mesmo que foi utilizado na busca
        expect(findUserById === null || findUserById === void 0 ? void 0 : findUserById.getId()).toBe(user.getId());
    }));
    // Teste responsável por buscar usuário por Email
    it("Should return a user by Email", () => __awaiter(void 0, void 0, void 0, function* () {
        // Buscando usuário pelo Email
        const findUserByEmail = yield userPrisma.findUserByEmail(user.getEmail());
        //Verificando se a instância da classe retornada é do tipo User
        expect(findUserByEmail).toBeInstanceOf(UserDao_1.User);
        // Verificando se o usuário retornado é o mesmo que foi utilizado na busca
        expect(findUserByEmail === null || findUserByEmail === void 0 ? void 0 : findUserByEmail.getEmail()).toBe(user.getEmail());
    }));
});
describe("Test suite responsible for testing the task service", () => {
    // Testando a criação de tarefa
    it("Should create a new task", () => __awaiter(void 0, void 0, void 0, function* () {
        // Criando tarefa
        const createTask = yield taskPrisma.createTask(task);
        // Verificando se a instância da classe retornada é do tipo Task
        expect(createTask).toBeInstanceOf(TaskDao_1.Task);
        // Setando id retornado pela task criada no objeto local da task
        task.setId(createTask === null || createTask === void 0 ? void 0 : createTask.getId());
    }));
    // Testando busca de tarefa por ID
    it("Should return a task by Id", () => __awaiter(void 0, void 0, void 0, function* () {
        // Buscando a tarefa pelo ID
        const findTaskById = yield taskPrisma.findTaskById(task.getId());
        // Verificando se a instância da classe retornada é do tipo Task
        expect(findTaskById).toBeInstanceOf(TaskDao_1.Task);
        // Verificando se a tarefa retornada é a mesma que foi usada no parâmetro de busca
        expect(findTaskById === null || findTaskById === void 0 ? void 0 : findTaskById.getId()).toBe(task.getId());
    }));
    // Testando listagem de tarefas pelo ID do usuário
    it("Should listed tasks by user Id", () => __awaiter(void 0, void 0, void 0, function* () {
        // Buscando todas as tarefas do usuário
        const findTaskByUserId = yield taskPrisma.listTasks(user.getId());
        // Verificando se o retorno da foi do tipo Array
        expect(findTaskByUserId).toBeInstanceOf(Array);
    }));
    // Testando modificação de status da tarefa
    it("Should change the status task", () => __awaiter(void 0, void 0, void 0, function* () {
        // Alterando status da tarefa
        const toggleStatus = yield taskPrisma.completedTask(task.getId(), 2);
        // Verificando se o status foi alterado
        // Inicialmente o status era 0, então após a mudança ele deve passar a ser 2
        expect(toggleStatus === null || toggleStatus === void 0 ? void 0 : toggleStatus.getCompleted()).toEqual(2);
    }));
    // Testando a edição de uma tarefa
    it("Should edit the task", () => __awaiter(void 0, void 0, void 0, function* () {
        // Setando as alterações na task
        task.setTitle("Modificando título..."),
            task.setDescription("Modificando descrição...");
        // Realizando a edição
        const editTask = yield taskPrisma.editTask(task);
        // Verificando se a task foi alterada com o novo valor
        expect(editTask === null || editTask === void 0 ? void 0 : editTask.getTitle()).toBe("Modificando título...");
        expect(editTask === null || editTask === void 0 ? void 0 : editTask.getDescription()).toBe("Modificando descrição...");
    }));
    // Testando a remoção da tarefa
    it("Should remove the task", () => __awaiter(void 0, void 0, void 0, function* () {
        // Deletando a tarefa
        const deleteTask = yield taskPrisma.deleteTask(task.getId());
        // Verificando se a tarefa foi deletada com sucesso. Caso retorne true significa que tudo ocorreu corretamente
        expect(deleteTask).toBeTruthy();
    }));
});
