import { connection } from "./Connection.mjs";

export class ModelsUsers{
    static async getLogin({user}){
        // Se verifica si existen tal usuario en la DB
        const {id_user} = user;
        const [userDB] = await connection.query('SELECT * FROM login_users WHERE id_user = ?', [id_user]);
        if(userDB.length > 0){
            console.log('Usuario encontrado');
            return userDB[0];
        }
        else{
            console.log('Usuario no encontrado');
            return null;
        }
    }
    static async getRegister({user}){
        const {name_user, email_user, password_user, username} = user;
        if(!name_user || !email_user || !password_user || !username) return null;
        // Se verifica si ya existe un usuario con ese email
        const [existingUser] = await connection.query('SELECT * FROM user_register WHERE email_user = ?', [email_user]);
        if(existingUser.length > 0){
            console.log('El email ya está registrado');
            return null;
        }
        else{
            const [createUser] = await connection.query('INSERT INTO user_register (name_user, email_user, password_user, username) VALUES (?, ?, ?, ?)', [name_user, email_user, password_user, username]);
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