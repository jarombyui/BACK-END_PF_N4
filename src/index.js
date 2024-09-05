import express from 'express'
import { PORT } from './config/config.js' // el .js es vital
import residentRoutes from './routes/residente.routes.js'
import authRoutes from './routes/auth.routes.js'
import cors from 'cors'



const app = express()
app.use(express.json())
app.use(cors())

app.use('/api/users', residentRoutes)
app.use('/api/auth', authRoutes)

app.listen(PORT, () => console.log(`Servidor corriendo en http://localhost:${PORT}`))