import { NavLink } from 'react-router-dom';

const Sidebar = () => {
  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        TaskFlow
      </div>
      <nav className="sidebar-nav">
        <ul>
          <li><NavLink to="/" end>Dashboard</NavLink></li>
          <li><NavLink to="/projects">Proyectos</NavLink></li>
          <li><NavLink to="/tasks">Tareas</NavLink></li>
          <li><NavLink to="/kanban">Tablero Kanban</NavLink></li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;