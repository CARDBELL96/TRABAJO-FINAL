const KanbanColumn = ({ title, tasks }) => (
  <div className="kanban-column">
    <h3 className="kanban-column-title">{title}</h3>
    <div className="kanban-tasks">
      {tasks.map(task => (
        <div key={task.id} className="kanban-task">
          {task.content}
        </div>
      ))}
    </div>
  </div>
);

const Kanban = () => {
  const tasks = {
    pending: [
      { id: 1, content: 'Analizar requerimientos del módulo de reportes' },
      { id: 2, content: 'Definir paleta de colores secundaria' },
    ],
    inProgress: [
      { id: 3, content: 'Desarrollar componente Sidebar' },
      { id: 4, content: 'Crear endpoints para Proyectos' },
    ],
    inReview: [{ id: 5, content: 'Pull Request #23: Feature de Login' }],
    completed: [{ id: 6, content: 'Configurar entorno de desarrollo inicial' }],
  };

  return (
    <div className="kanban-board">
      <KanbanColumn title="Pendiente" tasks={tasks.pending} />
      <KanbanColumn title="En Progreso" tasks={tasks.inProgress} />
      <KanbanColumn title="En Revisión" tasks={tasks.inReview} />
      <KanbanColumn title="Completada" tasks={tasks.completed} />
    </div>
  );
};

export default Kanban;