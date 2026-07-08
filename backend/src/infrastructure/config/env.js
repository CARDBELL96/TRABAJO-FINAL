import dotenv from 'dotenv';

dotenv.config();

export const env = {
  PORT: process.env.PORT || 4000,
  DB: {
    USER: process.env.DB_USER,
    PASSWORD: process.env.DB_PASSWORD,
    SERVER: process.env.DB_SERVER,
    DATABASE: process.env.DB_DATABASE,
    PORT: parseInt(process.env.DB_PORT, 10),
  },
  JWT_SECRET: process.env.JWT_SECRET,
};