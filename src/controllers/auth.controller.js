import { SECRET_KEY } from "../config/config.js";
import Resident from "../models/Residente.js";
import jwt from 'jsonwebtoken'
import { compare } from "bcrypt";


export const login = async (req, res) => {
    try {
        const {usernameOrEmail, password} = req.body

        const residente =  await Resident.getByUsernameOrEmail(usernameOrEmail)

        if(residente.length === 0) return res.status(404).json({ message: 'El residente no existe'})
        // aqui se utiliza un valor booleano para saber si es v o f, cuando compara el pasword con sus hash
        const esValido = await compare(password, residente[0].password)
        if (!esValido) return res.status(404).json({ message: 'Credenciales invalidas'})

        const token = jwt.sign({ residenteId: residente[0].id }, SECRET_KEY, {expiresIn: '1h'})
        res.json({ token })
    } catch (error) {
        return res.status(500).json({ message: error.message}) 
    }
}

export const me = async(req, res) => {
    delete req.resident.password // aqui quitamos el passqord a devolver por seguridad
    // esta funcion jala req.resident del authcontroller, que posse la imfo del usuario logeado 
    res.json(req.resident)
    
}
