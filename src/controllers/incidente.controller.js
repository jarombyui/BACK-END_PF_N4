import Incident from "../models/Incidente.js";

export const all = async (req, res) => {
  try {
    const incidentes = await Incident.all();
    res.json(incidentes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const find = async (req, res) => {
  try {
    const { id } = req.params;
    const incidenteById = await Incident.getById(id);

    if (incidenteById.length === 0) {
      return res.status(404).json({ message: "Incidente no encontrado" });
    }
    res.json(incidenteById);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const store = async (req, res) => {
  try {
    const { incident_type, descripcion, location, image, status, reported_by, reported_at } = req.body;
    
    // Verificación de campos obligatorios
    if (!incident_type || !descripcion || !location || !reported_by) {
      return res.status(400).json({ message: "Faltan datos obligatorios (tipo de incidente, descripción, location)" });
    }

    // Creación del nuevo incidente
    const nuevoIncident = await Incident.create({
      incident_type,
      descripcion,
      location,
      reported_by,
      image: image ?? null,
      status: status ?? null,
      reported_at: reported_at ?? null
    });

    if (nuevoIncident[0].affectedRows === 1) {
      return res.json({ message: 'Incidente registrado' });
    }

    console.log(nuevoIncident);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const update = async (req, res) => {
  try {
    const { id } = req.params;
    const { incident_type, descripcion, location, image, status, reported_by, reported_at } = req.body;

    // Verificación de campos obligatorios
    if (!incident_type || !descripcion || !location || !reported_by) {
      return res.status(400).json({ message: "Faltan datos obligatorios (tipo de incidente, descripción, ubicación)" });
    }

    // Actualización del incidente
    const updatedIncident = await Incident.updateById(id, {
      incident_type,
      descripcion,
      location,
      image: image ?? null,
      status: status ?? null,
      reported_by,
      reported_at: reported_at ?? null
    });

    if (updatedIncident.affectedRows === 1) {
      return res.json({ message: "Incidente actualizado correctamente" });
    } else {
      return res.status(404).json({ message: "Incidente no encontrado" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updatePartial = async (req, res) => {
  try {
    const { id } = req.params;
    const fieldsToUpdate = req.body; // Los campos que el usuario desea actualizar

    if (Object.keys(fieldsToUpdate).length === 0) {
      return res.status(400).json({ message: "No hay datos para actualizar" });
    }

    // Actualización parcial del incidente
    const updatedIncident = await Incident.updatePartialById(id, fieldsToUpdate);

    if (updatedIncident.affectedRows === 1) {
      return res.json({ message: "Incidente actualizado parcialmente" });
    } else {
      return res.status(404).json({ message: "Incidente no encontrado" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const remove = async (req, res) => {
  try {
    const { id } = req.params;

    // Eliminación del incidente
    const deletedIncident = await Incident.deleteById(id);

    if (deletedIncident.affectedRows === 1) {
      return res.json({ message: "Incidente eliminado correctamente" });
    } else {
      return res.status(404).json({ message: "Incidente no encontrado" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



