"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const TaskController_1 = __importDefault(require("../Controllers/TaskController"));
const AuthController_1 = __importDefault(require("../Controllers/AuthController"));
const UserController_1 = __importDefault(require("../Controllers/UserController"));
const privateRoute_1 = __importDefault(require("../middlewares/privateRoute"));
const router = express_1.default.Router();
// Task Routes
// Rota para buscar tasks do usuário através id do usuário
router.get("/tasks/:id_user", privateRoute_1.default, TaskController_1.default.listTasksByUserId);
// Rota para buscar task através do id da task
router.get("/task/findTask/:id_task", privateRoute_1.default, TaskController_1.default.getTaskById);
// Rota para cadastrar task
router.post("/task/register", privateRoute_1.default, TaskController_1.default.registerTask);
// Rota para atualizar status da task como concluída ou não
router.patch("/task/completed/:id_task", privateRoute_1.default, TaskController_1.default.toggleTaskStatus);
// Rota para deletar a task
router.delete("/task/delete/:id_task", privateRoute_1.default, TaskController_1.default.deleteTask);
// Rota para editar uma task
router.patch("/task/edit", privateRoute_1.default, TaskController_1.default.editTask);
// User Routes
router.post("/login", AuthController_1.default.login);
// O registerUser irá tentar cadastrar o usuário com as informações fornecidas
// Caso o cadatro do usuário for realizado com sucesso, o login será feito logo em seguida
router.post("/user/register", UserController_1.default.registerUser, AuthController_1.default.login);
exports.default = router;
