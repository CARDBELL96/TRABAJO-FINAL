import { jest, describe, test, expect, beforeEach } from "@jest/globals";
import CreateTaskUseCase from "../src/application/usecases/CreateTaskUseCase.js";
import UpdateTaskUseCase from "../src/application/usecases/UpdateTaskUseCase.js";
import DeleteTaskUseCase from "../src/application/usecases/DeleteTaskUseCase.js";
import GetTasksUseCase from "../src/application/usecases/GetTasksUseCase.js";
import Task from "../src/domain/entities/Task.js";

describe("CreateTaskUseCase", () => {
  let mockTaskRepository;
  let createTaskUseCase;

  beforeEach(() => {
    mockTaskRepository = {
      create: jest.fn(),
    };
    createTaskUseCase = new CreateTaskUseCase(mockTaskRepository);
    jest.clearAllMocks();
  });

  test("debe crear una tarea con los datos proporcionados", async () => {
    const taskData = {
      titulo: "Task Title",
      descripcion: "Task description",
      estado: "En progreso",
      prioridad: "Alta",
      fecha_limite: "2024-12-31",
      proyecto_id: 1,
      usuario_id: 1,
    };

    const createdTask = {
      id: 1,
      titulo: "Task Title",
      descripcion: "Task description",
      estado: "En progreso",
      prioridad: "Alta",
      fecha_limite: "2024-12-31",
      proyecto_id: 1,
      usuario_id: 1,
      fecha_creacion: new Date().toISOString(),
    };

    mockTaskRepository.create.mockResolvedValue(createdTask);

    const result = await createTaskUseCase.execute(taskData);

    expect(result).toEqual(createdTask);
    expect(mockTaskRepository.create).toHaveBeenCalled();
  });

  test("debe establecer estado por defecto como 'Pendiente'", async () => {
    const taskData = {
      titulo: "New Task",
      descripcion: "Description",
      fecha_limite: "2024-12-31",
      proyecto_id: 1,
      usuario_id: 1,
    };

    const createdTask = {
      id: 1,
      titulo: "New Task",
      descripcion: "Description",
      estado: "Pendiente",
      prioridad: "Media",
      fecha_limite: "2024-12-31",
      proyecto_id: 1,
      usuario_id: 1,
      fecha_creacion: new Date().toISOString(),
    };

    mockTaskRepository.create.mockResolvedValue(createdTask);

    const result = await createTaskUseCase.execute(taskData);

    expect(result.estado).toBe("Pendiente");
  });

  test("debe establecer prioridad por defecto como 'Media'", async () => {
    const taskData = {
      titulo: "Task Without Priority",
      descripcion: "Description",
      fecha_limite: "2024-12-31",
      proyecto_id: 1,
      usuario_id: 1,
    };

    const createdTask = {
      id: 2,
      titulo: "Task Without Priority",
      descripcion: "Description",
      estado: "Pendiente",
      prioridad: "Media",
      fecha_limite: "2024-12-31",
      proyecto_id: 1,
      usuario_id: 1,
      fecha_creacion: new Date().toISOString(),
    };

    mockTaskRepository.create.mockResolvedValue(createdTask);

    const result = await createTaskUseCase.execute(taskData);

    expect(result.prioridad).toBe("Media");
  });

  test("debe permitir establecer estado personalizado", async () => {
    const taskData = {
      titulo: "Completed Task",
      descripcion: "Already done",
      estado: "Completado",
      prioridad: "Baja",
      fecha_limite: "2024-06-30",
      proyecto_id: 1,
      usuario_id: 1,
    };

    const createdTask = {
      id: 3,
      ...taskData,
      fecha_creacion: new Date().toISOString(),
    };

    mockTaskRepository.create.mockResolvedValue(createdTask);

    const result = await createTaskUseCase.execute(taskData);

    expect(result.estado).toBe("Completado");
    expect(result.prioridad).toBe("Baja");
  });

  test("debe llamar al repositorio con una instancia de Task", async () => {
    const taskData = {
      titulo: "Test Task",
      descripcion: "Test",
      estado: "Pendiente",
      prioridad: "Media",
      fecha_limite: "2024-12-31",
      proyecto_id: 1,
      usuario_id: 1,
    };

    mockTaskRepository.create.mockResolvedValue({
      id: 4,
      ...taskData,
      fecha_creacion: new Date().toISOString(),
    });

    await createTaskUseCase.execute(taskData);

    const callArg = mockTaskRepository.create.mock.calls[0][0];
    expect(callArg).toBeInstanceOf(Task);
    expect(callArg.titulo).toBe("Test Task");
  });
});

