class GetProjectsUseCase {
  constructor(projectRepository) {
    this.projectRepository = projectRepository;
  }

  async execute(usuario_id) {
    return await this.projectRepository.findAllByUser(usuario_id);
  }
}

export default GetProjectsUseCase;