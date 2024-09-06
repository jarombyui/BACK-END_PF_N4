import { Router } from "express";
import { find, store } from "../controllers/usuario.controller.js"; // el .js es importante


const usuarioRoutes= Router()
 // user
usuarioRoutes.post('/', store ) // para guardar ,crer usuarios
usuarioRoutes.get('/:id', find )  // para buscar usuario por id 


export default usuarioRoutes