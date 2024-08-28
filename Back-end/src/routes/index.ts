import express from "express";
import TaskController from "../Controllers/TaskController";
import AuthController from "../Controllers/AuthController";
import UserController from "../Controllers/UserController";
import privateRoute from "../middlewares/privateRoute";
const router = express.Router();

router.get("/", privateRoute, TaskController.getTasks);

// User Routes
router.post("/login", AuthController.login);
// O registerUser irá tentar cadastrar o usuário com as informações fornecidas
// Caso o cadatro do usuário for realizado com sucesso, o login será feito logo em seguida
router.post(
  "/user/register",
  UserController.registerUser,
  AuthController.login
);
export default router;
