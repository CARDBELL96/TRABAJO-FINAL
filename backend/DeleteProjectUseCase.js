class DeleteProjectUseCase {
  constructor(projectRepository) {
    this.projectRepository = projectRepository;
  }

  async execute(id, usuarioId) {
    return await this.projectRepository.delete(id, usuarioId);
  }
}

export default DeleteProjectUseCase;