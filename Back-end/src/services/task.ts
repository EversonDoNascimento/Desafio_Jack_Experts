import { Task, TaskDAO } from "../DAO/TaskDao";
import { prisma } from "../libs/prisma";

export class TaskPrisma implements TaskDAO {
  public async createTask(task: Task): Promise<Task | null> {
    try {
      const data = {
        title: task.getTitle(),
        description: task.getDescription(),
        completed: task.getCompleted(),
        id_user: task.getIdUser(),
      };
      if (data) {
        const createdTask = await prisma.task.create({ data });
        const taskTemp = new Task();
        if (createdTask) {
          taskTemp.setId(createdTask.id);
          taskTemp.setTitle(createdTask.title);
          taskTemp.setDescription(createdTask.description as string);
          taskTemp.setCompleted(createdTask.completed);
          taskTemp.setUserId(createdTask.id_user);
          return taskTemp;
        }
      }
      return null;
    } catch (error) {
      console.error(error);
      return null;
    }
  }
  public async findTaskById(id: string): Promise<Task | null> {
    const taskTemp = new Task();
    try {
      if (id) {
        const findTask = await prisma.task.findFirst({ where: { id } });
        if (findTask) {
          taskTemp.setId(findTask.id);
          taskTemp.setTitle(findTask.title);
          taskTemp.setDescription(findTask.description as string);
          taskTemp.setCompleted(findTask.completed);
          taskTemp.setUserId(findTask.id_user);
        }
        return taskTemp;
      }
    } catch (error) {
      console.error(error);
      return null;
    }
    return null;
  }
  public async listTasks(id_user: string): Promise<Task[] | null | void> {
    try {
      if (!id_user) return null;

      const findUser = await prisma.user.findFirst({
        where: { id: id_user },
      });
      if (findUser) {
        const findTasksByUserId = await prisma.task.findMany({
          where: { id_user: findUser.id },
        });
        const data: Task[] | void = findTasksByUserId.map((task) => {
          const taskTemp = new Task();
          taskTemp.setId(task.id);
          taskTemp.setTitle(task.title);
          taskTemp.setDescription(task.description as string);
          taskTemp.setCompleted(task.completed);
          taskTemp.setUserId(task.id_user);
          return taskTemp;
        });
        return data;
      }
    } catch (error) {
      console.error(error);
      return null;
    }
    return null;
  }
  public async completedTask(id: string, status: number): Promise<Task | null> {
    const taskTemp = new Task();
    try {
      if (id) {
        const findTask = await prisma.task.findFirst({ where: { id: id } });
        if (findTask) {
          taskTemp.setId(findTask.id);
          taskTemp.setTitle(findTask.title);
          taskTemp.setDescription(findTask.description as string);
          taskTemp.setCompleted(findTask.completed);
          taskTemp.setUserId(findTask.id_user);
          // 0 | 1 | 2
          const data = { completed: status };
          const updateTask = await prisma.task.update({ where: { id }, data });
          if (updateTask) {
            taskTemp.setId(updateTask.id);
            taskTemp.setTitle(updateTask.title);
            taskTemp.setDescription(updateTask.description as string);
            taskTemp.setCompleted(updateTask.completed);
            taskTemp.setUserId(updateTask.id_user);
            return taskTemp;
          }
          return null;
        }
      }
    } catch (error) {
      console.error(error);
      return null;
    }
    return null;
  }
  public async deleteTask(id: string): Promise<boolean> {
    try {
      if (id) {
        // Verificando se a task existe no banco de dados;
        const findTask = await prisma.task.findFirst({ where: { id: id } });
        if (findTask) {
          const deleteTask = await prisma.task.delete({ where: { id: id } });
          // Verificando se a task foi deletada com sucesso!
          if (deleteTask) {
            return true;
          }
        }
      }
    } catch (error) {
      console.error(error);
      return false;
    }
    return false;
  }
  public async editTask(task: Task): Promise<Task | null> {
    try {
      if (task.getId() !== "") {
        const data = {
          title: task.getTitle(),
          description: task.getDescription(),
        };
        const updateTask = await prisma.task.update({
          where: { id: task.getId() },
          data,
        });
        if (updateTask) {
          task.setId(updateTask.id);
          task.setTitle(updateTask.title);
          task.setDescription(updateTask.description as string);
          task.setCompleted(updateTask.completed);
          task.setUserId(updateTask.id_user);
          return task;
        }
        return null;
      }
      return null;
    } catch (error) {
      console.error(error);
      return null;
    }
  }
  public async qtdTasksByStatus(id_user: string): Promise<{
    doing: number;
    todo: number;
    done: number;
    total: number;
  } | null> {
    try {
      // Verificando se o ID do usuário foi enviado
      if (id_user) {
        // Objeto de retorno das quantidades
        const qtdTasks: {
          doing: number;
          todo: number;
          done: number;
          total: number;
        } = {
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
          const findQtdTasksByStatus = await prisma.task.count({
            where: { id_user, completed: index },
          });
          if (findQtdTasksByStatus || findQtdTasksByStatus == 0) {
            tempArray[index] = findQtdTasksByStatus;
          }
        }
        // Rodando um reduce para somar a quantidade de todas as tasks encontradas
        const qtdTotalTasks = tempArray.reduce(
          (accumulator, currentItem) => accumulator + currentItem,
          0
        );
        qtdTasks.todo = tempArray[0];
        qtdTasks.doing = tempArray[1];
        qtdTasks.done = tempArray[2];
        qtdTasks.total = qtdTotalTasks;
        return qtdTasks;
      }
      return null;
    } catch (error) {
      console.error(error);
      return null;
    }
  }
}
