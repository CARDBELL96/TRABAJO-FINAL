class IProjectRepository {

    async create(project){
        throw new Error("Method not implemented.");
    }

    async findAllByUser(usuario_id){
        throw new Error("Method not implemented.");
    }

    async update(id, usuario_id, data) {
        throw new Error("Method not implemented.");
    }

    async delete(id, usuario_id) {
        throw new Error("Method not implemented.");
    }

}

export default IProjectRepository;