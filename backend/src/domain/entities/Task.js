class Task {
  constructor({
    id,
    titulo,
    descripcion,
    estado,
    prioridad,
    fecha_limite,
    proyecto_id,
    usuario_id,
    fecha_creacion,
  }) {
    this.id = id;
    this.titulo = titulo;
    this.descripcion = descripcion;
    this.estado = estado;
    this.prioridad = prioridad;
    this.fecha_limite = fecha_limite;
    this.proyecto_id = proyecto_id;
    this.usuario_id = usuario_id;
    this.fecha_creacion = fecha_creacion;
  }
}

export default Task;