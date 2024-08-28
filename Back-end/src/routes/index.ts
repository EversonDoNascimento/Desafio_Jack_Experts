import express from "express";
import TaskController from "../Controllers/TaskController";
import AuthController from "../Controllers/AuthController";
import UserController from "../Controllers/UserController";
import privateRoute from "../middlewares/privateRoute";
const router = express.Router();

// Task Routes

// Rota para buscar tasks do usuário através id do usuário
router.get("/tasks/:id_user", TaskController.listTasksByUserId);
// Rota para buscar task através do id da task
router.get("/task/findTask/:id_task", TaskController.getTaskById);
// Rota para cadastrar task
router.post("/task/register", TaskController.registerTask);

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
