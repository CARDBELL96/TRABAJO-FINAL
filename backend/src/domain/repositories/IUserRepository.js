/**
 * Contrato del repositorio de usuarios.
 * Define las operaciones que cualquier implementación
 * debe ofrecer para acceder a los datos de usuarios.
 */
class IUserRepository {
  async findByEmail(email) {
    throw new Error("Method not implemented.");
  }

  async create(user) {
    throw new Error("Method not implemented.");
  }
}

export default IUserRepository;
