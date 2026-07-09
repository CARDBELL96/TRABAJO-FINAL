import ProjectRepository from "../../infrastructure/repositories/ProjectRepository.js";
import CreateProjectUseCase from "../../application/usecases/CreateProjectUseCase.js";
import GetProjectsUseCase from "../../application/usecases/GetProjectsUseCase.js";
import UpdateProjectUseCase from "../../application/usecases/UpdateProjectUseCase.js";
import DeleteProjectUseCase from "../../application/usecases/DeleteProjectUseCase.js";

const projectRepository = new ProjectRepository();
const createProjectUseCase = new CreateProjectUseCase(projectRepository);
const getProjectsUseCase = new GetProjectsUseCase(projectRepository);
const updateProjectUseCase = new UpdateProjectUseCase(projectRepository);
const deleteProjectUseCase = new DeleteProjectUseCase(projectRepository);

export async function createProject(req, res) {
  try {
    const data = {
      ...(req.body || {}),
      usuario_id: req.user.id,
    };

    const project = await createProjectUseCase.execute(data);

    return res.status(201).json({
      message: "Proyecto creado correctamente.",
      proyecto: project,
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
}
export async function getProjects(req, res) {
  try {
    const projects = await getProjectsUseCase.execute(req.user.id);

    return res.status(200).json({
      projects,
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
}

export async function updateProject(req, res) {
  try {
    const project = await updateProjectUseCase.execute(
      Number(req.params.id),
      req.user.id,
      req.body
    );

    return res.status(200).json({
      message: "Proyecto actualizado correctamente.",
      project,
    });
  } catch (error) {
    const status = error.message === "Proyecto no encontrado." ? 404 : 400;

    return res.status(status).json({
      message: error.message,
    });
  }
}

export async function deleteProject(req, res) {
  try {
    await deleteProjectUseCase.execute(
      Number(req.params.id),
      req.user.id
    );

    return res.status(200).json({
      message: "Proyecto eliminado correctamente.",
    });
  } catch (error) {
    const status = error.message === "Proyecto no encontrado." ? 404 : 400;

    return res.status(status).json({
      message: error.message,
    });
  }
}