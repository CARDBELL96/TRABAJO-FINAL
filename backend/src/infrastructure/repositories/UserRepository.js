import IUserRepository from "../../domain/repositories/IUserRepository.js";
import User from "../../domain/entities/User.js";
import { sql } from "../database/db.js";

class UserRepository extends IUserRepository {
  async findByEmail(email) {
    const request = new sql.Request();

    request.input("email", sql.VarChar, email);

    const result = await request.query(`
      SELECT id, nombre, email, rol, fecha_creacion, password
      FROM usuarios
      WHERE email = @email
    `);

    if (result.recordset.length === 0) {
      return null;
    }

    return new User(result.recordset[0]);
  }

  async create(user) {
    const request = new sql.Request();

    request.input("nombre", sql.VarChar(100), user.nombre);
    request.input("email", sql.VarChar(100), user.email);
    request.input("password", sql.VarChar(255), user.password);
    request.input("rol", sql.VarChar(20), user.rol || "usuario");

    const result = await request.query(`
      INSERT INTO usuarios (nombre, email, password, rol)
      OUTPUT INSERTED.id, INSERTED.nombre, INSERTED.email, INSERTED.rol, INSERTED.fecha_creacion
      VALUES (@nombre, @email, @password, @rol)
    `);

    return new User(result.recordset[0]);
  }
}

export default UserRepository;
