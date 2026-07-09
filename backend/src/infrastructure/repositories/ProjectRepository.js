import IProjectRepository from "../../domain/repositories/IProjectRepository.js";
import Project from "../../domain/entities/Project.js";
import { sql } from "../database/db.js";

class ProjectRepository extends IProjectRepository {

    async findAllByUser(usuario_id) {
      const request = new sql.Request();

      request.input("usuario_id", sql.Int, usuario_id);

      const result = await request.query(`
        SELECT id, nombre, descripcion, fecha_inicio, fecha_fin, estado, usuario_id, fecha_creacion
        FROM proyectos
        WHERE usuario_id = @usuario_id
        ORDER BY fecha_creacion DESC
      `);

      return result.recordset.map(row => new Project(row));
    }

    async update(id, usuario_id, data) {
      const request = new sql.Request();

      request.input("id", sql.Int, id);
      request.input("usuario_id", sql.Int, usuario_id);
      request.input("nombre", sql.VarChar(100), data.nombre);
      request.input("descripcion", sql.VarChar(255), data.descripcion);
      request.input("fecha_inicio", sql.Date, data.fecha_inicio);
      request.input("fecha_fin", sql.Date, data.fecha_fin);
      request.input("estado", sql.VarChar(30), data.estado);

      const result = await request.query(`
        UPDATE proyectos
        SET
          nombre = @nombre,
          descripcion = @descripcion,
          fecha_inicio = @fecha_inicio,
          fecha_fin = @fecha_fin,
          estado = @estado
        OUTPUT
          INSERTED.id,
          INSERTED.nombre,
          INSERTED.descripcion,
          INSERTED.fecha_inicio,
          INSERTED.fecha_fin,
          INSERTED.estado,
          INSERTED.usuario_id,
          INSERTED.fecha_creacion
        WHERE id = @id
        AND usuario_id = @usuario_id
      `);

      if (result.recordset.length === 0) {
        return null;
      }

      return new Project(result.recordset[0]);
    }

    async delete(id, usuario_id) {
      const request = new sql.Request();

      request.input("id", sql.Int, id);
      request.input("usuario_id", sql.Int, usuario_id);

      const result = await request.query(`
        DELETE FROM proyectos
        OUTPUT
          DELETED.id,
          DELETED.nombre,
          DELETED.descripcion,
          DELETED.fecha_inicio,
          DELETED.fecha_fin,
          DELETED.estado,
          DELETED.usuario_id,
          DELETED.fecha_creacion
        WHERE id = @id
        AND usuario_id = @usuario_id
      `);

      if (result.recordset.length === 0) {
        return null;
      }

      return new Project(result.recordset[0]);
    }

    async create(project) {

        const request = new sql.Request();

        request.input("nombre", sql.VarChar, project.nombre);
        request.input("descripcion", sql.VarChar, project.descripcion);
        request.input("fecha_inicio", sql.Date, project.fecha_inicio);
        request.input("fecha_fin", sql.Date, project.fecha_fin);
        request.input("estado", sql.VarChar, project.estado);
        request.input("usuario_id", sql.Int, project.usuario_id);

        const result = await request.query(`
            INSERT INTO proyectos
            (
                nombre,
                descripcion,
                fecha_inicio,
                fecha_fin,
                estado,
                usuario_id
            )

            OUTPUT
                INSERTED.id,
                INSERTED.nombre,
                INSERTED.descripcion,
                INSERTED.fecha_inicio,
                INSERTED.fecha_fin,
                INSERTED.estado,
                INSERTED.usuario_id,
                INSERTED.fecha_creacion

            VALUES
            (
                @nombre,
                @descripcion,
                @fecha_inicio,
                @fecha_fin,
                @estado,
                @usuario_id
            )
        `);

        return new Project(result.recordset[0]);
    }

}

export default ProjectRepository;