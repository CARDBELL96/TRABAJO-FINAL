class DeleteProjectUseCase {
  constructor(projectRepository) {
    this.projectRepository = projectRepository;
  }

  async execute(id, usuario_id) {
    const deletedProject = await this.projectRepository.delete(id, usuario_id);

    if (!deletedProject) {
      throw new Error("Proyecto no encontrado.");
    }

    return deletedProject;
  }
}

export default DeleteProjectUseCase;