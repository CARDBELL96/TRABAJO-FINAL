class UpdateProjectUseCase {
  constructor(projectRepository) {
    this.projectRepository = projectRepository;
  }

  async execute(id, usuarioId, projectData) {
    return await this.projectRepository.update(id, usuarioId, projectData);
  }
}

export default UpdateProjectUseCase;