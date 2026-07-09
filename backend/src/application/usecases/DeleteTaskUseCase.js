class DeleteTaskUseCase {
  constructor(taskRepository) {
    this.taskRepository = taskRepository;
  }

  async execute(id, usuario_id) {
    const deletedTask = await this.taskRepository.delete(id, usuario_id);

    if (!deletedTask) {
      throw new Error("Tarea no encontrada o no tienes permiso para eliminarla.");
    }

    return deletedTask;
  }
}

export default DeleteTaskUseCase;