import { RequestHandler } from "express";

class TaskController {
  public static getTasks: RequestHandler = (req, res) => {
    res.json({ sucess: "Sucesso!" });
  };
}

export default TaskController;
