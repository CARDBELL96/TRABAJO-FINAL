import { jest, describe, test, expect, beforeEach } from "@jest/globals";
import CreateProjectUseCase from "../src/application/usecases/CreateProjectUseCase.js";
import UpdateProjectUseCase from "../src/application/usecases/UpdateProjectUseCase.js";
import DeleteProjectUseCase from "../src/application/usecases/DeleteProjectUseCase.js";
import GetProjectsUseCase from "../src/application/usecases/GetProjectsUseCase.js";
import Project from "../src/domain/entities/Project.js";

describe("CreateProjectUseCase", () => {
  let mockProjectRepository;
  let createProjectUseCase;

  beforeEach(() => {
    mockProjectRepository = {
      create: jest.fn(),
    };
    createProjectUseCase = new CreateProjectUseCase(mockProjectRepository);
    jest.clearAllMocks();
  });

  test("debe crear un proyecto con los datos proporcionados", async () => {
    const projectData = {
      nombre: "Project Alpha",
      descripcion: "A new project",
      fecha_inicio: "2024-01-01",
      fecha_fin: "2024-12-31",
      usuario_id: 1,
    };

    const createdProject = {
      id: 1,
      nombre: "Project Alpha",
      descripcion: "A new project",
      fecha_inicio: "2024-01-01",
      fecha_fin: "2024-12-31",
      estado: "Activo",
      usuario_id: 1,
      fecha_creacion: new Date().toISOString(),
    };

    mockProjectRepository.create.mockResolvedValue(createdProject);

    const result = await createProjectUseCase.execute(projectData);

    expect(result).toEqual(createdProject);
    expect(mockProjectRepository.create).toHaveBeenCalled();
  });

  test("debe establecer el estado como 'Activo' al crear un proyecto", async () => {
    const projectData = {
      nombre: "Project Beta",
      descripcion: "Another project",
      fecha_inicio: "2024-06-01",
      fecha_fin: "2024-08-31",
      usuario_id: 2,
    };

    const createdProject = {
      id: 2,
      nombre: "Project Beta",
      descripcion: "Another project",
      fecha_inicio: "2024-06-01",
      fecha_fin: "2024-08-31",
      estado: "Activo",
      usuario_id: 2,
      fecha_creacion: new Date().toISOString(),
    };

    mockProjectRepository.create.mockResolvedValue(createdProject);

    const result = await createProjectUseCase.execute(projectData);

    expect(result.estado).toBe("Activo");
  });

  test("debe llamar al repositorio con una instancia de Project", async () => {
    const projectData = {
      nombre: "Project Gamma",
      descripcion: "Test project",
      fecha_inicio: "2024-03-01",
      fecha_fin: "2024-09-30",
      usuario_id: 3,
    };

    mockProjectRepository.create.mockResolvedValue({
      id: 3,
      ...projectData,
      estado: "Activo",
    });

    await createProjectUseCase.execute(projectData);

    expect(mockProjectRepository.create).toHaveBeenCalled();
    const callArg = mockProjectRepository.create.mock.calls[0][0];
    expect(callArg).toBeInstanceOf(Project);
    expect(callArg.nombre).toBe("Project Gamma");
    expect(callArg.estado).toBe("Activo");
  });
});

describe("UpdateProjectUseCase", () => {
  let mockProjectRepository;
  let updateProjectUseCase;

  beforeEach(() => {
    mockProjectRepository = {
      update: jest.fn(),
    };
    updateProjectUseCase = new UpdateProjectUseCase(mockProjectRepository);
    jest.clearAllMocks();
  });

  test("debe actualizar un proyecto existente", async () => {
    const projectId = 1;
    const usuarioId = 1;
    const updateData = {
      nombre: "Updated Project",
      descripcion: "Updated description",
    };

    const updatedProject = {
      id: 1,
      nombre: "Updated Project",
      descripcion: "Updated description",
      fecha_inicio: "2024-01-01",
      fecha_fin: "2024-12-31",
      estado: "Activo",
      usuario_id: 1,
      fecha_creacion: new Date().toISOString(),
    };

    mockProjectRepository.update.mockResolvedValue(updatedProject);

    const result = await updateProjectUseCase.execute(
      projectId,
      usuarioId,
      updateData
    );

    expect(result).toEqual(updatedProject);
    expect(mockProjectRepository.update).toHaveBeenCalledWith(
      projectId,
      usuarioId,
      updateData
    );
  });

  test("debe lanzar error si el proyecto no existe", async () => {
    mockProjectRepository.update.mockResolvedValue(null);

    await expect(
      updateProjectUseCase.execute(999, 1, { nombre: "Updated" })
    ).rejects.toThrow("Proyecto no encontrado.");
  });

  test("debe pasar el usuario_id para validar permisos", async () => {
    const projectId = 1;
    const usuarioId = 5;
    const updateData = { estado: "Inactivo" };

    const updatedProject = {
      id: 1,
      nombre: "Project",
      descripcion: "Description",
      estado: "Inactivo",
      usuario_id: 5,
    };

    mockProjectRepository.update.mockResolvedValue(updatedProject);

    await updateProjectUseCase.execute(projectId, usuarioId, updateData);

    expect(mockProjectRepository.update).toHaveBeenCalledWith(
      projectId,
      usuarioId,
      updateData
    );
  });
});

