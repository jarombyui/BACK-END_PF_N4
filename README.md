Resident = la clase que encapsula a varias funciones, src/models/Resident
ejm:
Resident.getById(decoded.residenteId)

constante que recibe la busqueda por id en auth.controller.js
const residente =  await Resident.getByUsernameOrEmail(usernameOrEmail)

constante que recibe la busqueda por id en auth.middleware.js
const ressidente  = await Resident.getById(decoded.residenteId)

request que recibe el valor del id en auth.middleware.js / recibe la imfo del useario logeado
req.resident = ressidente


