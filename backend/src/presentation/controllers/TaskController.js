import TaskRepository from "../../infrastructure/repositories/TaskRepository.js";
import CreateTaskUseCase from "../../application/usecases/CreateTaskUseCase.js";
import GetTasksUseCase from "../../application/usecases/GetTasksUseCase.js";
import UpdateTaskUseCase from "../../application/usecases/UpdateTaskUseCase.js";
import DeleteTaskUseCase from "../../application/usecases/DeleteTaskUseCase.js";

const taskRepository = new TaskRepository();
const createTaskUseCase = new CreateTaskUseCase(taskRepository);
const getTasksUseCase = new GetTasksUseCase(taskRepository);
const updateTaskUseCase = new UpdateTaskUseCase(taskRepository);
const deleteTaskUseCase = new DeleteTaskUseCase(taskRepository);

export async function createTask(req, res) {
  try {
    const data = {
      ...req.body,
      usuario_id: req.user.id,
    };
    const task = await createTaskUseCase.execute(data);
    return res.status(201).json({
      message: "Tarea creada correctamente.",
      task,
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
}

export async function getTasks(req, res) {
  try {
    const tasks = await getTasksUseCase.execute(req.user.id);
    return res.status(200).json({
      tasks,
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
}

export async function updateTask(req, res) {
  try {
    const task = await updateTaskUseCase.execute(
      Number(req.params.id),
      req.user.id,
      req.body
    );
    return res.status(200).json({
      message: "Tarea actualizada correctamente.",
      task,
    });
  } catch (error) {
    const status = error.message.startsWith("Tarea no encontrada") ? 404 : 400;
    return res.status(status).json({
      message: error.message,
    });
  }
}

export async function deleteTask(req, res) {
  try {
    await deleteTaskUseCase.execute(
      Number(req.params.id),
      req.user.id
    );
    return res.status(200).json({
      message: "Tarea eliminada correctamente.",
    });
  } catch (error) {
    const status = error.message.startsWith("Tarea no encontrada") ? 404 : 400;
    return res.status(status).json({
      message: error.message,
    });
  }
}