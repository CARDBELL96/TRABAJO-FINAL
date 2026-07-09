import express from "express";
import cors from "cors";

import { healthRouter } from "./presentation/routes/health.routes.js";
import { authRouter } from "./presentation/routes/AuthRoutes.js";
import { taskRouter } from "./presentation/routes/TaskRoutes.js";
import { projectRouter } from "./presentation/routes/ProjectRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("TaskFlow API is running!");
});

app.use("/api", healthRouter);
app.use("/api/auth", authRouter);
app.use("/api/projects", projectRouter);
app.use("/api/tasks", taskRouter);

export default app;