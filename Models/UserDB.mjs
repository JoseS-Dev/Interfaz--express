import { connection } from "./Connection.mjs";

export class ModelsUsers{
    static async getLogin({id}){
        if(!email || !password) return null;
        // Se verifica si existen tal usuario en la DB
        const [user] = await connection.query('SELECT * FROM Login_user WHERE id_user = ?', [id]);
        if(user.affectedRows > 0){
            console.log('Usuario encontrado');
            return user[0];
        }
        else{
            console.log('Usuario no encontrado');
            return null;
        }
    }
    static async getRegister({user}){
        const {name, email, password, username} = user;
        if(!name || !email || !password || !username) return null;
        // Se verifica si ya existe un usuario con ese email
        const [existingUser] = await connection.query('SELECT * FROM users WHERE email = ?', [email]);
        if(existingUser.length > 0){
            console.log('El email ya está registrado');
            return null;
        }
        else{
            const [createUser] = await connection.query('INSERT INTO users (name, email, password, username) VALUES (?, ?, ?, ?)', [name, email, password, username]);
            if(createUser.affectedRows > 0){
                console.log('Usuario creado');
                return createUser;
            }
            else{
                console.log('Error al crear el usuario');
                return null;
            }
        }
    }
}