import { useState, useEffect } from 'react';
import { createTask, updateTask } from '../services/taskService';
import '../styles/Modal.css';

const TaskFormModal = ({ task, projects, onClose, onSave }) => {
  const [form, setForm] = useState({
    titulo: '',
    descripcion: '',
    fecha_limite: '',
    prioridad: 'Media',
    estado: 'Pendiente',
    proyecto_id: '',
  });
  const [error, setError] = useState('');

  useEffect(() => {
    if (task) {
      setForm({
        titulo: task.titulo || '',
        descripcion: task.descripcion || '',
        fecha_limite: task.fecha_limite?.split('T')[0] || '',
        prioridad: task.prioridad || 'Media',
        estado: task.estado || 'Pendiente',
        proyecto_id: task.proyecto_id || '',
      });
    } else if (projects.length > 0) {
      setForm(prev => ({ ...prev, proyecto_id: projects[0].id }));
    }
  }, [task, projects]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      if (task) {
        await updateTask(task.id, form);
      } else {
        await createTask(form);
      }
      onSave();
    } catch (err) {
      setError('Error al guardar la tarea.');
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2>{task ? 'Editar Tarea' : 'Nueva Tarea'}</h2>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <form onSubmit={handleSubmit} className="form">
          <input name="titulo" placeholder="Título de la tarea" value={form.titulo} onChange={handleChange} required />
          <textarea name="descripcion" placeholder="Descripción" value={form.descripcion} onChange={handleChange} />
          <input type="date" name="fecha_limite" value={form.fecha_limite} onChange={handleChange} />
          <div className="select-wrapper">
            <select name="prioridad" value={form.prioridad} onChange={handleChange}>
              <option value="Baja">Baja</option>
              <option value="Media">Media</option>
              <option value="Alta">Alta</option>
            </select>
          </div>
          <div className="select-wrapper">
            <select name="estado" value={form.estado} onChange={handleChange}>
              <option value="Pendiente">Pendiente</option>
              <option value="En progreso">En progreso</option>
              <option value="Completada">Completada</option>
            </select>
          </div>
          <div className="select-wrapper">
            <select name="proyecto_id" value={form.proyecto_id} onChange={handleChange} required>
              <option value="" disabled>Selecciona un proyecto</option>
              {projects.map(p => (
                <option key={p.id} value={p.id}>{p.nombre}</option>
              ))}
            </select>
          </div>
          <div style={{ display: 'flex', gap: '12px' }}>
            <button type="submit">{task ? 'Actualizar' : 'Crear'}</button>
            <button type="button" className="secondary" onClick={onClose}>Cancelar</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskFormModal;