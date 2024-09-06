import express from 'express';
import { PORT } from './config/config.js'; // El .js es necesario
import authRoutes from './routes/auth.routes.js';
import usuarioRoutes from './routes/usuario.routes.js';
import adminRoutes from './routes/admin.routes.js'; // Importación correcta de rutas de administración
import cors from 'cors';
import incidentRoutes from './routes/incidentes.routes.js';

const app = express();

// Middlewares
app.use(express.json()); // Parseo de JSON
app.use(cors()); // Permitir CORS

// Rutas
app.use('/api/users', usuarioRoutes); // Rutas para usuarios
app.use('/api/admin', adminRoutes);   // Rutas para administración
app.use('/api/incidents', incidentRoutes); // Rutas para incidentes (administración)
app.use('/api/auth', authRoutes);     // Rutas de autenticación

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

