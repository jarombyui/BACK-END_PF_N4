import { Router } from "express";
import { find, all, store } from "../controllers/residente.controller.js"; // el .js es importante


const residentRoutes= Router()
 
residentRoutes.get('/', all)
residentRoutes.post('/', store ) // para guardar ,crer usuarios
residentRoutes.get('/:id', find )

export default residentRoutes