import { jest, describe, test, expect, beforeEach } from "@jest/globals";
import LoginUserUseCase from "../src/application/usecases/LoginUserUseCase.js";
import RegisterUserUseCase from "../src/application/usecases/RegisterUserUseCase.js";

describe("LoginUserUseCase", () => {
  let mockUserRepository;
  let loginUserUseCase;

  beforeEach(() => {
    mockUserRepository = {
      findByEmail: jest.fn(),
    };
    loginUserUseCase = new LoginUserUseCase(mockUserRepository);
    jest.clearAllMocks();
  });

  test("debe lanzar error si falta email", async () => {
    await expect(
      loginUserUseCase.execute({ email: "", password: "password123" })
    ).rejects.toThrow("Email y contraseña son obligatorios.");
  });

  test("debe lanzar error si falta contraseña", async () => {
    await expect(
      loginUserUseCase.execute({ email: "user@example.com", password: "" })
    ).rejects.toThrow("Email y contraseña son obligatorios.");
  });

  test("debe lanzar error si el usuario no existe", async () => {
    mockUserRepository.findByEmail.mockResolvedValue(null);

    await expect(
      loginUserUseCase.execute({
        email: "notfound@example.com",
        password: "password123",
      })
    ).rejects.toThrow("Credenciales inválidas.");
  });

  test("debe buscar usuario por email en el repositorio", async () => {
    mockUserRepository.findByEmail.mockResolvedValue(null);

    try {
      await loginUserUseCase.execute({
        email: "test@example.com",
        password: "password123",
      });
    } catch (e) {
      // Esperamos que lance error
    }

    expect(mockUserRepository.findByEmail).toHaveBeenCalledWith(
      "test@example.com"
    );
  });

  test("debe validar las credenciales del usuario", async () => {
    const user = {
      id: 1,
      nombre: "John Doe",
      email: "john@example.com",
      password: "hashedPassword123",
      rol: "usuario",
    };

    mockUserRepository.findByEmail.mockResolvedValue(user);

    // Intenta con contraseña incorrecta - esperamos error
    await expect(
      loginUserUseCase.execute({
        email: "john@example.com",
        password: "wrongPassword",
      })
    ).rejects.toThrow("Credenciales inválidas.");
  });
});

