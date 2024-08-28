import { Task, TaskDAO } from "../DAO/TaskDao";
import { User } from "../DAO/UserDao";
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
      console.log(error);
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
      console.log(error);
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
      console.log(error);
      return null;
    }
    return null;
  }
}
