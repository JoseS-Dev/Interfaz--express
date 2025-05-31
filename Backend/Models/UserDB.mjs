import { connection } from "./db/Connection.mjs";
import bcrypt from 'bcrypt';

export class ModelsUsers{
    static async Login({user}){
        const {email_user, password_user} = user;
        if(!email_user || !password_user) return null;
        // Se verifica si existe un usuario con ese email y contraseña
        const [userQuery] = await connection.query('SELECT * FROM user_register WHERE email_user = ?', [email_user]);
        if(userQuery.length > 0){
            const userDB = userQuery[0];
            // Se verifica si la contraseña es correcta
            const isPasswordValid = await bcrypt.compare(password_user, userDB.password_user);
            if(isPasswordValid){
                console.log('Usuario logueado');
                // Se guarda el usuario loguado en el servidor
                const {id_user} = userDB;
                const [login] = await connection.query('INSERT INTO login_user (id_user) VALUES (?)', [id_user]);
                return userDB;
            }
            else{
                console.log('Contraseña incorrecta');
                return null;
            }
        }
    }
    static async Register({user}){
        const {name_user, email_user, password_user, username} = user;
        if(!name_user || !email_user || !password_user || !username) return null;
        // Se verifica si ya existe un usuario con ese email
        const [existingUser] = await connection.query('SELECT * FROM user_register WHERE email_user = ?', [email_user]);
        if(existingUser.length > 0){
            console.log('El email ya está registrado');
            return null;
        }
        else{
            const hashedPassword = await bcrypt.hash(password_user, 10);
            const [createUser] = await connection.query('INSERT INTO user_register (name_user, email_user, password_user, username) VALUES (?, ?, ?, ?)', [name_user, email_user, hashedPassword, username]);
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

    // Cerrar sesion
    static async getLogout({user}){
        const {email_user} = user;
        // Se verifica si existe un usuario con ese email
        const [userQuery] = await connection.query('SELECT * FROM user_register WHERE email_user = ?', [email_user]);
        if(userQuery.length > 0){
            const userDB = userQuery[0];
            // Se elimina el usuario logueado de la tabla login_user
            const [logout] = await connection.query('DELETE FROM login_user WHERE id_user = ?', [userDB.id_user]);
            if(logout.affectedRows > 0){
                console.log('Usuario deslogueado');
                return userDB;
            }
            else{
                console.log('Error al desloguear el usuario');
                return null;
            }
        }
        else{
            console.log('Usuario no encontrado');
            return null;
        }
    }
}