import { sql } from "../database/db.js";
import Task from "../../domain/entities/Task.js";
import ITaskRepository from "../../domain/repositories/ITaskRepository.js";

class TaskRepository extends ITaskRepository {
  async create(task) {
    const request = new sql.Request();
    request.input("titulo", sql.VarChar, task.titulo);
    request.input("descripcion", sql.VarChar, task.descripcion);
    request.input("estado", sql.VarChar, task.estado);
    request.input("prioridad", sql.VarChar, task.prioridad);
    request.input("fecha_limite", sql.Date, task.fecha_limite);
    request.input("proyecto_id", sql.Int, task.proyecto_id);
    request.input("usuario_id", sql.Int, task.usuario_id);

    const result = await request.query(`
      INSERT INTO tareas (titulo, descripcion, estado, prioridad, fecha_limite, proyecto_id, usuario_id)
      OUTPUT INSERTED.*
      VALUES (@titulo, @descripcion, @estado, @prioridad, @fecha_limite, @proyecto_id, @usuario_id)
    `);

    return new Task(result.recordset[0]);
  }

  async findAllByUser(usuario_id) {
    const request = new sql.Request();
    request.input("usuario_id", sql.Int, usuario_id);

    const result = await request.query(`
      SELECT * FROM tareas WHERE usuario_id = @usuario_id ORDER BY fecha_creacion DESC
    `);

    return result.recordset.map((row) => new Task(row));
  }

  async update(id, usuario_id, data) {
    const request = new sql.Request();
    request.input("id", sql.Int, id);
    request.input("usuario_id", sql.Int, usuario_id);
    request.input("titulo", sql.VarChar, data.titulo);
    request.input("descripcion", sql.VarChar, data.descripcion);
    request.input("estado", sql.VarChar, data.estado);
    request.input("prioridad", sql.VarChar, data.prioridad);
    request.input("fecha_limite", sql.Date, data.fecha_limite);

    const result = await request.query(`
      UPDATE tareas
      SET
        titulo = @titulo,
        descripcion = @descripcion,
        estado = @estado,
        prioridad = @prioridad,
        fecha_limite = @fecha_limite
      OUTPUT INSERTED.*
      WHERE id = @id AND usuario_id = @usuario_id
    `);

    if (result.recordset.length === 0) {
      return null;
    }

    return new Task(result.recordset[0]);
  }

  async delete(id, usuario_id) {
    const request = new sql.Request();
    request.input("id", sql.Int, id);
    request.input("usuario_id", sql.Int, usuario_id);

    const result = await request.query(`
      DELETE FROM tareas
      OUTPUT DELETED.*
      WHERE id = @id AND usuario_id = @usuario_id
    `);

    if (result.recordset.length === 0) {
      return null;
    }

    return new Task(result.recordset[0]);
  }

  async findById(id, usuario_id) {
    const request = new sql.Request();
    request.input("id", sql.Int, id);
    request.input("usuario_id", sql.Int, usuario_id);

    const result = await request.query(
      "SELECT * FROM tareas WHERE id = @id AND usuario_id = @usuario_id"
    );

    if (result.recordset.length === 0) {
      return null;
    }

    return new Task(result.recordset[0]);
  }
}

export default TaskRepository;