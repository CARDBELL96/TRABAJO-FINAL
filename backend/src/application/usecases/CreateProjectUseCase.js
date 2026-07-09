import Project from "../../domain/entities/Project.js";

class CreateProjectUseCase {

    constructor(projectRepository){
        this.projectRepository = projectRepository;
    }

    async execute(data){

        const project = new Project({
            nombre: data.nombre,
            descripcion: data.descripcion,
            fecha_inicio: data.fecha_inicio,
            fecha_fin: data.fecha_fin,
            estado: "Activo",
            usuario_id: data.usuario_id
        });

        return await this.projectRepository.create(project);

    }

}

export default CreateProjectUseCase;