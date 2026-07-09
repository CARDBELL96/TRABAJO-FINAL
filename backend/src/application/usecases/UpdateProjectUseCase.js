class UpdateProjectUseCase {
  constructor(projectRepository) {
    this.projectRepository = projectRepository;
  }

  async execute(id, usuario_id, data) {
    const updatedProject = await this.projectRepository.update(id, usuario_id, data);

    if (!updatedProject) {
      throw new Error("Proyecto no encontrado.");
    }

    return updatedProject;
  }
}

export default UpdateProjectUseCase;