describe("DeleteProjectUseCase", () => {
  let mockProjectRepository;
  let deleteProjectUseCase;

  beforeEach(() => {
    mockProjectRepository = {
      delete: jest.fn(),
    };
    deleteProjectUseCase = new DeleteProjectUseCase(mockProjectRepository);
    jest.clearAllMocks();
  });

  test("debe eliminar un proyecto existente", async () => {
    const projectId = 1;
    const usuarioId = 1;

    const deletedProject = {
      id: 1,
      nombre: "Deleted Project",
      descripcion: "This project was deleted",
      estado: "Activo",
      usuario_id: 1,
    };

    mockProjectRepository.delete.mockResolvedValue(deletedProject);

    const result = await deleteProjectUseCase.execute(projectId, usuarioId);

    expect(result).toEqual(deletedProject);
    expect(mockProjectRepository.delete).toHaveBeenCalledWith(
      projectId,
      usuarioId
    );
  });

  test("debe lanzar error si el proyecto no existe", async () => {
    mockProjectRepository.delete.mockResolvedValue(null);

    await expect(deleteProjectUseCase.execute(999, 1)).rejects.toThrow(
      "Proyecto no encontrado."
    );
  });

  test("debe pasar el usuario_id para validar permisos", async () => {
    const projectId = 5;
    const usuarioId = 3;

    mockProjectRepository.delete.mockResolvedValue({
      id: 5,
      nombre: "Project",
    });

    await deleteProjectUseCase.execute(projectId, usuarioId);

    expect(mockProjectRepository.delete).toHaveBeenCalledWith(
      projectId,
      usuarioId
    );
  });
});

describe("GetProjectsUseCase", () => {
  let mockProjectRepository;
  let getProjectsUseCase;

  beforeEach(() => {
    mockProjectRepository = {
      findAllByUser: jest.fn(),
    };
    getProjectsUseCase = new GetProjectsUseCase(mockProjectRepository);
    jest.clearAllMocks();
  });

  test("debe retornar todos los proyectos del usuario", async () => {
    const usuarioId = 1;

    const projects = [
      {
        id: 1,
        nombre: "Project 1",
        descripcion: "First project",
        estado: "Activo",
        usuario_id: 1,
      },
      {
        id: 2,
        nombre: "Project 2",
        descripcion: "Second project",
        estado: "Activo",
        usuario_id: 1,
      },
    ];

    mockProjectRepository.findAllByUser.mockResolvedValue(projects);

    const result = await getProjectsUseCase.execute(usuarioId);

    expect(result).toEqual(projects);
    expect(mockProjectRepository.findAllByUser).toHaveBeenCalledWith(
      usuarioId
    );
  });

  test("debe retornar array vacío si el usuario no tiene proyectos", async () => {
    const usuarioId = 99;

    mockProjectRepository.findAllByUser.mockResolvedValue([]);

    const result = await getProjectsUseCase.execute(usuarioId);

    expect(result).toEqual([]);
  });

  test("debe filtrar por usuario_id", async () => {
    const usuarioId = 2;

    const userProjects = [
      {
        id: 10,
        nombre: "User 2 Project",
        estado: "Activo",
        usuario_id: 2,
      },
    ];

    mockProjectRepository.findAllByUser.mockResolvedValue(userProjects);

    const result = await getProjectsUseCase.execute(usuarioId);

    expect(result[0].usuario_id).toBe(2);
    expect(mockProjectRepository.findAllByUser).toHaveBeenCalledWith(
      usuarioId
    );
  });

  test("debe retornar múltiples proyectos del mismo usuario", async () => {
    const usuarioId = 1;

    const projects = Array.from({ length: 5 }, (_, i) => ({
      id: i + 1,
      nombre: `Project ${i + 1}`,
      estado: "Activo",
      usuario_id: 1,
    }));

    mockProjectRepository.findAllByUser.mockResolvedValue(projects);

    const result = await getProjectsUseCase.execute(usuarioId);

    expect(result).toHaveLength(5);
    expect(result.every((p) => p.usuario_id === 1)).toBe(true);
  });
});
