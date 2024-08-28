import { User } from "@prisma/client";
import { Task, TaskDAO } from "../DAO/TaskDao";
import { prisma } from "../libs/prisma";

export class TaskPrisma implements TaskDAO {
  public async createTask(task: Task): Promise<Task | null> {
    return null;
  }
  public async findTaskById(id: string): Promise<Task | null> {
    return null;
  }
  public async listTasks(user: User): Promise<Task | null> {
    return null;
  }
}