describe("UpdateTaskUseCase", () => {
  let mockTaskRepository;
  let updateTaskUseCase;

  beforeEach(() => {
    mockTaskRepository = {
      update: jest.fn(),
    };
    updateTaskUseCase = new UpdateTaskUseCase(mockTaskRepository);
    jest.clearAllMocks();
  });

  test("debe actualizar una tarea existente", async () => {
    const taskId = 1;
    const usuarioId = 1;
    const updateData = {
      titulo: "Updated Task",
      estado: "Completado",
    };

    const updatedTask = {
      id: 1,
      titulo: "Updated Task",
      descripcion: "Original description",
      estado: "Completado",
      prioridad: "Media",
      fecha_limite: "2024-12-31",
      proyecto_id: 1,
      usuario_id: 1,
      fecha_creacion: new Date().toISOString(),
    };

    mockTaskRepository.update.mockResolvedValue(updatedTask);

    const result = await updateTaskUseCase.execute(taskId, usuarioId, updateData);

    expect(result).toEqual(updatedTask);
    expect(mockTaskRepository.update).toHaveBeenCalledWith(
      taskId,
      usuarioId,
      updateData
    );
  });

  test("debe lanzar error si la tarea no existe", async () => {
    mockTaskRepository.update.mockResolvedValue(null);

    await expect(
      updateTaskUseCase.execute(999, 1, { titulo: "Updated" })
    ).rejects.toThrow("Tarea no encontrada o no tienes permiso para actualizarla.");
  });

  test("debe lanzar error si el usuario no tiene permiso", async () => {
    mockTaskRepository.update.mockResolvedValue(null);

    await expect(
      updateTaskUseCase.execute(1, 999, { titulo: "Updated" })
    ).rejects.toThrow("Tarea no encontrada o no tienes permiso para actualizarla.");
  });

  test("debe pasar el usuario_id para validar permisos", async () => {
    const taskId = 5;
    const usuarioId = 2;
    const updateData = { estado: "En progreso" };

    const updatedTask = {
      id: 5,
      titulo: "Task",
      estado: "En progreso",
      usuario_id: 2,
    };

    mockTaskRepository.update.mockResolvedValue(updatedTask);

    await updateTaskUseCase.execute(taskId, usuarioId, updateData);

    expect(mockTaskRepository.update).toHaveBeenCalledWith(
      taskId,
      usuarioId,
      updateData
    );
  });

  test("debe permitir actualizar solo ciertos campos", async () => {
    const taskId = 1;
    const usuarioId = 1;
    const updateData = { prioridad: "Baja" };

    const updatedTask = {
      id: 1,
      titulo: "Original Title",
      descripcion: "Original Description",
      estado: "Pendiente",
      prioridad: "Baja",
      fecha_limite: "2024-12-31",
      proyecto_id: 1,
      usuario_id: 1,
    };

    mockTaskRepository.update.mockResolvedValue(updatedTask);

    const result = await updateTaskUseCase.execute(taskId, usuarioId, updateData);

    expect(result.prioridad).toBe("Baja");
    expect(result.titulo).toBe("Original Title");
  });
});

