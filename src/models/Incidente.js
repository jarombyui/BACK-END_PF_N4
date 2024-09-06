import { pool } from "../config/db.js";

class Incident {
    static async all() {
        try {
          const [rows] = await pool.execute('SELECT * FROM incidents');
          return rows;
        } catch (error) {
          throw new Error('Error fetching incidents: ' + error.message);
        }
      }

    static async getById(id) {
        const incidente = await pool.execute('SELECT * FROM incidents WHERE id_incident = ?', [id]);
        return incidente[0];
    }

    static async where(campo, valor) {
        const incidente = await pool.execute(`SELECT * FROM incidents WHERE ${campo} = ?`, [valor]);
        return incidente[0];
    }

    static async create({ incident_type, descripcion, location, image_url, status, reported_by, reported_at }) {
        // Campos obligatorios
        const campos = ['incident_type', 'descripcion'];
        const values = [incident_type, descripcion];

        // Campos opcionales
        if (location) {
            campos.push('location');
            values.push(location);
        }

        if (image_url) {
            campos.push('image_url');
            values.push(image_url);
        }

        if (status) {
            campos.push('status');
            values.push(status);
        }

        if (reported_by) {
            campos.push('reported_by');
            values.push(reported_by);
        }

        if (reported_at) {
            campos.push('reported_at');
            values.push(reported_at);
        }

        const camposString = campos.join(', ');
        const placeholders = values.map(() => '?').join(', ');

        const nuevoIncident = await pool.execute(`INSERT INTO incidents (${camposString}) VALUES (${placeholders})`, values);

        return nuevoIncident;
    }

    // Buscar incidentes por tipo de incidente o descripción
    static async getByIncidentTypeOrDescription(valor) {
        const incidente = await pool.execute(`SELECT * FROM incidents WHERE incident_type = ? OR descripcion = ?`, [valor, valor]);
        return incidente[0];
    }

    /// AÑADI PARA TRAER INC X USUARIO

    static async getByUsuarioId(usuarioId) {
        const [incidentes] = await pool.execute('SELECT * FROM incidents WHERE usuario_id = ?', [usuarioId]);
        return incidentes;
    }

    static async getByIdUs(id) {
        const [incidente] = await pool.execute('SELECT * FROM incidents WHERE id = ?', [id]);
        return incidente;
    }


}

export default Incident;
