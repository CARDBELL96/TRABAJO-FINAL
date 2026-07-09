class UpdateTaskUseCase {
  constructor(taskRepository) {
    this.taskRepository = taskRepository;
  }

  async execute(id, usuario_id, data) {
    const updatedTask = await this.taskRepository.update(id, usuario_id, data);

    if (!updatedTask) {
      throw new Error("Tarea no encontrada o no tienes permiso para actualizarla.");
    }

    return updatedTask;
  }
}

export default UpdateTaskUseCase;