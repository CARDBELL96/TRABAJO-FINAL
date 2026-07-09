import { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { FolderKanban, ListTodo, LoaderCircle, CheckCircle2, Plus, Edit, Trash, X } from 'lucide-react';
import { getProjects } from '../services/projectService.js';
import { getTasks } from '../services/taskService.js';

// Datos simulados para el gráfico y las listas
const weeklyActivityData = [
  { day: 'Lun', tasks: 3 },
  { day: 'Mar', tasks: 5 },
  { day: 'Mié', tasks: 2 },
  { day: 'Jue', tasks: 7 },
  { day: 'Vie', tasks: 6 },
  { day: 'Sáb', tasks: 4 },
  { day: 'Dom', tasks: 1 },
];

const recentEventsData = [
  { icon: <CheckCircle2 size={18} className="text-green" />, text: 'Tarea "Implementar Login" completada.' },
  { icon: <Plus size={18} className="text-purple" />, text: 'Nueva tarea "CRUD Usuarios" agregada.' },
  { icon: <Edit size={18} className="text-cyan" />, text: 'Proyecto "TaskFlow" actualizado.' },
  { icon: <Plus size={18} className="text-blue" />, text: 'Proyecto "Startup" creado.' },
  { icon: <Trash size={18} className="text-red" />, text: 'Tarea "Diseño inicial" eliminada.' },
];

const getBarColorAndWorkload = (tasks) => {
  if (tasks <= 2) return { color: '#3B82F6', workload: 'Carga baja' }; // Azul
  if (tasks <= 4) return { color: '#38BDF8', workload: 'Carga normal' }; // Cian
  if (tasks <= 6) return { color: '#8B5CF6', workload: 'Carga alta' }; // Morado
  return { color: '#C084FC', workload: 'Carga crítica' }; // Magenta
};

const processedWeeklyData = weeklyActivityData.map(item => {
  const { color, workload } = getBarColorAndWorkload(item.tasks);
  return { ...item, fill: color, workload };
});

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="custom-tooltip">
        <p className="tooltip-label">{`Día: ${label}`}</p>
        <p className="tooltip-intro">{`Tareas registradas: ${data.tasks}`}</p>
        <p className="tooltip-workload" style={{ color: data.fill }}>{data.workload}</p>
      </div>
    );
  }

  return null;
};

const HoveredBar = (props) => {
  const { fill, x, y, width, height } = props;
  // Aumenta el brillo en el hover
  return <rect x={x} y={y} width={width} height={height} fill={fill} fillOpacity="1.1" />;
};

