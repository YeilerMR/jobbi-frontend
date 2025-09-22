// scripts/loadEnv.js
import * as fs from 'fs';
import * as path from 'path';
import dotenv from 'dotenv';

// Cargar .env en desarrollo
const envPath = path.resolve(process.cwd(), '.env');
if (fs.existsSync(envPath)) {
  dotenv.config({ path: envPath });
}

// Exportar variables para app.config.js
export const loadEnv = () => ({
  API_URL: process.env.API_URL || 'http://localhost:3000',
});