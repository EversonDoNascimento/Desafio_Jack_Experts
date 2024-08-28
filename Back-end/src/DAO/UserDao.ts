// Criando a classe User
export class User {
  constructor(
    private id: string = "",
    private email: string = "",
    private password: string = ""
  ) {}
  // Declarando os métodos getters e setters da classe User
  public getId(): string {
    return this.id;
  }
  public setId(id: string): void {
    this.id = id;
  }
  public getEmail(): string {
    return this.email;
  }
  public setEmail(email: string): void {
    this.email = email.toLowerCase();
  }
  public getPassword(): string {
    return this.password;
  }
  public setPassword(pass: string): void {
    this.password = pass;
  }
}
// Criando a interface com os métodos que devem ser implementados na classe que irá manipular os dados do usuário
export interface UserDAO {
  createUser: (user: User) => Promise<User | null>;
  findUserByEmail: (email: string) => Promise<User | null>;
}
