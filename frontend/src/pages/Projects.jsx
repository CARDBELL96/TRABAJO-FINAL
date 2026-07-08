const mockProjects = [
  { id: 1, name: 'Desarrollo de TaskFlow', status: 'En Progreso', owner: 'Juan Pérez', dueDate: '2024-12-31' },
  { id: 2, name: 'Campaña de Marketing Q4', status: 'Pendiente', owner: 'Maria García', dueDate: '2024-10-15' },
  { id: 3, name: 'Migración a Cloud', status: 'Completado', owner: 'Carlos Rivas', dueDate: '2024-06-30' },
  { id: 4, name: 'Rediseño del Sitio Web', status: 'En Progreso', owner: 'Ana López', dueDate: '2024-11-01' },
];

const Projects = () => {
  return (
    <div className="table-container">
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre del Proyecto</th>
            <th>Estado</th>
            <th>Responsable</th>
            <th>Fecha de Entrega</th>
          </tr>
        </thead>
        <tbody>
          {mockProjects.map(project => (
            <tr key={project.id}>
              <td>{project.id}</td>
              <td>{project.name}</td>
              <td>{project.status}</td>
              <td>{project.owner}</td>
              <td>{project.dueDate}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Projects;