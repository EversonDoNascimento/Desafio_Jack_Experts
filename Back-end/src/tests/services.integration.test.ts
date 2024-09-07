import { User } from "../DAO/UserDao";
import { UserPrisma } from "../services/user";
import { Task } from "../DAO/TaskDao";
import { TaskPrisma } from "../services/task";

const userPrisma = new UserPrisma();
const user = new User();
user.setEmail("jest3@test.com");
user.setPassword("1234");

const taskPrisma = new TaskPrisma();
const task = new Task();
task.setTitle("Estudar");
task.setDescription("Estudar lógica de programação");
task.setCompleted(0);

describe("Test suite responsible for testing the user service", () => {
  // Teste responsável pela criação de usuário

  it("Testing the user creation", async () => {
    const userCreate = await userPrisma.createUser(user);
    // Verificando se a instância da classe retornada é do tipo User
    expect(userCreate).toBeInstanceOf(User);
    // Testando se o email que foi enviado é o mesmo retornado pelo banco de dados
    expect(userCreate?.getEmail()).toBe(user.getEmail());
    // Preenchendo o ID do objeto local com o id do usuário criado para continuar os testes
    user.setId(userCreate?.getId() as string);
    // Setando o user id da task com o id do usuário criado
    task.setUserId(userCreate?.getId() as string);
  });

  // Teste responsável por buscar usuário pelo ID
  it("Testing search user by id", async () => {
    // Buscando usuário por ID
    const findUserById = await userPrisma.findUserById(user.getId());
    // Verificando se a instância da classe retornada é do tipo User
    expect(findUserById).toBeInstanceOf(User);
    // Verificando se o usuário retornado é o mesmo que foi utilizado na busca
    expect(findUserById?.getId()).toBe(user.getId());
  });

  // Teste responsável por buscar usuário por Email
  it("Testing search user by Email", async () => {
    // Buscando usuário pelo Email
    const findUserByEmail = await userPrisma.findUserByEmail(user.getEmail());
    //Verificando se a instância da classe retornada é do tipo User
    expect(findUserByEmail).toBeInstanceOf(User);
    // Verificando se o usuário retornado é o mesmo que foi utilizado na busca
    expect(findUserByEmail?.getEmail()).toBe(user.getEmail());
  });
});

describe("Test suite responsible for testing the task service", () => {
  // Testando a criação de tarefa
  it("Testing the task creation", async () => {
    // Criando tarefa
    const createTask = await taskPrisma.createTask(task);
    // Verificando se a instância da classe retornada é do tipo Task
    expect(createTask).toBeInstanceOf(Task);
    // Setando id retornado pela task criada no objeto local da task
    task.setId(createTask?.getId() as string);
  });
  // Testando busca de tarefa por ID
  it("Testing search task by Id", async () => {
    // Buscando a tarefa pelo ID
    const findTaskById = await taskPrisma.findTaskById(task.getId());
    // Verificando se a instância da classe retornada é do tipo Task
    expect(findTaskById).toBeInstanceOf(Task);
    // Verificando se a tarefa retornada é a mesma que foi usada no parâmetro de busca
    expect(findTaskById?.getId()).toBe(task.getId());
  });
  // Testando listagem de tarefas pelo ID do usuário
  it("Testing list tasks by user Id", async () => {
    // Buscando todas as tarefas do usuário
    const findTaskByUserId = await taskPrisma.listTasks(user.getId());
    // Verificando se o retorno da foi do tipo Array
    expect(findTaskByUserId).toBeInstanceOf(Array);
  });
  // Testando modificação de status da tarefa
  it("Testing task status change", async () => {
    // Alterando status da tarefa
    const toggleStatus = await taskPrisma.completedTask(task.getId(), 2);
    // Verificando se o status foi alterado
    // Inicialmente o status era 0, então após a mudança ele deve passar a ser 2
    expect(toggleStatus?.getCompleted()).toEqual(2);
  });
  // Testando a edição de uma tarefa
  it("Testing task editing", async () => {
    // Setando as alterações na task
    task.setTitle("Modificando título..."),
      task.setDescription("Modificando descrição...");
    // Realizando a edição
    const editTask = await taskPrisma.editTask(task);
    // Verificando se a task foi alterada com o novo valor
    expect(editTask?.getTitle()).toBe("Modificando título...");
    expect(editTask?.getDescription()).toBe("Modificando descrição...");
  });
  // Testando a remoção da tarefa
  it("Testing task removal", async () => {
    // Deletando a tarefa
    const deleteTask = await taskPrisma.deleteTask(task.getId());
    // Verificando se a tarefa foi deletada com sucesso. Caso retorne true significa que tudo ocorreu corretamente
    expect(deleteTask).toBeTruthy();
  });
});