describe("RegisterUserUseCase", () => {
  let mockUserRepository;
  let registerUserUseCase;

  beforeEach(() => {
    mockUserRepository = {
      findByEmail: jest.fn(),
      create: jest.fn(),
    };
    registerUserUseCase = new RegisterUserUseCase(mockUserRepository);
    jest.clearAllMocks();
  });

  test("debe lanzar error si falta nombre", async () => {
    await expect(
      registerUserUseCase.execute({
        nombre: "",
        email: "user@example.com",
        password: "password123",
      })
    ).rejects.toThrow("Nombre, email y contraseña son obligatorios.");
  });

  test("debe lanzar error si falta email", async () => {
    await expect(
      registerUserUseCase.execute({
        nombre: "John Doe",
        email: "",
        password: "password123",
      })
    ).rejects.toThrow("Nombre, email y contraseña son obligatorios.");
  });

  test("debe lanzar error si falta contraseña", async () => {
    await expect(
      registerUserUseCase.execute({
        nombre: "John Doe",
        email: "user@example.com",
        password: "",
      })
    ).rejects.toThrow("Nombre, email y contraseña son obligatorios.");
  });

  test("debe lanzar error si el email ya está registrado", async () => {
    const existingUser = {
      id: 1,
      nombre: "Jane Doe",
      email: "jane@example.com",
      password: "hashedPassword",
      rol: "usuario",
    };

    mockUserRepository.findByEmail.mockResolvedValue(existingUser);

    await expect(
      registerUserUseCase.execute({
        nombre: "John Doe",
        email: "jane@example.com",
        password: "password123",
      })
    ).rejects.toThrow("El email ya está registrado.");
  });

  test("debe buscar si el email existe antes de crear", async () => {
    mockUserRepository.findByEmail.mockResolvedValue(null);
    mockUserRepository.create.mockResolvedValue({
      id: 1,
      nombre: "John Doe",
      email: "john@example.com",
      password: "hashedPassword",
      rol: "usuario",
      fechaCreacion: new Date().toISOString(),
    });

    await registerUserUseCase.execute({
      nombre: "John Doe",
      email: "john@example.com",
      password: "password123",
    });

    expect(mockUserRepository.findByEmail).toHaveBeenCalledWith(
      "john@example.com"
    );
  });

  test("debe crear un usuario con rol por defecto 'usuario'", async () => {
    mockUserRepository.findByEmail.mockResolvedValue(null);

    const createdUser = {
      id: 1,
      nombre: "John Doe",
      email: "john@example.com",
      password: "hashedPassword123",
      rol: "usuario",
      fechaCreacion: new Date().toISOString(),
    };

    mockUserRepository.create.mockResolvedValue(createdUser);

    const result = await registerUserUseCase.execute({
      nombre: "John Doe",
      email: "john@example.com",
      password: "password123",
    });

    expect(result.rol).toBe("usuario");
    expect(mockUserRepository.create).toHaveBeenCalled();
  });

  test("debe crear un usuario con rol especificado", async () => {
    mockUserRepository.findByEmail.mockResolvedValue(null);

    const createdUser = {
      id: 2,
      nombre: "Admin User",
      email: "admin@example.com",
      password: "hashedPassword123",
      rol: "admin",
      fechaCreacion: new Date().toISOString(),
    };

    mockUserRepository.create.mockResolvedValue(createdUser);

    const result = await registerUserUseCase.execute({
      nombre: "Admin User",
      email: "admin@example.com",
      password: "password123",
      rol: "admin",
    });

    expect(result.rol).toBe("admin");
  });

  test("debe retornar objeto sin incluir contraseña", async () => {
    mockUserRepository.findByEmail.mockResolvedValue(null);

    const createdUser = {
      id: 1,
      nombre: "John Doe",
      email: "john@example.com",
      password: "hashedPassword123",
      rol: "usuario",
      fechaCreacion: new Date().toISOString(),
    };

    mockUserRepository.create.mockResolvedValue(createdUser);

    const result = await registerUserUseCase.execute({
      nombre: "John Doe",
      email: "john@example.com",
      password: "password123",
    });

    expect(result).not.toHaveProperty("password");
  });

  test("debe retornar datos del usuario creado", async () => {
    mockUserRepository.findByEmail.mockResolvedValue(null);

    const createdUser = {
      id: 10,
      nombre: "Test User",
      email: "test@example.com",
      password: "hashedPassword",
      rol: "usuario",
      fechaCreacion: "2024-01-01T10:00:00Z",
    };

    mockUserRepository.create.mockResolvedValue(createdUser);

    const result = await registerUserUseCase.execute({
      nombre: "Test User",
      email: "test@example.com",
      password: "password123",
    });

    expect(result).toEqual({
      id: 10,
      nombre: "Test User",
      email: "test@example.com",
      rol: "usuario",
      fechaCreacion: "2024-01-01T10:00:00Z",
    });
  });

  test("debe crear una instancia de User correctamente", async () => {
    mockUserRepository.findByEmail.mockResolvedValue(null);

    const createdUser = {
      id: 1,
      nombre: "John Doe",
      email: "john@example.com",
      password: "hashedPassword123",
      rol: "usuario",
      fechaCreacion: new Date().toISOString(),
    };

    mockUserRepository.create.mockResolvedValue(createdUser);

    await registerUserUseCase.execute({
      nombre: "John Doe",
      email: "john@example.com",
      password: "password123",
      rol: "usuario",
    });

    expect(mockUserRepository.create).toHaveBeenCalled();
    const callArg = mockUserRepository.create.mock.calls[0][0];
    expect(callArg.nombre).toBe("John Doe");
    expect(callArg.email).toBe("john@example.com");
  });
});

