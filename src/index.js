import express from 'express'
import morgan from 'morgan'
import { PORT } from './config/config.js'
import routerUser from './Routes/user.routes.js'
import routerIncident from './Routes/incident.routes.js'
import routerAuth from './Routes/auth.routes.js'
import { validCors } from './middleware/validCords.js'

const app= express()
app.use(morgan('dev'))
app.use(express.json())
app.use(validCors)

app.use('/api/auth',routerAuth)
app.use('/api/user',routerUser)
app.use('/api/incident',routerIncident)

app.use('*', (req, res) => res.status(404).send('La ruta no existe'))

app.listen(PORT, () => console.log(`Servidor ejecutandose http://localhost:${PORT}`))
