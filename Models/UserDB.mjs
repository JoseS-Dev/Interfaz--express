import { connection } from "./Connection.mjs";
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
}