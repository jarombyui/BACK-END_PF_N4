import { Router } from "express";
import { login, me } from "../controllers/auth.controller.js";
import { verificarToken } from "../middlewares/auth.middleware.js";

const usuarioRoutes= Router()
 
usuarioRoutes.post('/login', login ) // para iniciar sesion
usuarioRoutes.get('/me', verificarToken, me) //middleware verificarToken ||me, trae la info de quien se logueó


export default usuarioRoutes