import { Router } from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";

import {
  createTask,
  getTasks,
  updateTask,
  deleteTask,
} from "../controllers/TaskController.js";

const taskRouter = Router();

taskRouter.post("/", authMiddleware, createTask);
taskRouter.get("/", authMiddleware, getTasks);
taskRouter.put("/:id", authMiddleware, updateTask);
taskRouter.delete("/:id", authMiddleware, deleteTask);

export { taskRouter };