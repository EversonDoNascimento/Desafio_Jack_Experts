import { ExtractJwt, Strategy as JWTStrategy } from "passport-jwt";

// Definindo configurações para o JWT
const options = {
  // jwtFromRequest define onde o Strategy deve procurar o JWT
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  // secretOrKey define a chave do JWT que está no servidor
  secretOrKey: process.env.JWT_KEY as string,
};

export const privateRequest = new JWTStrategy(
  options,
  async (payload, done) => {}
);

// (req, res, next) => {
//     if (!req.headers.authorization) {
//       return res.status(401).json({ error: "Precisa de acesso!" });
//     }
//     const authorizationToken = req.headers.authorization.split(" ");
//     if (authorizationToken[0] !== "Bearer") {
//       return res.status(401).json({ error: "Precisa de acesso!" });
//     }
//     let logged = true;
//     console.log(req.headers);
//     if (logged) {
//       next();
//       return null;
//     }
//     res.status(401).json({ error: "Precisa de acesso!" });
//   };
