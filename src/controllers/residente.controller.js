import Resident from "../models/Residente.js";



export const all = async (req, res) => {
  try {
    const residentes = await Resident.all();
    res.json(residentes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const find = async (req, res) => {
  try {
    const { id } = req.params;
    const residenteById = await Resident.getById(id); // esta funcion recibe Id por que lo buscara por id

    if (residenteById.length === 0) {
      return res.status(404).json({ message: "Residente no encontrado" });
    }
    res.json(residenteById);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const store = async (req, res) => {
  try {
    const { fname, mname, lname, username, email, telephone, department, password, role } = req.body;
    if (!fname || !username || !email || !password || !role)
      return res.status(400).json({ message: "Faltan datos " });

    const nuevoResident = await Resident.create({
      fname,
      username,
      email,
      password,
      role,
      mname: mname ?? null,
      lname: lname ?? null,
      telephone: telephone ?? null,
      department: department ?? null
    })

    if(nuevoResident[0].affectedRows === 1) return res.json({message: 'Residente registrado'})

    console.log(nuevoResident)

  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}




