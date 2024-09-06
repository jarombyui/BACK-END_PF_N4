import { Router } from "express";
import { find, all, update, updatePartial, remove, store } from "../controllers/incidente.controller.js"; // el .js es importante
import { verificarTokenYIncidente } from "../middlewares/incidente.middleware.js";
import { getIncidentesByUsuario } from "../middlewares/auth.middleware.js";

const incidentRoutes = Router();

// incidentRoutes.get('/create/inc', store); // crear incidente
// incidentRoutes.get('/all/inc', all); // traer todos 
// incidentRoutes.get('/byId/inc', find); // buscar por id 
// incidentRoutes.post('/create/inc',verificarTokenYIncidente, verificarTokenYIncidente); // Crear un nuevo incidente
// incidentRoutes.get('/inc/:id', update);
// incidentRoutes.get('/inc/:id', updatePartial);
// incidentRoutes.get('/inc/:id', remove);
 // Obtener un incidente por ID

 incidentRoutes.get('/inc/all', verificarTokenYIncidente, all); // Obtener todos los incidentes
 incidentRoutes.post('/inc/create', verificarTokenYIncidente, store); // Crear un nuevo incidente
 incidentRoutes.get('/inc/:id', verificarTokenYIncidente, find); // Obtener un incidente por ID
 incidentRoutes.get('/inc/us', verificarTokenYIncidente, getIncidentesByUsuario); /// añadiiiiiiiiiiiiiii
 incidentRoutes.put('/inc/:id', verificarTokenYIncidente, update); 
 incidentRoutes.patch('/inc/:id', verificarTokenYIncidente, updatePartial);
 incidentRoutes.patch('/inc/:id', verificarTokenYIncidente, remove); 


export default incidentRoutes;