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
exports.TaskPrisma = void 0;
const TaskDao_1 = require("../DAO/TaskDao");
const prisma_1 = require("../libs/prisma");
class TaskPrisma {
    createTask(task) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = {
                    title: task.getTitle(),
                    description: task.getDescription(),
                    completed: task.getCompleted(),
                    id_user: task.getIdUser(),
                };
                if (data) {
                    const createdTask = yield prisma_1.prisma.task.create({ data });
                    const taskTemp = new TaskDao_1.Task();
                    if (createdTask) {
                        taskTemp.setId(createdTask.id);
                        taskTemp.setTitle(createdTask.title);
                        taskTemp.setDescription(createdTask.description);
                        taskTemp.setCompleted(createdTask.completed);
                        taskTemp.setUserId(createdTask.id_user);
                        return taskTemp;
                    }
                }
                return null;
            }
            catch (error) {
                console.error(error);
                return null;
            }
        });
    }
    findTaskById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const taskTemp = new TaskDao_1.Task();
            try {
                if (id) {
                    const findTask = yield prisma_1.prisma.task.findFirst({ where: { id } });
                    if (findTask) {
                        taskTemp.setId(findTask.id);
                        taskTemp.setTitle(findTask.title);
                        taskTemp.setDescription(findTask.description);
                        taskTemp.setCompleted(findTask.completed);
                        taskTemp.setUserId(findTask.id_user);
                    }
                    return taskTemp;
                }
            }
            catch (error) {
                console.error(error);
                return null;
            }
            return null;
        });
    }
    listTasks(id_user) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!id_user)
                    return null;
                const findUser = yield prisma_1.prisma.user.findFirst({
                    where: { id: id_user },
                });
                if (findUser) {
                    const findTasksByUserId = yield prisma_1.prisma.task.findMany({
                        where: { id_user: findUser.id },
                    });
                    const data = findTasksByUserId.map((task) => {
                        const taskTemp = new TaskDao_1.Task();
                        taskTemp.setId(task.id);
                        taskTemp.setTitle(task.title);
                        taskTemp.setDescription(task.description);
                        taskTemp.setCompleted(task.completed);
                        taskTemp.setUserId(task.id_user);
                        return taskTemp;
                    });
                    return data;
                }
            }
            catch (error) {
                console.error(error);
                return null;
            }
            return null;
        });
    }
    completedTask(id, status) {
        return __awaiter(this, void 0, void 0, function* () {
            const taskTemp = new TaskDao_1.Task();
            try {
                if (id) {
                    const findTask = yield prisma_1.prisma.task.findFirst({ where: { id: id } });
                    if (findTask) {
                        taskTemp.setId(findTask.id);
                        taskTemp.setTitle(findTask.title);
                        taskTemp.setDescription(findTask.description);
                        taskTemp.setCompleted(findTask.completed);
                        taskTemp.setUserId(findTask.id_user);
                        // 0 | 1 | 2
                        const data = { completed: status };
                        const updateTask = yield prisma_1.prisma.task.update({ where: { id }, data });
                        if (updateTask) {
                            taskTemp.setId(updateTask.id);
                            taskTemp.setTitle(updateTask.title);
                            taskTemp.setDescription(updateTask.description);
                            taskTemp.setCompleted(updateTask.completed);
                            taskTemp.setUserId(updateTask.id_user);
                            return taskTemp;
                        }
                        return null;
                    }
                }
            }
            catch (error) {
                console.error(error);
                return null;
            }
            return null;
        });
    }
    deleteTask(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (id) {
                    // Verificando se a task existe no banco de dados;
                    const findTask = yield prisma_1.prisma.task.findFirst({ where: { id: id } });
                    if (findTask) {
                        const deleteTask = yield prisma_1.prisma.task.delete({ where: { id: id } });
                        // Verificando se a task foi deletada com sucesso!
                        if (deleteTask) {
                            return true;
                        }
                    }
                }
            }
            catch (error) {
                console.error(error);
                return false;
            }
            return false;
        });
    }
    editTask(task) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (task.getId() !== "") {
                    const data = {
                        title: task.getTitle(),
                        description: task.getDescription(),
                    };
                    const updateTask = yield prisma_1.prisma.task.update({
                        where: { id: task.getId() },
                        data,
                    });
                    if (updateTask) {
                        task.setId(updateTask.id);
                        task.setTitle(updateTask.title);
                        task.setDescription(updateTask.description);
                        task.setCompleted(updateTask.completed);
                        task.setUserId(updateTask.id_user);
                        return task;
                    }
                    return null;
                }
                return null;
            }
            catch (error) {
                console.error(error);
                return null;
            }
        });
    }
    qtdTasksByStatus(id_user) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Verificando se o ID do usuário foi enviado
                if (id_user) {
                    // Objeto de retorno das quantidades
                    const qtdTasks = {
                        todo: 0,
                        doing: 0,
                        done: 0,
                        total: 0,
                    };
                    // Criando o array temporário para armazenar a quantidade de tasks por status
                    const tempArray = [];
                    // Rodando um laço for para pegar do status 0 até 0 2
                    // Status 0 = Para fazer
                    // Status 1 = Fazendo
                    // Status 2 = Feito
                    for (let index = 0; index <= 2; index++) {
                        const findQtdTasksByStatus = yield prisma_1.prisma.task.count({
                            where: { id_user, completed: index },
                        });
                        if (findQtdTasksByStatus || findQtdTasksByStatus == 0) {
                            tempArray[index] = findQtdTasksByStatus;
                        }
                    }
                    // Rodando um reduce para somar a quantidade de todas as tasks encontradas
                    const qtdTotalTasks = tempArray.reduce((accumulator, currentItem) => accumulator + currentItem, 0);
                    qtdTasks.todo = tempArray[0];
                    qtdTasks.doing = tempArray[1];
                    qtdTasks.done = tempArray[2];
                    qtdTasks.total = qtdTotalTasks;
                    return qtdTasks;
                }
                return null;
            }
            catch (error) {
                console.error(error);
                return null;
            }
        });
    }
}
exports.TaskPrisma = TaskPrisma;
