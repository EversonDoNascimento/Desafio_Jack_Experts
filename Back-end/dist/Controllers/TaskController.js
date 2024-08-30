"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = require("../services/user");
const TaskSchema_1 = require("../Zod/TaskSchema");
const task_1 = require("../services/task");
const TaskDao_1 = require("../DAO/TaskDao");
class TaskController {
    static userPrisma = new user_1.UserPrisma();
    static taskPrisma = new task_1.TaskPrisma();
    // Método para listar todas as tasks relacionadas ao usuário
    static listTasksByUserId = async (req, res) => {
        // Obtendo id do usuário via params
        const { id_user } = req.params;
        // Verificando se o id foi enviado
        if (!id_user)
            return res.status(404).json({ error: "ID do usuário não foi enviado!" });
        // Buscando as tasks relacionadas ao usuário
        const findTasks = await this.taskPrisma.listTasks(id_user);
        // Verificando se ocorreu algum erro durante a busca pelas tasks
        if (!findTasks)
            return res
                .status(404)
                .json({ error: "Erro ao buscar tarefas ou usuário não encontrado!" });
        // Retornando os dados
        return res.status(200).json({ data: findTasks });
    };
    // Método para buscar uma task pelo ID
    static getTaskById = async (req, res) => {
        // Obtendo o id da task do params da requisição
        const { id_task } = req.params;
        // Verificando se o id foi enviado
        if (!id_task)
            return res.status(404).json({ error: "ID da tarefa não enviado!" });
        // Buscando o id no banco de dados
        const findTask = await this.taskPrisma.findTaskById(id_task);
        // Verificando se houve algum erro ao buscar a tarefa no banco de dados
        if (!findTask)
            return res.status(500).json({ error: "Erro ao buscar tarefa!" });
        // Verificando se o ID da tarefa foi retornado do banco, caso retorne significa que a tarefa existe
        if (findTask.getId() !== "") {
            return res.status(200).json(findTask);
        }
        // Retorno caso a tarefa não seja encontrada
        return res.status(404).json({ error: "Tarefa não encontrada!" });
    };
    // Método para registrar uma task
    static registerTask = async (req, res) => {
        // Validando o que foi recebido no corpo da requisição com o meu schema definido no zod;
        const body = TaskSchema_1.TaskSchema.safeParse(req.body);
        // Se a validação não estiver correta um aviso é retornado
        if (!body.success) {
            return res.status(500).json({ error: "Dados inválidos" });
        }
        // Pegando informações do corpo da requisição
        const { title, description, id_user } = req.body;
        // Verificando se o usuário existe pelo ID
        const findUser = await this.userPrisma.findUserById(id_user);
        if (!findUser) {
            return res.status(404).json({ error: "Usuário não encontrado!" });
        }
        // Criando a instancia de task e preenchendo com as informações do body
        const task = new TaskDao_1.Task();
        task.setTitle(title);
        task.setDescription(description);
        task.setUserId(id_user);
        // Criando a task no banco dados
        const createTask = await this.taskPrisma.createTask(task);
        if (createTask) {
            return res.status(201).json(createTask);
        }
        return res.status(500).json({ error: "Erro ao criar tarefa!" });
    };
    // Alterando status da tarefa
    static toggleTaskStatus = async (req, res) => {
        // Obtendo o ID da task através do params da URL
        const { id_task } = req.params;
        // Verificando se o ID foi enviado
        if (!id_task)
            return res.status(404).json({ error: "ID da tarefa não enviado!" });
        // Modificando o status da task
        // Se estiver como true passa a ser false, ou vice-versa
        const updateTask = await this.taskPrisma.completedTask(id_task);
        // Verificando se no processo de alteração de status ocorreu algum erro
        if (!updateTask) {
            return res
                .status(500)
                .json({ error: "Erro ao atualizar status da tarefa!" });
        }
        // Retornando a task com o status atualizado
        return res.status(200).json(updateTask);
    };
    static deleteTask = async (req, res) => {
        // Obtendo o ID da task através do params da URL
        const { id_task } = req.params;
        // Verificando se o ID foi enviado
        if (!id_task)
            return res.status(404).json({ error: "ID da tarefa não enviado!" });
        // Deletando a task
        const deleteTask = await this.taskPrisma.deleteTask(id_task);
        if (!deleteTask) {
            return res.status(500).json({ error: "Erro ao deletar a tarefa!" });
        }
        return res.status(200).json({ success: "Tarefa deletada com sucesso!" });
    };
    static editTask = async (req, res) => {
        // Validando o que foi recebido no corpo da requisição com o meu schema definido no zod;
        const body = TaskSchema_1.TaskSchemaEdit.safeParse(req.body);
        // Se a validação não estiver correta um aviso é retornado
        if (!body.success) {
            return res.status(500).json({ error: "Dados inválidos" });
        }
        // Pegando informações do corpo da requisição
        const { id, title, description } = req.body;
        // Preenchendo a instancia da classe task com as informações
        const task = new TaskDao_1.Task();
        task.setId(id);
        task.setTitle(title);
        task.setDescription(description);
        // Atualizando a task
        const updateTask = await this.taskPrisma.editTask(task);
        if (!updateTask) {
            return res.status(500).json({ error: "Erro ao atualizar a tarefa!" });
        }
        return res.status(200).json({ data: updateTask });
    };
}
exports.default = TaskController;
