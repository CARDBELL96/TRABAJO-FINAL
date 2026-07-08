import app from './app.js';
import { env } from './infrastructure/config/env.js';
import { connectDB } from './infrastructure/database/db.js';

async function main() {
  try {
    // 1. Conectar a la base de datos
    await connectDB();

    // 2. Iniciar el servidor
    app.listen(env.PORT, () => {
      console.log(`Servidor corriendo en el puerto ${env.PORT}`);
    });
  } catch (error) {
    console.error('Error al iniciar el servidor:', error);
  }
}

main();