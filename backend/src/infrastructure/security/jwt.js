import jwt from "jsonwebtoken";
import { env } from "../config/env.js";

export function generateToken(user) {
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
      rol: user.rol,
    },
    env.JWT_SECRET,
    {
      expiresIn: "8h",
    }
  );
}


