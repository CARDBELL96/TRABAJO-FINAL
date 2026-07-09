import Task from "../../domain/entities/Task.js";

class CreateTaskUseCase {
  constructor(taskRepository) {
    this.taskRepository = taskRepository;
  }

  async execute(data) {
    const task = new Task({
      titulo: data.titulo,
      descripcion: data.descripcion,
      estado: data.estado || "Pendiente",
      prioridad: data.prioridad || "Media",
      fecha_limite: data.fecha_limite,
      proyecto_id: data.proyecto_id,
      usuario_id: data.usuario_id,
    });

    return await this.taskRepository.create(task);
  }
}

export default CreateTaskUseCase;