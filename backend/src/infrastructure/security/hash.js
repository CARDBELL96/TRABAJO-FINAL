import bcrypt from "bcrypt";

const SALT_ROUNDS = 10;

/**
 * Genera el hash de una contraseña.
 */
export async function hashPassword(password) {
  return await bcrypt.hash(password, SALT_ROUNDS);
}

/**
 * Compara una contraseña con su hash.
 */
export async function comparePassword(password, hashedPassword) {
  return await bcrypt.compare(password, hashedPassword);
}