describe("DeleteTaskUseCase", () => {
  let mockTaskRepository;
  let deleteTaskUseCase;

  beforeEach(() => {
    mockTaskRepository = {
      delete: jest.fn(),
    };
    deleteTaskUseCase = new DeleteTaskUseCase(mockTaskRepository);
    jest.clearAllMocks();
  });

  test("debe eliminar una tarea existente", async () => {
    const taskId = 1;
    const usuarioId = 1;

    const deletedTask = {
      id: 1,
      titulo: "Deleted Task",
      descripcion: "This task was deleted",
      estado: "Pendiente",
      usuario_id: 1,
    };

    mockTaskRepository.delete.mockResolvedValue(deletedTask);

    const result = await deleteTaskUseCase.execute(taskId, usuarioId);

    expect(result).toEqual(deletedTask);
    expect(mockTaskRepository.delete).toHaveBeenCalledWith(taskId, usuarioId);
  });

  test("debe lanzar error si la tarea no existe", async () => {
    mockTaskRepository.delete.mockResolvedValue(null);

    await expect(deleteTaskUseCase.execute(999, 1)).rejects.toThrow(
      "Tarea no encontrada o no tienes permiso para eliminarla."
    );
  });

  test("debe lanzar error si el usuario no tiene permiso", async () => {
    mockTaskRepository.delete.mockResolvedValue(null);

    await expect(deleteTaskUseCase.execute(1, 999)).rejects.toThrow(
      "Tarea no encontrada o no tienes permiso para eliminarla."
    );
  });

  test("debe pasar el usuario_id para validar permisos", async () => {
    const taskId = 10;
    const usuarioId = 3;

    mockTaskRepository.delete.mockResolvedValue({
      id: 10,
      titulo: "Task",
      usuario_id: 3,
    });

    await deleteTaskUseCase.execute(taskId, usuarioId);

    expect(mockTaskRepository.delete).toHaveBeenCalledWith(taskId, usuarioId);
  });
});

describe("GetTasksUseCase", () => {
  let mockTaskRepository;
  let getTasksUseCase;

  beforeEach(() => {
    mockTaskRepository = {
      findAllByUser: jest.fn(),
    };
    getTasksUseCase = new GetTasksUseCase(mockTaskRepository);
    jest.clearAllMocks();
  });

  test("debe retornar todas las tareas del usuario", async () => {
    const usuarioId = 1;

    const tasks = [
      {
        id: 1,
        titulo: "Task 1",
        descripcion: "First task",
        estado: "Pendiente",
        usuario_id: 1,
      },
      {
        id: 2,
        titulo: "Task 2",
        descripcion: "Second task",
        estado: "En progreso",
        usuario_id: 1,
      },
    ];

    mockTaskRepository.findAllByUser.mockResolvedValue(tasks);

    const result = await getTasksUseCase.execute(usuarioId);

    expect(result).toEqual(tasks);
    expect(mockTaskRepository.findAllByUser).toHaveBeenCalledWith(usuarioId);
  });

  test("debe retornar array vacío si el usuario no tiene tareas", async () => {
    const usuarioId = 99;

    mockTaskRepository.findAllByUser.mockResolvedValue([]);

    const result = await getTasksUseCase.execute(usuarioId);

    expect(result).toEqual([]);
  });

  test("debe filtrar por usuario_id", async () => {
    const usuarioId = 2;

    const userTasks = [
      {
        id: 50,
        titulo: "User 2 Task",
        estado: "Pendiente",
        usuario_id: 2,
      },
    ];

    mockTaskRepository.findAllByUser.mockResolvedValue(userTasks);

    const result = await getTasksUseCase.execute(usuarioId);

    expect(result[0].usuario_id).toBe(2);
    expect(mockTaskRepository.findAllByUser).toHaveBeenCalledWith(usuarioId);
  });

  test("debe retornar múltiples tareas del mismo usuario", async () => {
    const usuarioId = 1;

    const tasks = Array.from({ length: 10 }, (_, i) => ({
      id: i + 1,
      titulo: `Task ${i + 1}`,
      estado: i % 2 === 0 ? "Pendiente" : "En progreso",
      usuario_id: 1,
    }));

    mockTaskRepository.findAllByUser.mockResolvedValue(tasks);

    const result = await getTasksUseCase.execute(usuarioId);

    expect(result).toHaveLength(10);
    expect(result.every((t) => t.usuario_id === 1)).toBe(true);
  });

  test("debe retornar tareas con diferentes estados", async () => {
    const usuarioId = 1;

    const tasks = [
      { id: 1, titulo: "Pending", estado: "Pendiente", usuario_id: 1 },
      { id: 2, titulo: "In Progress", estado: "En progreso", usuario_id: 1 },
      { id: 3, titulo: "Completed", estado: "Completado", usuario_id: 1 },
    ];

    mockTaskRepository.findAllByUser.mockResolvedValue(tasks);

    const result = await getTasksUseCase.execute(usuarioId);

    const states = result.map((t) => t.estado);
    expect(states).toContain("Pendiente");
    expect(states).toContain("En progreso");
    expect(states).toContain("Completado");
  });
});
