import User from "../../domain/entities/User.js";
import { hashPassword } from "../../infrastructure/security/hash.js";

class RegisterUserUseCase {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  async execute({ nombre, email, password, rol = "usuario" }) {
    if (!nombre || !email || !password) {
      throw new Error("Nombre, email y contraseña son obligatorios.");
    }

    const existingUser = await this.userRepository.findByEmail(email);

    if (existingUser) {
      throw new Error("El email ya está registrado.");
    }

    const hashedPassword = await hashPassword(password);

    const user = new User({
      nombre,
      email,
      password: hashedPassword,
      rol,
    });

    const createdUser = await this.userRepository.create(user);

    return {
      id: createdUser.id,
      nombre: createdUser.nombre,
      email: createdUser.email,
      rol: createdUser.rol,
      fechaCreacion: createdUser.fechaCreacion,
    };
  }
}

export default RegisterUserUseCase;