const Dashboard = () => {
  const [stats, setStats] = useState({
    proyectos: 0,
    pendientes: 0,
    enProgreso: 0,
    completadas: 0,
  });
  const [recentTasks, setRecentTasks] = useState([]);
  const [projects, setProjects] = useState([]);
  const [modalData, setModalData] = useState({
    isOpen: false,
    title: '',
    items: [],
    type: '', // 'project' or 'task'
  });

  const [allTasks, setAllTasks] = useState([]);

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        const [projectsData, tasksData] = await Promise.all([getProjects(), getTasks()]);
        
        setProjects(projectsData);
        setAllTasks(tasksData);

        setStats({
          proyectos: projectsData.filter((p) => p.estado === 'Activo').length,
          pendientes: tasksData.filter((t) => t.estado === 'Pendiente').length,
          enProgreso: tasksData.filter((t) => t.estado === 'En progreso').length,
          completadas: tasksData.filter((t) => t.estado === 'Completada').length,
        });

        // Ordenar tareas por fecha de creación y tomar las 5 más recientes
        const sortedTasks = [...tasksData].sort((a, b) => new Date(b.creado_en) - new Date(a.creado_en));
        setRecentTasks(sortedTasks.slice(0, 5));

      } catch (error) {
        console.error("Error al cargar datos del dashboard:", error);
        // Fallback a datos simulados si la carga falla
        setRecentTasks([
            { id: 1, titulo: 'Implementar Login', proyecto_id: 1, prioridad: 'Alta' },
            { id: 2, titulo: 'CRUD Usuarios', proyecto_id: 2, prioridad: 'Media' },
            { id: 3, titulo: 'Diseñar Dashboard', proyecto_id: 1, prioridad: 'Baja' },
        ]);
      }
    };

    loadDashboard();
  }, []);

  const getProjectName = (projectId) => {
    const project = projects.find(p => p.id === projectId);
    return project ? project.nombre : 'Proyecto Desconocido';
  };

  const handleCardClick = (type) => {
    let title = '';
    let items = [];

    switch (type) {
      case 'proyectos':
        title = 'Proyectos Activos';
        items = projects.filter(p => p.estado === 'Activo');
        break;
      case 'pendientes':
        title = 'Tareas Pendientes';
        items = allTasks.filter(t => t.estado === 'Pendiente');
        break;
      case 'enProgreso':
        title = 'Tareas en Progreso';
        items = allTasks.filter(t => t.estado === 'En progreso');
        break;
      case 'completadas':
        title = 'Tareas Completadas';
        items = allTasks.filter(t => t.estado === 'Completada');
        break;
      default:
        return;
    }

    setModalData({ isOpen: true, title, items, type: type === 'proyectos' ? 'project' : 'task' });
  };

  const handleCloseModal = () => {
    setModalData({ isOpen: false, title: '', items: [], type: '' });
  };

  return (
    <div className="page">
      <h1>Mi Panel de Control</h1>
      <p className="page-subtitle">Visión general de tus proyectos y tareas.</p>

      <div className="dashboard-grid">
        <div className="stat-card border-blue" onClick={() => handleCardClick('proyectos')}>
          <FolderKanban size={32} className="stat-icon" />
          <p className="stat-number">{stats.proyectos}</p>
          <h3 className="stat-title">Proyectos activos</h3>
        </div>

        <div className="stat-card border-purple" onClick={() => handleCardClick('pendientes')}>
          <ListTodo size={32} className="stat-icon" />
          <p className="stat-number">{stats.pendientes}</p>
          <h3 className="stat-title">Pendientes</h3>
        </div>

        <div className="stat-card border-cyan" onClick={() => handleCardClick('enProgreso')}>
          <LoaderCircle size={32} className="stat-icon" />
          <p className="stat-number">{stats.enProgreso}</p>
          <h3 className="stat-title">En progreso</h3>
        </div>

        <div className="stat-card border-green" onClick={() => handleCardClick('completadas')}>
          <CheckCircle2 size={32} className="stat-icon" />
          <p className="stat-number">{stats.completadas}</p>
          <h3 className="stat-title">Completadas</h3>
        </div>
      </div>

      <div className="card large-card">
        <div>
          <h2 className="card-title">Actividad de la semana</h2>
          <p className="card-subtitle">Cantidad de tareas registradas durante la semana.</p>
        </div>
        <div className="card-content-grid">
          <div className="chart-container">
            <ResponsiveContainer width="100%" height={350} className="recharts-responsive-container">
              <BarChart data={processedWeeklyData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                <XAxis dataKey="day" stroke="var(--muted)" fontSize={12} />
                <YAxis stroke="var(--muted)" fontSize={12} />
                <Tooltip content={<CustomTooltip />} cursor={false} />
                <Bar dataKey="tasks" radius={[4, 4, 0, 0]} animationDuration={800} activeBar={<HoveredBar />}>
                  {processedWeeklyData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="priority-tasks-container">
            <h3 className="list-title">Tareas prioritarias</h3>
            <ul className="priority-tasks-list">
              {recentTasks.length > 0 ? recentTasks.map(task => (
                <li key={task.id} className="priority-task-item">
                  <div className="task-info">
                    <span className="task-title">{task.titulo}</span>
                    <span className="task-project">{getProjectName(task.proyecto_id)}</span>
                  </div>
                  <span className={`badge badge-priority-${task.prioridad}`}>{task.prioridad}</span>
                </li>
              )) : (
                <p className="empty-list-text">No hay tareas recientes.</p>
              )}
            </ul>
          </div>
        </div>
      </div>

      <div className="card">
        <h2 className="card-title">Registro de actividad</h2>
        <ul className="activity-log">
          {recentEventsData.map((event, index) => (
            <li key={index} className="activity-log-item">
              <div className="activity-icon">{event.icon}</div>
              <span>{event.text}</span>
            </li>
          ))}
        </ul>
      </div>

      {modalData.isOpen && (
        <div className="modal-overlay" onClick={handleCloseModal}>
          <div className="modal-content dashboard-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>{modalData.title} ({modalData.items.length})</h2>
              <button className="modal-close" onClick={handleCloseModal}><X size={24} /></button>
            </div>
            <div className="modal-body">
              <ul className="modal-list">
                {modalData.items.map(item => (
                  <li key={item.id} className="modal-list-item">
                    {modalData.type === 'project' ? (
                      <span>{item.nombre}</span>
                    ) : (
                      <>
                        <span>{item.titulo}</span>
                        <span className="modal-list-item-project">{getProjectName(item.proyecto_id)}</span>
                      </>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;