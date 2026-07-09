import { useState, useEffect } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { Settings, X } from 'lucide-react';
import ThemeToggle from './ThemeToggle';
import '../styles/layout.css';

const Layout = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form, setForm] = useState({ nombre: '', email: '' });
  const [notification, setNotification] = useState('');

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
      setForm({ nombre: parsedUser.nombre || '', email: parsedUser.email || '' });
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  const handleProfileUpdate = (e) => {
    e.preventDefault();
    const updatedUser = { ...user, nombre: form.nombre };
    localStorage.setItem('user', JSON.stringify(updatedUser));
    setUser(updatedUser);
    setNotification('Cambios guardados localmente.');
    setTimeout(() => {
      setNotification('');
      setIsModalOpen(false);
    }, 2000);
  };

  const getInitials = (name) => {
    if (!name) return '?';
    const names = name.split(' ');
    if (names.length > 1) {
      return `${names[0][0]}${names[1][0]}`.toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
  };

  const handleOpenModal = () => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setForm({ nombre: parsedUser.nombre || '', email: parsedUser.email || '' });
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
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

        <div className="sidebar-footer">
          {user && (
            <div className="user-card">
              <div className="avatar">{getInitials(user.nombre)}</div>
              <div className="user-info">
                <span className="user-name">{user.nombre || 'Usuario'}</span>
                <span className="user-email">{user.email}</span>
              </div>
              <button className="settings-btn" onClick={handleOpenModal} title="Configuración de cuenta">
                <Settings size={18} />
              </button>
            </div>
          )}
          <ThemeToggle />
          <button className="icon-btn danger" onClick={handleLogout} title="Cerrar sesión">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" x2="9" y1="12" y2="12"/></svg>
          </button>
        </div>
      </aside>

      <main className="main-content">
        <Outlet />
      </main>

      {isModalOpen && (
        <div className="modal-overlay" onClick={handleCloseModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Configuración de cuenta</h2>
              <button className="modal-close" onClick={handleCloseModal}><X size={24} /></button>
            </div>
            <form onSubmit={handleProfileUpdate} className="form">
              <label htmlFor="nombre">Nombre</label>
              <input id="nombre" type="text" value={form.nombre} onChange={(e) => setForm({...form, nombre: e.target.value})} />
              
              <label htmlFor="email">Correo electrónico (no editable)</label>
              <input id="email" type="email" value={form.email} readOnly disabled />

              <button type="submit">Guardar Cambios</button>
              {notification && <p className="notification">{notification}</p>}
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Layout;