import { Router } from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";

import {
  createProject,
  getProjects,
  updateProject,
  deleteProject,
} from "../controllers/ProjectController.js";

const projectRouter = Router();

projectRouter.post("/", authMiddleware, createProject);
projectRouter.get("/", authMiddleware, getProjects);
projectRouter.put("/:id", authMiddleware, updateProject);
projectRouter.delete("/:id", authMiddleware, deleteProject);

export { projectRouter };