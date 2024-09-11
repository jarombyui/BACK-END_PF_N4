import jwt from 'jsonwebtoken'
import { SECRET_KEY } from '../config/config.js'
import { UserModel } from '../models/userModel.js'

export const verifyToken = async (req, res, next) => {
    try {
        const { authorization } = req.headers
        const decoded = jwt.verify(authorization, SECRET_KEY)
        const user = await UserModel.userId(decoded.userId)
        if (user.length === 0) return res.status(404).json({ message: 'El token es incorrecto' })
        delete user[0].password
        req.user = user[0]
        next()
    } catch (error) {
        if (error instanceof jwt.TokenExpiredError) { return res.status(400).json({ message: 'Token expirado' }) }
        res.status(500).json({ message: error.message })
    }
}

export const infoUser = async (req, res) => {
    res.json(req.user)
}