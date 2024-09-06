import { SECRET_KEY } from "../config/config.js";
import jwt from 'jsonwebtoken';
import Incidente from "../models/Incidente.js"; // Suponemos que tienes un modelo Incidente
import Usuario from "../models/Usuario.js";

export const verificarTokenYIncidente = async (req, res, next) => {
    try {
        const { authorization } = req.headers;

        if (!authorization) {
            return res.status(401).json({ message: 'No se proporcionó token de autenticación' });
        }
        // Verificar el token
        const decoded = jwt.verify(authorization, SECRET_KEY);

        // Obtener el ID del usuario autenticado desde el token
        const usuario = await Usuario.getById(decoded.usuarioId);

        if (usuario.length === 0) {
            return res.status(404).json({ message: 'El token no pertenece a ningún usuario registrado' });
        }

        // Asociar el usuario autenticado a la solicitud
        req.usuario = usuario[0];
        // Agregar una verificación de rol de administrador aquí
        if (req.usuario.role === 'admin') {
            // Si es administrador, continuar con la siguiente función de middleware sin verificar propiedad del incidente
            return next();
        }

        // Si se está accediendo a un incidente específico, verificar que pertenezca al usuario
        const { id } = req.params; // Obtener el ID del incidente desde los parámetros de la URL

        if (id) {
            const incidente = await Incidente.getById(id);

            if (incidente.length === 0) {
                return res.status(404).json({ message: 'Incidente no encontrado' });
            }

            // Verificar que el incidente pertenece al usuario autenticado
            if (incidente[0].usuario_id !== req.usuario.id) {
                return res.status(403).json({ message: 'No tienes permiso para acceder a este incidente' });
            }
        }

        // Continuar con la siguiente función de middleware
        next();
    } catch (error) {
        if (error instanceof jwt.TokenExpiredError) {
            return res.status(400).json({ message: 'Token expirado' });
        }
        res.status(500).json({ message: error.message });
    }

    /// para traer incidente del usuario

};
