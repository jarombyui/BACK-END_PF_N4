import Usuario from "../models/Usuario.js";
import bcrypt from 'bcrypt';

export const all = async (req, res) => {
  try {
    const usuarios = await Usuario.all();
    res.json(usuarios);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const find = async (req, res) => {
  try {
    const { id } = req.params;
    const usuarioById = await Usuario.getById(id); // Buscar usuario por ID

    if (usuarioById.length === 0) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }
    res.json(usuarioById);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const store = async (req, res) => {
  try {
    const { fname, mname, lname, username, email, telephone, department, password, role } = req.body;
    
    // Verificar si los campos obligatorios están presentes
    if (!fname || !username || !email || !password || !role)
      return res.status(400).json({ message: "Faltan datos obligatorios" });

    // Crear nuevo usuario
    const nuevoUsuario = await Usuario.create({
      fname,
      username,
      email,
      password,
      role,
      mname: mname ?? null,
      lname: lname ?? null,
      telephone: telephone ?? null,
      department: department ?? null
    });

    if (nuevoUsuario[0].affectedRows === 1) {
      return res.json({ message: 'Usuario registrado exitosamente' });
    }

    console.log(nuevoUsuario);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const update = async (req, res) => {
  try {
    const { id } = req.params;
    const { fname, mname, lname, username, email, telephone, department, password, role } = req.body;

    // Verificar si los campos obligatorios están presentes
    if (!fname || !username || !email || !password || !role) {
      return res.status(400).json({ message: "Faltan datos obligatorios" });
    }

    const usuarioExistente = await Usuario.getById(id);

    if (usuarioExistente.length === 0) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    // Encriptar la contraseña
    const salt = await bcrypt.genSalt(10);
    const passwordEncriptado = await bcrypt.hash(password, salt);

    // Actualizar usuario
    const usuarioActualizado = await Usuario.update(id, {
      fname,
      username,
      email,
      password: passwordEncriptado,// En este caso, deberías encriptar la nueva contraseña si es necesario
      role,
      mname: mname ?? null,
      lname: lname ?? null,
      telephone: telephone ?? null,
      department: department ?? null
    });

    if (usuarioActualizado[0].affectedRows === 1) {
      return res.json({ message: 'Usuario actualizado exitosamente' });
    }

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const updatePartial = async (req, res) => {
  try {
    const { id } = req.params;
    const { fname, mname, lname, username, email, telephone, department, password, role } = req.body;

    const usuarioExistente = await Usuario.getById(id);

    if (usuarioExistente.length === 0) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    // Se actualizan solo los campos proporcionados
    const usuarioActualizado = await Usuario.updatePartial(id, {
      fname: fname ?? usuarioExistente[0].f_name,
      mname: mname ?? usuarioExistente[0].m_name,
      lname: lname ?? usuarioExistente[0].l_name,
      username: username ?? usuarioExistente[0].username,
      email: email ?? usuarioExistente[0].email,
      telephone: telephone ?? usuarioExistente[0].telephone,
      department: department ?? usuarioExistente[0].department,
      password: password ? await bcrypt.hash(password, 10) : usuarioExistente[0].password, // Encriptar si es nueva contraseña
      role: role ?? usuarioExistente[0].role
    });

    if (usuarioActualizado[0].affectedRows === 1) {
      return res.json({ message: 'Usuario actualizado parcialmente' });
    }

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const remove = async (req, res) => {
  try {
    const { id } = req.params;

    const usuarioExistente = await Usuario.getById(id);

    if (usuarioExistente.length === 0) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    // Eliminar el usuario
    const usuarioEliminado = await Usuario.remove(id);

    if (usuarioEliminado[0].affectedRows === 1) {
      return res.json({ message: 'Usuario eliminado exitosamente' });
    }

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};





// import Resident from "../models/Usuario.js";



// export const all = async (req, res) => {
//   try {
//     const residentes = await Resident.all();
//     res.json(residentes);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// export const find = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const residenteById = await Resident.getById(id); // esta funcion recibe Id por que lo buscara por id

//     if (residenteById.length === 0) {
//       return res.status(404).json({ message: "Residente no encontrado" });
//     }
//     res.json(residenteById);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// export const store = async (req, res) => {
//   try {
//     const { fname, mname, lname, username, email, telephone, department, password, role } = req.body;
//     if (!fname || !username || !email || !password || !role)
//       return res.status(400).json({ message: "Faltan datos " });

//     const nuevoResident = await Resident.create({
//       fname,
//       username,
//       email,
//       password,
//       role,
//       mname: mname ?? null,
//       lname: lname ?? null,
//       telephone: telephone ?? null,
//       department: department ?? null
//     })

//     if(nuevoResident[0].affectedRows === 1) return res.json({message: 'Residente registrado'})

//     console.log(nuevoResident)

//   } catch (error) {
//     res.status(500).json({ message: error.message })
//   }
// }




