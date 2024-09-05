import { pool } from "../config/db.js";
import { hash } from "bcrypt";

class Resident {
    static async all (){
        const residentes = await pool.execute('SELECT * FROM users')
        return residentes[0]
    }

    static async getById (id){
        const residente = await pool.execute('SELECT * FROM users WHERE id = ?', [id])
        return residente[0]
    }

    static async where (campo, valor){
        
        const residente = await pool.execute(`SELECT * FROM users WHERE ${campo} = ?`, [valor])
        return residente[0]
    }

    static async create ({ fname, mname, lname, username, email, telephone, department, password, role }){ // fname/ username/ email /password = obligatorios
        const encryptado = await hash( password, 10) // con esto encriptamos el password
        
        // estos son los campos obligatorios
        const campos = ['f_name', 'username', 'email', 'password', 'role' ]
        const values = [fname, username, email, encryptado, role ] // aqui ya hacemos uso del password encriptado  
        
        if (mname) {
            campos.push('m_name')
            values.push(mname)
        }

        if (lname) {
            campos.push('l_name')
            values.push(lname)
        }

        if (telephone) {
            campos.push('telephone')
            values.push(telephone)
        }

        if (department) {
            campos.push('department')
            values.push(department)
        }

        const camposString = campos.join(', ')
        const placeholders = values.map(()=> '?').join(', ')

        const nuevoResident = await pool.execute(`INSERT INTO  users (${camposString}) VALUES (${placeholders})`, values)

        return nuevoResident
    }

    // esta funcion busca en la bd por username o email, permite logear por cualquiera
    static async getByUsernameOrEmail(valor){
        const residente = await pool.execute(`SELECT * FROM users WHERE email = ? OR username = ?`, [valor, valor])
        return residente[0]
    }
    
}

export default Resident