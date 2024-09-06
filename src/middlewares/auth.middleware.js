import { SECRET_KEY } from "../config/config.js";
import jwt from 'jsonwebtoken';
import Usuario from "../models/Usuario.js";
import Incident from "../models/Incidente.js";

export const verificarToken = async (req, res, next) => {
    try {
        const { authorization } = req.headers; // Se obtiene el valor del encabezado 'authorization' de la solicitud

        if (!authorization) {
            return res.status(401).json({ message: 'No se proporcionó token de autenticación' });
        }

        // Verificar el token con la clave secreta
        const decoded = jwt.verify(authorization, SECRET_KEY);
        console.log(decoded); // Imprimir el token decodificado para verificar

        // Buscar el usuario por ID
        const usuario = await Usuario.getById(decoded.usuarioId); // Suponemos que `usuarioId` está en el token

        if (usuario.length === 0) {
            return res.status(404).json({ message: 'El token no pertenece a ningún usuario registrado' });
        }

        // Asociar el usuario autenticado a la solicitud
        req.usuario = usuario[0]; // Esto permite acceder a la información del usuario en las siguientes rutas
        next(); // Continuar con la siguiente función de middleware

    } catch (error) {
        if (error instanceof jwt.TokenExpiredError) {
            return res.status(400).json({ message: 'Token expirado' });
        }
        res.status(500).json({ message: error.message });
    }
};

// Función para Obtener Incidentes del Usuario

export const getIncidentesByUsuario = async (req, res) => {
    try {
        const incidentes = await Incident.getByUsuarioId(req.usuario.id);
        res.json(incidentes);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};




// import { SECRET_KEY } from "../config/config.js";
// import jwt from 'jsonwebtoken'
// import Resident from "../models/Usuario.js";

// export const verificarToken = async (req, res, next) => {
//     try {
//         const { authorization } =  req.headers //Aquí se obtiene el valor del encabezado 'authorization' de la solicitud
//         const decoded = jwt.verify(authorization, SECRET_KEY) // Si el token es válido, la función devuelve un objeto decoded
//         console.log(decoded) // aui se imprime el token decodificado

//         const ressidente  = await Resident.getById(1)
//         if(!ressidente.length === 0) return res.status(404).json({ message: 'El token no pertenece a ningun residente registrado'}) 

//         req.resident = ressidente[0]
//         // req.residentId = decoded.residenteId //  se accede a la propiedad residenteId del objeto decoded, que contiene el ID único del residente
//         // Esto significa que ahora la solicitud (req) lleva asociada la información del residente que ha sido autenticado.
//         next()
        
//     } catch (error) {

//         if (error instanceof jwt.TokenExpiredError)
//             return res.status(400).json({ message: 'Token expirado'}) 
//         res.status(500).json({ message: error.message })
//     }

// }