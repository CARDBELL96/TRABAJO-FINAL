import sql from 'mssql';
import { env } from '../config/env.js';

const dbSettings = {
  user: env.DB.USER,
  password: env.DB.PASSWORD,
  server: env.DB.SERVER,
  database: env.DB.DATABASE,
  options: {
    encrypt: true, // Para desarrollo local. En producción (ej. Azure), debería ser true.
    trustServerCertificate: false, // Cambiar a false en producción y configurar certificados
  },
  port: env.DB.PORT,
  connectionTimeout: 30000,
  requestTimeout: 30000,
};

export async function connectDB() {
  try {
    await sql.connect(dbSettings);
    console.log('Conexión a SQL Server establecida correctamente.');
  } catch (error) {
    console.error('Error al conectar con la base de datos:', error);
    process.exit(1);
  }
}

export { sql };