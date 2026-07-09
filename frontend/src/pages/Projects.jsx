import { useEffect, useState } from 'react';
import DatePicker, { registerLocale } from 'react-datepicker';
import { es } from 'date-fns/locale/es';
import { Search, X } from 'lucide-react';
import { format } from 'date-fns';
import {
  getProjects,
  createProject,
  updateProject,
  deleteProject,
} from '../services/projectService';
import 'react-datepicker/dist/react-datepicker.css';
import '../styles/DatePicker.css'; // Estilos personalizados para el DatePicker

// Registrar el locale español para el DatePicker
registerLocale('es', es);

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [form, setForm] = useState({
    nombre: '',
    descripcion: '',
    fecha_inicio: '',
    fecha_fin: '',
    estado: 'Activo',
  });
  const [editingId, setEditingId] = useState(null);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProject, setSelectedProject] = useState(null);

  const loadProjects = async () => {
    try {
      const data = await getProjects();
      setProjects(data);
    } catch (err) {
      setError('Error al cargar proyectos.');
    }
  };

  useEffect(() => {
    loadProjects();
  }, []);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleDateChange = (date, name) => {
    setForm(prevForm => ({
      ...prevForm,
      [name]: date,
    }));
  };

  const resetForm = () => {
    setForm({
      nombre: '',
      descripcion: '',
      fecha_inicio: '',
      fecha_fin: '',
      estado: 'Activo',
    });
    setEditingId(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Formatear fechas a YYYY-MM-DD para el backend si son objetos Date
    const payload = {
      ...form,
      fecha_inicio: form.fecha_inicio instanceof Date ? form.fecha_inicio.toISOString().split('T')[0] : form.fecha_inicio,
      fecha_fin: form.fecha_fin instanceof Date ? form.fecha_fin.toISOString().split('T')[0] : form.fecha_fin,
    };

    try {
      if (editingId) {
        await updateProject(editingId, payload);
      } else {
        // Para nuevos proyectos, no enviamos el payload completo si no el 'form'
        // que ya tiene los datos correctos.
        await createProject(payload);
      }

      resetForm();
      await loadProjects();
    } catch (err) {
      setError('Error al guardar proyecto.');
    }
  };

  const handleEdit = (project) => {
    setEditingId(project.id);
    setForm({
      nombre: project.nombre || '',
      descripcion: project.descripcion || '',
      fecha_inicio: project.fecha_inicio ? new Date(project.fecha_inicio) : '',
      fecha_fin: project.fecha_fin ? new Date(project.fecha_fin) : '',
      estado: project.estado || 'Activo',
    });
  };

  const handleDelete = async (id) => {
    const ok = window.confirm('¿Eliminar este proyecto?');
    if (!ok) return;

    try {
      await deleteProject(id);
      await loadProjects();
    } catch (err) {
      setError('Error al eliminar proyecto.');
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return format(new Date(dateString), 'dd/MM/yyyy');
  };

  const handleCardClick = (project) => {
    setSelectedProject(project);
  };

  const handleCloseModal = () => {
    setSelectedProject(null);
  };

  const filteredProjects = projects.filter(project => {
    const term = searchTerm.toLowerCase();
    return (
      project.nombre.toLowerCase().includes(term) ||
      project.descripcion.toLowerCase().includes(term) ||
      project.estado.toLowerCase().includes(term)
    );
  });

  return (
    <div className="page">
      <h1>Gestión de Proyectos</h1>

      <div className="card" style={{ maxWidth: '900px' }}>
        <h2>{editingId ? 'Editar proyecto' : 'Nuevo proyecto'}</h2>
        {error && <p style={{ color: 'red' }}>{error}</p>}

        <form className="form" onSubmit={handleSubmit}>
          <input
            name="nombre"
            placeholder="Nombre del proyecto"
            value={form.nombre}
            onChange={handleChange}
            required
          />

          <textarea
            name="descripcion"
            placeholder="Descripción"
            value={form.descripcion}
            onChange={handleChange}
          />

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="fecha_inicio">Fecha de inicio</label>
              <DatePicker
                id="fecha_inicio"
                selected={form.fecha_inicio}
                onChange={(date) => handleDateChange(date, 'fecha_inicio')}
                locale="es"
                dateFormat="dd/MM/yyyy"
                placeholderText="dd/mm/aaaa"
                className="date-picker-input"
                required
                showPopperArrow={false}
                autoComplete="off"
              />
            </div>
            <div className="form-group">
              <label htmlFor="fecha_fin">Fecha de finalización</label>
              <DatePicker
                id="fecha_fin"
                selected={form.fecha_fin}
                onChange={(date) => handleDateChange(date, 'fecha_fin')}
                locale="es"
                dateFormat="dd/MM/yyyy"
                placeholderText="dd/mm/aaaa"
                className="date-picker-input"
                minDate={form.fecha_inicio}
                required
                showPopperArrow={false}
                autoComplete="off"
              />
            </div>
          </div>

          <select name="estado" value={form.estado} onChange={handleChange}>
            <option value="Activo">Activo</option>
            <option value="En progreso">En progreso</option>
            <option value="Finalizado">Finalizado</option>
          </select>

          <div style={{ gridColumn: '1 / -1', display: 'flex', gap: '12px' }}>
            <button type="submit">
              {editingId ? 'Actualizar proyecto' : 'Crear proyecto'}
            </button>

            {editingId && (
              <button type="button" onClick={resetForm} className="secondary">
                Cancelar edición
              </button>
            )}
          </div>
        </form>
      </div>

      <div className="list-header">
        <h2>Mis proyectos</h2>
        <div className="search-bar">
          <Search size={18} className="search-icon" />
          <input
            type="text"
            placeholder="Buscar proyecto..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {filteredProjects.length === 0 ? (
        <div className="empty-state">
          <h3>{searchTerm ? 'No se encontraron proyectos' : 'Aún no tienes proyectos'}</h3>
          <p>{searchTerm ? 'Intenta con otra palabra clave.' : 'Crea tu primer proyecto para empezar.'}</p>
        </div>
      ) : (
        <div className="project-grid">
          {filteredProjects.map((project) => (
            <div className="card project-card" key={project.id} onClick={() => handleCardClick(project)}>
              <div className="project-card-header">
                <h3><span className="project-icon">📁</span> {project.nombre}</h3>
                <span className={`badge badge-status-${project.estado.toLowerCase().replace(' ', '-')}`}>{project.estado}</span>
              </div>
              <p className="project-description">{project.descripcion}</p>
              <div className="project-card-footer">
                <div className="project-dates">
                  <span>{formatDate(project.fecha_inicio)}</span>
                  <span>→</span>
                  <span>{formatDate(project.fecha_fin)}</span>
                </div>
                <div className="actions">
                  <button className="edit" onClick={(e) => { e.stopPropagation(); handleEdit(project); }}>Editar</button>
                  <button className="danger" onClick={(e) => { e.stopPropagation(); handleDelete(project.id); }}>Eliminar</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {selectedProject && (
        <div className="modal-overlay" onClick={handleCloseModal}>
          <div className="modal-content project-detail-modal" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={handleCloseModal}><X size={24} /></button>
            <h2>{selectedProject.nombre}</h2>
            <p className="project-detail-description">{selectedProject.descripcion}</p>
            <div className="project-detail-meta">
              <div><span>Estado</span><span className={`badge badge-status-${selectedProject.estado.toLowerCase().replace(' ', '-')}`}>{selectedProject.estado}</span></div>
              <div><span>Inicio</span><span>{formatDate(selectedProject.fecha_inicio)}</span></div>
              <div><span>Fin</span><span>{formatDate(selectedProject.fecha_fin)}</span></div>
              {selectedProject.creado_en && <div><span>Creado</span><span>{formatDate(selectedProject.creado_en)}</span></div>}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Projects;