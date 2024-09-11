import { pool } from "../config/db.js";

export class IncidentModel {

    static async incdAll() {
        const [rows] = await pool.execute('SELECT * FROM incidencia');
        return rows;
    }
    
    static async incdId(id) {
        const [rows] = await pool.execute('SELECT * FROM incidencia WHERE id = ?', [id]);
        return rows[0];
    }

    static async incdCreate({ usuario_id, asunto, descripcion, tipo, estado }) {
        const sql = 'INSERT INTO incidencia (usuario_id, asunto, descripcion, tipo, estado) VALUES (?, ?, ?, ?, ?)';
        const values = [usuario_id, asunto, descripcion, tipo, estado];
        const [result] = await pool.execute(sql, values);
        return result;
    }

    static async incdUpdate({ asunto, descripcion, tipo, estado, id }) {
        const updates = [];
        const values = [];

        if (asunto) {
            updates.push('asunto = ?');
            values.push(asunto);
        }

        if (descripcion) {
            updates.push('descripcion = ?');
            values.push(descripcion);
        }

        if (tipo) {
            updates.push('tipo = ?');
            values.push(tipo);
        }

        if (estado) {
            updates.push('estado = ?');
            values.push(estado);
        }

        if (id) {
            values.push(id);
        }

        const sql = `UPDATE incidencia SET ${updates.join(', ')} WHERE id = ?`;
        const [result] = await pool.execute(sql, values);
        return result;
    }

    static async incdFrUs(id) {
        const [rows] = await pool.execute('SELECT * FROM incidencia WHERE usuario_id = ?', [id]);
        return rows;
    }

    static async incdDel(id) {
        const [result] = await pool.execute('DELETE FROM incidencia WHERE id = ?', [id]);
        return result;
    }
}
