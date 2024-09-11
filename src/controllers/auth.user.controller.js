import { compare } from "bcrypt"
import jwt from "jsonwebtoken"
import { UserModel } from "../models/userModel.js"
import { SECRET_KEY } from "../config/config.js"


export const authUser = async (req, res) => {
    const { email, password } = req.body

    const user = await UserModel.userLogin(email)
    if (user.length === 0) return res.status(400).json({ message: 'Email no registrado' })

    const validacion = await compare(password, user[0].password)
    if (!validacion) return res.status(400).json({ message: 'Credenciales incorrectas' })
    const authtoken = jwt.sign({ userId: user[0].id }, SECRET_KEY, { expiresIn: '1h' })
    console.log(authtoken);
    delete user[0].password
    res.json({
        authtoken,
        user: user[0]
    })

}

