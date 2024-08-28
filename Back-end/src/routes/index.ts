import express from "express";
import TaskController from "../Controllers/TaskController";
import AuthController from "../Controllers/AuthController";
import UserController from "../Controllers/UserController";
const router = express.Router();

router.get("/", TaskController.getTasks);

// User Routes
router.post("/login", AuthController.login);
router.post("/user/register", UserController.registerUser);
export default router;
