import { Router } from "express";
import { store, all, find, update, updatePartial, remove } from "../controllers/usuario.controller.js";
import { verificarTokenYIncidente } from "../middlewares/incidente.middleware.js";

const adminRoutes = Router();
// const incidentRoutes = Router();

// Rutas para administración de usuarios
adminRoutes.get('/admin', verificarTokenYIncidente, all); // Obtener todos los usuarios (requiere verificación)
adminRoutes.post('/admin', verificarTokenYIncidente, store); // Crear un nuevo usuario (requiere verificación)
adminRoutes.get('/admin/:id', verificarTokenYIncidente, find); // Obtener un usuario por ID (requiere verificación)
adminRoutes.put('/:id', verificarTokenYIncidente, update); // Actualizar  un usuario (requiere verificación)
adminRoutes.patch('/partial/:id', verificarTokenYIncidente, updatePartial); // Actualizar parcialmente un usuario (requiere verificación)
adminRoutes.delete('/admin/:id', verificarTokenYIncidente, remove); // Eliminar un usuario (requiere verificación)

// Rutas para administración de incidentes (acceso del administrador)
// incidentRoutes.get('/inc/all', verificarTokenYIncidente, allIncidente); // Obtener todos los incidentes
// incidentRoutes.post('/inc/create', verificarTokenYIncidente, storeIncidente); // Crear un nuevo incidente
// incidentRoutes.get('/inc/:id', verificarTokenYIncidente, findIncidente); // Obtener un incidente por ID
// incidentRoutes.put('/inc/:id', verificarTokenYIncidente, updateIncidente); 
// incidentRoutes.patch('/inc/:id', verificarTokenYIncidente, updatePartialIncidente); 

// Exportar rutas combinadas
// export  { adminRoutes, incidentRoutes };

export  default adminRoutes







// import { Router } from "express";
// import { store, all, find, update, updatePartial, remove } from "../controllers/usuario.controller.js"; // el .js es importante

// const adminRoutes= Router()

// // admin
// adminRoutes.get('/admin', all )
// adminRoutes.post('/', store ) // para guardar ,crer usuarios
// adminRoutes.post('/admin', find ) // para guardar ,crer usuarios
// adminRoutes.get('/admin/:id', update )
// adminRoutes.put('/admin/:id', updatePartial );
// adminRoutes.patch('/admin/:id', remove );
// adminRoutes.delete('/admin/:id',  );
// //incidentes


// export default adminRoutes