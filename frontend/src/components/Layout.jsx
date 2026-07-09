import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import '../styles/layout.css';

const Layout = () => {
  const navigate = useNavigate();

  const toggleTheme = () => {
    const current = document.documentElement.getAttribute('data-theme');
    const next = current === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <div className="app-layout">
      <aside className="sidebar">
        <h2 className="sidebar-logo">TaskFlow</h2>

        <nav className="sidebar-nav">
          <NavLink to="/" end>Dashboard</NavLink>
          <NavLink to="/projects">Proyectos</NavLink>
          <NavLink to="/tasks">Tareas</NavLink>
          <NavLink to="/kanban">Kanban</NavLink>
        </nav>

        <button className="icon-btn secondary" onClick={toggleTheme} title="Cambiar tema">
          {document.documentElement.getAttribute('data-theme') === 'dark' ? '☀️' : '🌙'}
        </button>

        <button className="icon-btn danger" onClick={handleLogout} title="Cerrar sesión">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" x2="9" y1="12" y2="12"/></svg>
        </button>
      </aside>

      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;