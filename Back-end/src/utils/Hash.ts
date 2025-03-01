// Importando o módulo bcrypt
import bcrypt from "bcrypt";

// A Class hash utiliza a biblioteca bcrypt que é responsável por criptografar a senha e verificar se está correta
class Hash {
  public static createdPass = async (password: string) => {
    return await bcrypt.hash(password, 10);
  };
  public static verifyPass = async (
    password: string,
    hashedPassword: string
  ) => {
    return await bcrypt.compare(password, hashedPassword);
  };
}

export default Hash;
