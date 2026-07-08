import express from "express";
import cors from "cors";

import { healthRouter } from "./presentation/routes/health.routes.js";
import { authRouter } from "./presentation/routes/AuthRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("TaskFlow API is running!");
});

app.use("/api", healthRouter);
app.use("/api/auth", authRouter);

export default app;