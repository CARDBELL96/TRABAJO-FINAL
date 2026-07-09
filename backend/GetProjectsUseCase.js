class GetProjectsUseCase {
  constructor(projectRepository) {
    this.projectRepository = projectRepository;
  }

  async execute(usuarioId) {
    return await this.projectRepository.findAllByUser(usuarioId);
  }
}

export default GetProjectsUseCase;