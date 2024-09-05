import { SECRET_KEY } from "../config/config.js";
import jwt from 'jsonwebtoken'
import Resident from "../models/Residente.js";

export const verificarToken = async (req, res, next) => {
    try {
        const { authorization } =  req.headers //Aquí se obtiene el valor del encabezado 'authorization' de la solicitud
        const decoded = jwt.verify(authorization, SECRET_KEY) // Si el token es válido, la función devuelve un objeto decoded
        console.log(decoded) // aui se imprime el token decodificado

        const ressidente  = await Resident.getById(1)
        if(!ressidente.length === 0) return res.status(404).json({ message: 'El token no pertenece a ningun residente registrado'}) 

        req.resident = ressidente[0]
        // req.residentId = decoded.residenteId //  se accede a la propiedad residenteId del objeto decoded, que contiene el ID único del residente
        // Esto significa que ahora la solicitud (req) lleva asociada la información del residente que ha sido autenticado.
        next()
        
    } catch (error) {

        if (error instanceof jwt.TokenExpiredError)
            return res.status(400).json({ message: 'Token expirado'}) 
        res.status(500).json({ message: error.message })
    }

}