import { useEffect, useState } from 'react';
import { format } from 'date-fns';
import { getTasks, updateTask } from '../services/taskService';
import '../styles/Kanban.css';

const KanbanColumn = ({ title, tasks, onStatusChange, className }) => (
  <div className={`kanban-column ${className}`}>
    <h3 className="kanban-column-title">{title} <span>{tasks.length}</span></h3>
    <div className="kanban-tasks">
      {tasks.length > 0 ? tasks.map(task => (
        <div key={task.id} className={`kanban-task-card card-priority-${task.prioridad}`}>
          <h4>{task.titulo}</h4>
          <p>{task.descripcion}</p>
          <div className="kanban-task-footer"> {/* Added formatDate for consistency */}
            <span className={`badge badge-priority-${task.prioridad}`}>{task.prioridad}</span>
            <span>{task.fecha_limite?.split('T')[0]}</span>
            <div className="select-wrapper">
              <select value={task.estado} onChange={(e) => onStatusChange(task, e.target.value)}>
                <option value="Pendiente">Pendiente</option>
                <option value="En progreso">En progreso</option>
                <option value="Completada">Completada</option>
              </select>
            </div>
          </div>
        </div>
      )) : (
        <p className="kanban-no-tasks">Sin tareas.</p>
      )}
    </div>
  </div>
);

const Kanban = () => {
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState('');

  const loadTasks = async () => {
    try {
      const data = await getTasks();
      setTasks(data);
    } catch (err) {
      setError('Error al cargar las tareas.');
    }
  };

  useEffect(() => {
    loadTasks();
  }, []);

  useEffect(() => {
    document.title = "TaskFlow | Kanban";
  }, []);

  const handleStatusChange = async (task, newStatus) => {
    try {
      // Optimistic UI update
      setTasks(prevTasks => prevTasks.map(t => 
        t.id === task.id ? { ...t, estado: newStatus } : t
      ));
      await updateTask(task.id, { ...task, estado: newStatus });
      // Re-fetch to ensure consistency, though optimistic update handles immediate UI change
      loadTasks(); 
    } catch (err) {
      setError('Error al actualizar el estado de la tarea.');
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return format(new Date(dateString), 'dd/MM/yyyy');
  };

  const tasksByStatus = {
    'Pendiente': tasks.filter(t => t.estado === 'Pendiente'),
    'En progreso': tasks.filter(t => t.estado === 'En progreso'),
    'Completada': tasks.filter(t => t.estado === 'Completada'),
  };

  return (
    <div className="page">
      <h1>Tablero Kanban</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <div className="kanban-board">
        <KanbanColumn title="Pendiente" tasks={tasksByStatus['Pendiente']} onStatusChange={handleStatusChange} className="col-pendiente" />
        <KanbanColumn title="En Progreso" tasks={tasksByStatus['En progreso']} onStatusChange={handleStatusChange} className="col-en-progreso" />
        <KanbanColumn title="Completada" tasks={tasksByStatus['Completada']} onStatusChange={handleStatusChange} className="col-completada" />
      </div>
    </div>
  );
};

export default Kanban;