import { pool } from "../config/db.js";
import bcrypt, { hash } from "bcrypt";

class Usuario {
    static async all() {
        const usuarios = await pool.execute('SELECT * FROM users');
        return usuarios[0];
    }

    static async getById(id) {
        const usuario = await pool.execute('SELECT * FROM users WHERE id = ?', [id]);
        return usuario[0];
    }

    static async where(campo, valor) {
        const usuario = await pool.execute(`SELECT * FROM users WHERE ${campo} = ?`, [valor]);
        return usuario[0];
    }

    static async create({ fname, mname, lname, username, email, telephone, department, password, role }) {
        const passwordEncriptado = await hash(password, 10); // Encriptamos la contraseña

        // Campos obligatorios
        const campos = ['f_name', 'username', 'email', 'password', 'role'];
        const values = [fname, username, email, passwordEncriptado, role];

        // Campos opcionales
        if (mname) {
            campos.push('m_name');
            values.push(mname);
        }

        if (lname) {
            campos.push('l_name');
            values.push(lname);
        }

        if (telephone) {
            campos.push('telephone');
            values.push(telephone);
        }

        if (department) {
            campos.push('department');
            values.push(department);
        }

        const camposString = campos.join(', ');
        const placeholders = values.map(() => '?').join(', ');

        const nuevoUsuario = await pool.execute(`INSERT INTO users (${camposString}) VALUES (${placeholders})`, values);

        return nuevoUsuario;
    }

    // Esta función busca un usuario por username o email, permitiendo iniciar sesión con cualquiera
    static async getByUsernameOrEmail(valor) {
        const usuario = await pool.execute(`SELECT * FROM users WHERE email = ? OR username = ?`, [valor, valor]);
        return usuario[0];
    }


    static async update(id, { fname, mname, lname, username, email, telephone, department, password, role }) {
        const query = `UPDATE users SET f_name = ?, m_name = ?, l_name = ?, username = ?, email = ?, telephone = ?, department = ?, password = ?, role = ? WHERE id = ?`;
        const values = [fname, mname, lname, username, email, telephone, department, password, role, id];
        return pool.execute(query, values);
      }
    
      ////// AÑADIDO
      static async updatePartial(id, campos) {
        // Encriptar la contraseña si se proporciona
        if (campos.password) {
            const salt = await bcrypt.genSalt(10);
            campos.password = await bcrypt.hash(campos.password, salt);
        }

        const updates = Object.keys(campos).map(campo => `${campo} = ?`).join(', ');
        const values = Object.values(campos);
        values.push(id); // Añadir ID al final para la condición WHERE
        const query = `UPDATE users SET ${updates} WHERE id = ?`;
        return pool.execute(query, values);
    }


    //   static async updatePartial(id, campos) {
    //     const updates = Object.keys(campos).map(campo => `${campo} = ?`).join(', ');
    //     const values = Object.values(campos);
    //     values.push(id); // Añadir ID al final para la condición WHERE
    //     const query = `UPDATE users SET ${updates} WHERE id = ?`;
    //     return pool.execute(query, values);
    //   }
    
      static async remove(id) {
        return pool.execute(`DELETE FROM users WHERE id = ?`, [id]);
      }

}

export default Usuario;




