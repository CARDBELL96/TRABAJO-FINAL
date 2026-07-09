import { useEffect, useState } from 'react';
import { FolderKanban, ListTodo, LoaderCircle, CheckCircle2, Plus, X } from 'lucide-react';
import { getProjects } from '../services/projectService.js';
import { getTasks } from '../services/taskService.js';

const Dashboard = () => {
  const [stats, setStats] = useState({
    proyectos: 0,
    pendientes: 0,
    enProgreso: 0,
    completadas: 0,
  });
  const [recentTasks, setRecentTasks] = useState([]);
  const [dynamicRecentEvents, setDynamicRecentEvents] = useState([]);
  const [modalData, setModalData] = useState({
    isOpen: false,
    title: '',
    items: [],
    type: '',
  });
  const [allTasks, setAllTasks] = useState([]);
  const [allProjects, setAllProjects] = useState([]);
  const [currentMonth, setCurrentMonth] = useState(() => {
    const date = new Date();
    date.setDate(1);
    date.setHours(0, 0, 0, 0);
    return date;
  });
  const [calendarDays, setCalendarDays] = useState([]);
  const [selectedDay, setSelectedDay] = useState(null);
  const [selectedDayTasks, setSelectedDayTasks] = useState([]);

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        const [projectsData, tasksData] = await Promise.all([getProjects(), getTasks()]);
        console.log('projectsData:', projectsData);
        console.log('tasksData:', tasksData);

        const userTasks = tasksData;
        const userProjects = projectsData;
        console.log('userTasks:', userTasks);
        console.log('userProjects:', userProjects);

        setAllTasks(userTasks);
        setAllProjects(userProjects);
        setStats({
          proyectos: userProjects.length,
          pendientes: userTasks.filter(t => t.estado?.toLowerCase() === 'pendiente').length,
          enProgreso: userTasks.filter(t => t.estado?.toLowerCase() === 'en progreso').length,
          completadas: userTasks.filter(t => t.estado?.toLowerCase() === 'completada').length,
        });

        const priorityTasks = userTasks
          .filter(t => {
            const prioridad = t.prioridad?.toLowerCase();
            return prioridad === 'alta' || prioridad === 'media';
          })
          .sort((a, b) => new Date(b.creado_en) - new Date(a.creado_en))
          .slice(0, 5);

        setRecentTasks(priorityTasks);
        setDynamicRecentEvents(getRecentEvents(userTasks, userProjects));
      } catch (error) {
        console.error('Error al cargar datos del dashboard:', error);
      }
    };

    loadDashboard();
  }, []);

  useEffect(() => {
    document.title = 'TaskFlow | Dashboard';
  }, []);

  useEffect(() => {
    setCalendarDays(getMonthDays(currentMonth, allTasks));
  }, [currentMonth, allTasks]);

  const formatDateKey = (date) => {
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
  };

  const getTasksByDate = (tasks) => {
    return tasks.reduce((map, task) => {
      if (!task.fecha_limite) return map;
      const dueDate = new Date(task.fecha_limite);
      if (Number.isNaN(dueDate.getTime())) return map;
      dueDate.setHours(0, 0, 0, 0);
      const key = formatDateKey(dueDate);
      if (!map[key]) map[key] = [];
      map[key].push(task);
      return map;
    }, {});
  };

  const getMonthDays = (month, tasks) => {
    const firstDayOfMonth = new Date(month);
    const year = firstDayOfMonth.getFullYear();
    const monthIndex = firstDayOfMonth.getMonth();
    const daysInMonth = new Date(year, monthIndex + 1, 0).getDate();
    const firstWeekDay = firstDayOfMonth.getDay();
    const tasksByDate = getTasksByDate(tasks);
    const totalCells = firstWeekDay + daysInMonth;
    const trailingCells = (7 - (totalCells % 7)) % 7;

    const days = Array.from({ length: totalCells }, (_, index) => {
      if (index < firstWeekDay) {
        return { date: null };
      }

      const dayNumber = index - firstWeekDay + 1;
      const date = new Date(year, monthIndex, dayNumber);
      const dateKey = formatDateKey(date);
      const dayTasks = tasksByDate[dateKey] || [];
      const count = dayTasks.length;

      return {
        date,
        dayNumber,
        count,
        label: getWorkloadLabel(count),
        className: getWorkloadClass(count),
        tasks: dayTasks,
        dateKey,
      };
    });

    return [...days, ...Array.from({ length: trailingCells }, () => ({ date: null }))];
  };

  const getWorkloadLabel = (count) => {
    if (count === 0) return 'Libre';
    if (count <= 2) return 'Carga baja';
    if (count <= 4) return 'Carga media';
    return 'Carga alta';
  };

  const getWorkloadClass = (count) => {
    if (count === 0) return 'workload-free';
    if (count <= 2) return 'workload-low';
    if (count <= 4) return 'workload-medium';
    return 'workload-high';
  };

  const handlePrevMonth = () => {
    setCurrentMonth(prev => {
      const date = new Date(prev);
      date.setMonth(prev.getMonth() - 1);
      date.setDate(1);
      return date;
    });
  };

  const handleNextMonth = () => {
    setCurrentMonth(prev => {
      const date = new Date(prev);
      date.setMonth(prev.getMonth() + 1);
      date.setDate(1);
      return date;
    });
  };

  const handleDayClick = (day) => {
    if (!day.date) return;
    setSelectedDay(day.dateKey);
    setSelectedDayTasks(day.tasks);
  };

  const closeDayModal = () => {
    setSelectedDay(null);
    setSelectedDayTasks([]);
  };

  const getRecentEvents = (tasks, projects) => {
    const events = [];

    tasks.forEach(task => {
      events.push({
        date: new Date(task.creado_en),
        icon: <Plus size={18} className="color-blue" />,
        text: `Tarea "${task.titulo}" creada.`,
        type: 'task_created',
        id: `task_created_${task.id}`,
      });
      if (task.estado === 'Completada') {
        events.push({
          date: new Date(task.fecha_limite || task.creado_en),
          icon: <CheckCircle2 size={18} className="color-green" />,
          text: `Tarea "${task.titulo}" completada.`,
          type: 'task_completed',
          id: `task_completed_${task.id}`,
        });
      }
    });

    projects.forEach(project => {
      events.push({
        date: new Date(project.creado_en || project.fecha_inicio),
        icon: <FolderKanban size={18} className="color-purple" />,
        text: `Proyecto "${project.nombre}" creado.`,
        type: 'project_created',
        id: `project_created_${project.id}`,
      });
    });

    return events.sort((a, b) => b.date.getTime() - a.date.getTime()).slice(0, 7);
  };

  const getProjectName = (projectId) => {
    const project = allProjects.find(p => p.id === projectId);
    return project ? project.nombre : 'Proyecto Desconocido';
  };

  const handleCardClick = (type) => {
    let title = '';
    let items = [];

    switch (type) {
      case 'proyectos':
        title = 'Proyectos Activos';
        items = allProjects.filter(p => p.estado === 'Activo');
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
          <h2 className="card-title">Carga mensual</h2>
          <p className="card-subtitle">Visualiza los días con mayor concentración de tareas según fecha límite.</p>
        </div>
        <div className="card-content-grid">
          <div className="chart-container">
            <div className="monthly-calendar-header">
              <button className="calendar-nav-button" onClick={handlePrevMonth}>&larr;</button>
              <div>
                <h3>{currentMonth.toLocaleDateString('es-ES', { month: 'long', year: 'numeric' })}</h3>
              </div>
              <button className="calendar-nav-button" onClick={handleNextMonth}>&rarr;</button>
            </div>
            <div className="calendar-grid">
              {['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'].map(day => (
                <div key={day} className="calendar-weekday">
                  {day}
                </div>
              ))}
              {calendarDays.map((day, index) => (
                <button
                  key={`${day.dateKey || index}`}
                  type="button"
                  className={`calendar-day ${day.date ? '' : 'calendar-day-inactive'} ${day.className}`}
                  onClick={() => handleDayClick(day)}
                  disabled={!day.date}
                >
                  {day.date ? (
                    <>
                      <div className="calendar-day-number">{day.dayNumber}</div>
                      <div className="calendar-day-tasks">{day.count} tareas</div>
                      <small>{day.label}</small>
                    </>
                  ) : null}
                </button>
              ))}
            </div>
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
      {selectedDay && (
        <div className="modal-overlay" onClick={closeDayModal}>
          <div className="modal-content dashboard-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Tareas del {new Date(selectedDay).toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' })}</h2>
              <button className="modal-close" onClick={closeDayModal}><X size={24} /></button>
            </div>
            <div className="modal-body">
              {selectedDayTasks.length > 0 ? (
                <ul className="modal-list">
                  {selectedDayTasks.map(task => (
                    <li key={task.id} className="modal-list-item">
                      <div>
                        <strong>{task.titulo}</strong>
                        <div className="modal-list-item-project">{getProjectName(task.proyecto_id)}</div>
                        <div>{task.prioridad} · {task.estado}</div>
                        <div>{new Date(task.fecha_limite).toLocaleDateString('es-ES')}</div>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="empty-list-text">No hay tareas para este día.</p>
              )}
            </div>
          </div>
        </div>
      )}

      <div className="card">
        <h2 className="card-title">Registro de actividad</h2>
        <ul className="activity-log">
          {dynamicRecentEvents.length > 0 ? (
            dynamicRecentEvents.map((event, index) => (
              <li key={index} className="activity-log-item">
                <div className="activity-icon">{event.icon}</div>
                <span>{event.text}</span>
              </li>
            ))
          ) : (
            <p className="empty-list-text">No hay actividad reciente.</p>
          )}
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
