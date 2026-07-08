import { Router } from "express";
import { register, login } from "../controllers/AuthController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const authRouter = Router();

authRouter.post("/register", register);
authRouter.post("/login", login);

authRouter.get(
    "/profile",
    authMiddleware,
    (req,res)=>{
  res.json({
    message: "Ruta protegida funcionando.",
    usuario: req.user,
  });
});

export { authRouter };