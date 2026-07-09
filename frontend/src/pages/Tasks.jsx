import { useEffect, useState, useMemo } from 'react';
import { format } from 'date-fns';
import { getTasks, deleteTask } from '../services/taskService';
import { getProjects } from '../services/projectService.js';
import TaskFormModal from '../components/TaskFormModal.jsx';
import '../styles/Tasks.css';

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [projects, setProjects] = useState([]);
  const [error, setError] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterState, setFilterState] = useState('Todos');
  const [filterPriority, setFilterPriority] = useState('Todas');

  const loadData = async () => {
    try {
      const tasksData = await getTasks();
      const projectsData = await getProjects();
      setTasks(tasksData);
      setProjects(projectsData);
    } catch (err) {
      setError('Error al cargar los datos.');
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleOpenModal = (task = null) => {
    setSelectedTask(task);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedTask(null);
  };

  const handleSave = () => {
    handleCloseModal();
    loadData(); // Recargar tareas y proyectos
  };

  const handleDelete = async (taskId) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar esta tarea?')) {
      try {
        await deleteTask(taskId);
        loadData(); // Recargar para reflejar la eliminación
      } catch (err) {
        setError('Error al eliminar la tarea.');
      }
    }
  };

  const getProjectName = (projectId) => {
    const project = projects.find(p => p.id === projectId);
    return project ? project.nombre : 'N/A';
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return format(new Date(dateString), 'dd/MM/yyyy');
  };

  const filteredTasks = useMemo(() => {
    return tasks.filter(task => {
      const term = searchTerm.toLowerCase();
      const projectName = getProjectName(task.proyecto_id).toLowerCase();

      const matchesSearch =
        task.titulo.toLowerCase().includes(term) ||
        projectName.includes(term) ||
        (task.descripcion && task.descripcion.toLowerCase().includes(term));

      const matchesState = filterState === 'Todos' || task.estado === filterState;
      const matchesPriority = filterPriority === 'Todas' || task.prioridad === filterPriority;

      return matchesSearch && matchesState && matchesPriority;
    });
  }, [tasks, searchTerm, filterState, filterPriority, projects]);

  const hasTasks = tasks.length > 0;
  const hasFilteredTasks = filteredTasks.length > 0;

  return (
    <div className="page">
      <div className="tasks-header">
        <div>
          <h1>Tareas</h1>
          <p>Gestiona todas las tareas de tus proyectos</p>
        </div>
        <button onClick={() => handleOpenModal()}>+ Nueva tarea</button>
      </div>

      <div className="filters">
        <input
          type="text"
          placeholder="🔍 Buscar tarea, proyecto..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select value={filterState} onChange={(e) => setFilterState(e.target.value)}>
          <option value="Todos">Todos los estados</option>
          <option value="Pendiente">Pendiente</option>
          <option value="En progreso">En progreso</option>
          <option value="Completada">Completada</option>
        </select>
        <select value={filterPriority} onChange={(e) => setFilterPriority(e.target.value)}>
          <option value="Todas">Todas las prioridades</option>
          <option value="Alta">Alta</option>
          <option value="Media">Media</option>
          <option value="Baja">Baja</option>
        </select>
      </div>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      <div className="task-list-container">
        <div className="task-row-header">
          <span>Título</span>
          <span>Proyecto</span>
          <span>Prioridad</span>
          <span>Estado</span>
          <span>Fecha Límite</span>
          <span style={{ textAlign: 'right' }}>Acciones</span>
        </div>
        <div className="task-list">
          {hasTasks && hasFilteredTasks ? (
            filteredTasks.map(task => (
              <div key={task.id} className="task-row">
                <span className="task-title">{task.titulo}</span>
                <span>{getProjectName(task.proyecto_id)}</span>
                <span>
                  <span className={`badge badge-priority-${task.prioridad}`}>{task.prioridad}</span>
                </span>
                <span>
                  <span className={`badge badge-status-${task.estado?.replace(' ', '.')}`}>{task.estado}</span>
                </span>
                <span>{formatDate(task.fecha_limite)}</span>
                <div className="task-actions">
                  <button title="Editar" onClick={() => handleOpenModal(task)}>✏️</button>
                  <button title="Eliminar" onClick={() => handleDelete(task.id)}>🗑️</button>
                </div>
              </div>
            ))
          ) : (
            <div className="empty-state" style={{ marginTop: '20px' }}>
              <h3>{hasTasks ? 'No se encontraron tareas' : 'No hay tareas aquí'}</h3>
              <p>
                {hasTasks ? 'Prueba a cambiar los filtros o el término de búsqueda.' : 'Crea tu primera tarea para empezar a organizar tu trabajo.'}
              </p>
            </div>
          )}
        </div>
      </div>

      {isModalOpen && (
        <TaskFormModal
          task={selectedTask}
          projects={projects}
          onClose={handleCloseModal}
          onSave={handleSave}
        />
      )}
    </div>
  );
};

export default Tasks;