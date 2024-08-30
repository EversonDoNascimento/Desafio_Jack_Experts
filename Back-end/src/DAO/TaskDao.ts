export class Task {
  public constructor(
    private id: string = "",
    private title: string = "",
    private description: string = "",
    private completed: boolean = false,
    private id_user: string = ""
  ) {}

  public getId() {
    return this.id;
  }
  public setId(id: string) {
    this.id = id;
  }
  public getTitle() {
    return this.title;
  }
  public setTitle(title: string) {
    this.title = title;
  }
  public getDescription() {
    return this.description;
  }
  public setDescription(description: string) {
    this.description = description;
  }
  public getCompleted() {
    return this.completed;
  }
  public setCompleted(completed: boolean) {
    this.completed = completed;
  }
  public getIdUser() {
    return this.id_user;
  }
  public setUserId(id_user: string) {
    this.id_user = id_user;
  }
}

export interface TaskDAO {
  // Método para procurar uma tarefa específica por ID
  findTaskById: (id: string) => Promise<Task | null>;
  // Método que lista todas as tasks por ID do usuário associado a task
  listTasks: (id_user: string) => Promise<Task[] | null | void>;
  // Método para criar Task
  createTask: (task: Task) => Promise<Task | null>;
  // Método para marcar uma task como concluída
  completedTask: (id: string) => Promise<Task | null>;
  //Método para editar uma task
  editTask: (task: Task) => Promise<Task | null>;
  // Método para excluir uma task
  deleteTask: (id: string) => Promise<boolean>;
}
