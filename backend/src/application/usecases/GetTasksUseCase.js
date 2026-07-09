class GetTasksUseCase {
  constructor(taskRepository) {
    this.taskRepository = taskRepository;
  }

  async execute(usuario_id) {
    return await this.taskRepository.findAllByUser(usuario_id);
  }
}

export default GetTasksUseCase;