class User {
  constructor({ id, nombre, email, password, rol, fecha_creacion }) {
    this.id = id;
    this.nombre = nombre;
    this.email = email;
    this.password = password;
    this.rol = rol;
    this.fechaCreacion = fecha_creacion;
  }
}

export default User;
