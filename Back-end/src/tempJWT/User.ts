import JWT from "jsonwebtoken";

type User = {
  id: number;
  email: string;
  pass: string;
};

export const createJWT = (user: User) => {
  // Aqui podemos definir as informações que irão retornar dentro do JWT
  const payload = {
    id: user.id,
  };
  // Criando o JWT para o usuário
  return JWT.sign(payload, process.env.JWT_KEY as string, {
    expiresIn: "1 minute",
  });
};

export const findUserByEmailAndPass = (user: User) => {
  // Simulando banco de dados
  if (!user) return null;
  if (user.email === "everson@gmail.com" && user.pass === "1234") {
    return user;
  }
};
