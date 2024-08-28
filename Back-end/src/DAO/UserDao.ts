// Criando a classe User
export class User {
  constructor(
    private id: number = 0,
    private email: string = "",
    private password: string = ""
  ) {}
  // Declarando os métodos getters e setters da classe User
  public getId(): number {
    return this.id;
  }
  public setId(id: number): void {
    this.id = id;
  }
  public getEmail(): string {
    return this.email;
  }
  public setEmail(email: string): void {
    this.email = email;
  }
  public getPassword(): string {
    return this.password;
  }
  public setPassword(pass: string): void {
    this.password = pass;
  }
}

export interface UserDAO {
  createUser: (user: User) => Promise<User | null>;
  findUserByEmail: (email: string) => Promise<User | null>;
}

// class pessoa implements UserDAO {
//   public createUser(user: User): User {
//     return user;
//   };
//   public findUserByEmail(email: string): User | null {
//     const user = new User();
//     return user;
//   };
// }
