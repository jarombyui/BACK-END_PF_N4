import { Router } from "express";
import { login, me } from "../controllers/auth.controller.js";
import { verificarToken } from "../middlewares/auth.middleware.js";

const residentRoutes= Router()
 
residentRoutes.post('/login', login ) // para iniciar sesion
residentRoutes.get('/me', verificarToken, me) //middleware verificarToken ||me, trae la info de quien se logueó



export default residentRoutes