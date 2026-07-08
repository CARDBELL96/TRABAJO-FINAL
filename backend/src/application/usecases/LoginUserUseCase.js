import { comparePassword } from "../../infrastructure/security/hash.js";
import { generateToken } from "../../infrastructure/security/jwt.js";

class LoginUserUseCase {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  async execute({ email, password }) {
    if (!email || !password) {
      throw new Error("Email y contraseña son obligatorios.");
    }

    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new Error("Credenciales inválidas.");
    }

    const validPassword = await comparePassword(password, user.password);

    if (!validPassword) {
      throw new Error("Credenciales inválidas.");
    }

    const token = generateToken(user);

    return {
      token,
      usuario: {
        id: user.id,
        nombre: user.nombre,
        email: user.email,
        rol: user.rol,
      },
    };
  }
}

export default LoginUserUseCase;

