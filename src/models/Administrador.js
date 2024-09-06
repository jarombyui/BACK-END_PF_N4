import Administrador from "../models/Administrador.js"; // Asegúrate de tener el modelo Administrador definido

export const all = async (req, res) => {
  try {
    const administradores = await Administrador.all();
    res.json(administradores);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const find = async (req, res) => {
  try {
    const { id } = req.params;
    const administradorById = await Administrador.getById(id); // Buscar administrador por ID

    if (administradorById.length === 0) {
      return res.status(404).json({ message: "Administrador no encontrado" });
    }
    res.json(administradorById);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const store = async (req, res) => {
  try {
    const { fname, lname, username, email, telephone, password, role } = req.body;

    // Verificar si los campos obligatorios están presentes
    if (!fname || !username || !email || !password || !role)
      return res.status(400).json({ message: "Faltan datos obligatorios" });

    // Crear nuevo administrador
    const nuevoAdministrador = await Administrador.create({
      fname,
      lname: lname ?? null,
      username,
      email,
      password,
      role,
      telephone: telephone ?? null,
    });

    if (nuevoAdministrador[0].affectedRows === 1) {
      return res.json({ message: 'Administrador registrado exitosamente' });
    }

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const update = async (req, res) => {
  try {
    const { id } = req.params;
    const { fname, lname, username, email, telephone, password, role } = req.body;

    // Verificar si los campos obligatorios están presentes
    if (!fname || !username || !email || !password || !role) {
      return res.status(400).json({ message: "Faltan datos obligatorios" });
    }

    const administradorExistente = await Administrador.getById(id);

    if (administradorExistente.length === 0) {
      return res.status(404).json({ message: "Administrador no encontrado" });
    }

    // Actualizar administrador
    const administradorActualizado = await Administrador.update(id, {
      fname,
      lname: lname ?? null,
      username,
      email,
      password, // En este caso, encriptar la nueva contraseña si es necesario
      role,
      telephone: telephone ?? null,
    });

    if (administradorActualizado[0].affectedRows === 1) {
      return res.json({ message: 'Administrador actualizado exitosamente' });
    }

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updatePartial = async (req, res) => {
    try {
      const { id } = req.params;
      const { fname, lname, username, email, telephone, password, role } = req.body;
  
      // Buscar el administrador existente por ID
      const administradorExistente = await Administrador.getById(id);
  
      if (administradorExistente.length === 0) {
        return res.status(404).json({ message: "Administrador no encontrado" });
      }
  
      // Actualizar solo los campos proporcionados
      const administradorActualizado = await Administrador.updatePartial(id, {
        fname: fname ?? administradorExistente[0].f_name,
        lname: lname ?? administradorExistente[0].l_name,
        username: username ?? administradorExistente[0].username,
        email: email ?? administradorExistente[0].email,
        telephone: telephone ?? administradorExistente[0].telephone,
        password: password ? await bcrypt.hash(password, 10) : administradorExistente[0].password, // Encriptar la nueva contraseña si es proporcionada
        role: role ?? administradorExistente[0].role,
      });
  
      if (administradorActualizado[0].affectedRows === 1) {
        return res.json({ message: "Administrador actualizado parcialmente" });
      } else {
        return res.status(400).json({ message: "No se pudo actualizar el administrador" });
      }
  
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };


export const remove = async (req, res) => {
  try {
    const { id } = req.params;

    const administradorExistente = await Administrador.getById(id);

    if (administradorExistente.length === 0) {
      return res.status(404).json({ message: "Administrador no encontrado" });
    }

    // Eliminar el administrador
    const administradorEliminado = await Administrador.remove(id);

    if (administradorEliminado[0].affectedRows === 1) {
      return res.json({ message: 'Administrador eliminado exitosamente' });
    }

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
