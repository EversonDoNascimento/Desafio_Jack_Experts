"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskPrisma = void 0;
const TaskDao_1 = require("../DAO/TaskDao");
const prisma_1 = require("../libs/prisma");
class TaskPrisma {
    async createTask(task) {
        try {
            const data = {
                title: task.getTitle(),
                description: task.getDescription(),
                completed: task.getCompleted(),
                id_user: task.getIdUser(),
            };
            if (data) {
                const createdTask = await prisma_1.prisma.task.create({ data });
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
    }
    async findTaskById(id) {
        const taskTemp = new TaskDao_1.Task();
        try {
            if (id) {
                const findTask = await prisma_1.prisma.task.findFirst({ where: { id } });
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
    }
    async listTasks(id_user) {
        try {
            if (!id_user)
                return null;
            const findUser = await prisma_1.prisma.user.findFirst({
                where: { id: id_user },
            });
            if (findUser) {
                const findTasksByUserId = await prisma_1.prisma.task.findMany({
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
    }
    async completedTask(id) {
        const taskTemp = new TaskDao_1.Task();
        try {
            if (id) {
                const findTask = await prisma_1.prisma.task.findFirst({ where: { id: id } });
                if (findTask) {
                    taskTemp.setId(findTask.id);
                    taskTemp.setTitle(findTask.title);
                    taskTemp.setDescription(findTask.description);
                    taskTemp.setCompleted(findTask.completed);
                    taskTemp.setUserId(findTask.id_user);
                    const data = { completed: !taskTemp.getCompleted() };
                    const updateTask = await prisma_1.prisma.task.update({ where: { id }, data });
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
    }
    async deleteTask(id) {
        try {
            if (id) {
                // Verificando se a task existe no banco de dados;
                const findTask = await prisma_1.prisma.task.findFirst({ where: { id: id } });
                if (findTask) {
                    const deleteTask = await prisma_1.prisma.task.delete({ where: { id: id } });
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
    }
    async editTask(task) {
        try {
            if (task.getId() !== "") {
                const data = {
                    title: task.getTitle(),
                    description: task.getDescription(),
                };
                const updateTask = await prisma_1.prisma.task.update({
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
    }
}
exports.TaskPrisma = TaskPrisma;
