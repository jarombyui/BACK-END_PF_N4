import path from "node:path";
import { pool } from "../config/db.js";
import { IncidentModel } from "../models/incidentModel.js";
import fs from 'node:fs/promises'

export const incidentId = async (req, res) => {
    try {
        const { id } = req.params
        const incId = await IncidentModel.incdId(id)
        if (incId.length === 0) return res.status(400).json({ message: 'No se encontro incidente' })
        res.status(200).json(incId);
    } catch (error) {
        res.status(500).json({ message: error.message })
    }

}

export const incidentAll = async (req, res) => {
    try {
        const inci = await IncidentModel.incdAll()
        if (inci.length === 0) return res.status(400).json({ message: 'No hay incidentes' })
        res.status(200).json(inci);
    } catch (error) {
        res.status(500).json({ message: error.message })
    }

}

export const incidentCreate = async (req, res) => {
    try {
        const { usuario_id, asunto, descripcion, tipo,  estado } = req.body
        const image= req.file ? req.file.filename : ''
        console.log({photo:image}) // referencie photo con image, // photo viene del request del form.
        if (usuario_id && asunto && descripcion && tipo && estado) {
            const incinew = await IncidentModel.incdCreate({ usuario_id, asunto, descripcion, tipo,  estado, image }) // añadi el campo image
            if (incinew.affectedRows === 1) return res.status(200).json({ message: 'Se ha creado el incidente' })
            if (incinew.affectedRows === 0) return res.status(400).json({ message: 'Error al crear el incidente' })
        }

        res.status(400).json({ message: 'Faltan datos para notificar el incidente' })

    } catch (error) {
        res.status(500).json({ message: error.message })
    }

}

export const incidenUpdate = async (req, res) => {
    try {
        const { asunto, descripcion, tipo, estado, fecha_creacion } = req.body
        const { id } = req.params

        if (asunto || descripcion || tipo || estado || fecha_creacion || id) {
            const incinew = await IncidentModel.incdUpdate({ asunto, descripcion, tipo, estado, fecha_creacion, id })
            if (incinew.affectedRows === 1) return res.status(200).json({ message: 'Incidente actualizado con exito' })
            if (incinew.affectedRows === 0) return res.status(400).json({ message: 'Error al actualizar el incidente' })
        }

        res.status(400).json({ message: 'Faltan datos relevantes' })

    } catch (error) {
        res.status(500).json({ message: error.message })
    }

}
export const incidentFromUs = async (req, res) => {
    try {
        const { id } = req.params
        const incfrUs = await IncidentModel.incdFrUs(id)
        if (incfrUs.length === 0) return res.status(400).json({ message: 'No hay incidentes para este usuario' })
        res.status(200).json(incfrUs);
    } catch (error) {
        res.status(500).json({ message: error.message })
    }

}

export const incidentDelete = async (req, res) => {
    try {
        const { id } = req.params
        const incIdDel = await IncidentModel.incdDel(id)
        if (incIdDel.affectedRows === 1) return res.status(200).json({ message: 'Incidente eliminado con exito' })
        if (incIdDel.affectedRows === 0) return res.status(400).json({ message: 'Error al eliminar el incidente' })

    } catch (error) {
        res.status(500).json({ message: error.message })
    }

}
