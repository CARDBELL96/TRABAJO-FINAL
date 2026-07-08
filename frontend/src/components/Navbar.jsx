import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { checkHealth } from '../services/api';

const pageTitles = {
  '/': 'Dashboard',
  '/projects': 'Gestión de Proyectos',
  '/tasks': 'Gestión de Tareas',
  '/kanban': 'Tablero Kanban',
};

const Navbar = () => {
  const [backendStatus, setBackendStatus] = useState('pending');
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    checkHealth()
      .then(() => setBackendStatus('ok'))
      .catch(() => setBackendStatus('error'));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    navigate('/login');
  };

  const title = pageTitles[location.pathname] || 'TaskFlow';

  return (
    <header className="navbar">
      <h1 className="navbar-title">{title}</h1>
      <div className="navbar-right">
        <div className="status-indicator">
          <span>API Status:</span>
          <div className={`status-dot ${backendStatus}`}></div>
        </div>
        <button onClick={handleLogout} className="btn btn-secondary">
          Cerrar Sesión
        </button>
      </div>
    </header>
  );
};

export default Navbar;