import express from "express";
import TaskController from "../Controllers/TaskController";
import AuthController from "../Controllers/AuthController";
const router = express.Router();

router.get("/", TaskController.getTasks);
router.post("/login", AuthController.login);
export default router;
