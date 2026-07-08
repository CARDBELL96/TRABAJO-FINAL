import UserRepository from "../../infrastructure/repositories/UserRepository.js";
import RegisterUserUseCase from "../../application/usecases/RegisterUserUseCase.js";
import LoginUserUseCase from "../../application/usecases/LoginUserUseCase.js";

const userRepository = new UserRepository();

const registerUserUseCase = new RegisterUserUseCase(userRepository);
const loginUserUseCase = new LoginUserUseCase(userRepository);

export async function register(req, res) {
  try {
    const user = await registerUserUseCase.execute(req.body);

    return res.status(201).json({
      message: "Usuario registrado correctamente.",
      usuario: user,
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
}

export async function login(req, res) {
  try {
    const result = await loginUserUseCase.execute(req.body);

    return res.status(200).json({
      message: "Login exitoso.",
      token: result.token,
      usuario: result.usuario,
    });
  } catch (error) {
    return res.status(401).json({
      message: error.message,
    });
  }
}