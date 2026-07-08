const mockTasks = [
  { id: 101, name: 'Diseñar pantalla de Login', project: 'Desarrollo de TaskFlow', assignedTo: 'Laura', priority: 'Alta' },
  { id: 102, name: 'Configurar base de datos', project: 'Desarrollo de TaskFlow', assignedTo: 'Carlos', priority: 'Alta' },
  { id: 103, name: 'Crear contenido para redes', project: 'Campaña de Marketing Q4', assignedTo: 'Maria', priority: 'Media' },
  { id: 104, name: 'Revisar mockups del home', project: 'Rediseño del Sitio Web', assignedTo: 'Ana', priority: 'Baja' },
  { id: 105, name: 'Implementar endpoint de usuarios', project: 'Desarrollo de TaskFlow', assignedTo: 'Juan', priority: 'Alta' },
];

const Tasks = () => {
  return (
    <div className="table-container">
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Tarea</th>
            <th>Proyecto</th>
            <th>Asignado a</th>
            <th>Prioridad</th>
          </tr>
        </thead>
        <tbody>
          {mockTasks.map(task => (
            <tr key={task.id}>
              <td>{task.id}</td>
              <td>{task.name}</td>
              <td>{task.project}</td>
              <td>{task.assignedTo}</td>
              <td>{task.priority}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Tasks;