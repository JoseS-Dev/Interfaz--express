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

    // Obtener a todos los usuarios
    static async getAllUsers(){
        const [users] = await connection.query('SELECT * FROM user_register');
        if(users.length > 0){
            console.log("Usuaurios obtenidos");
            return users;
        }
        else{
            console.log("No hay usuarios registrados");
            return [];
        }
    }

    // Obtener a un usuario por su ID
    static async getUserByID({id_user}){
        if(id_user){
            const [userID] = await connection.query("SELECT * FROM user_register WHERE id_user = ?", [id_user]);
            if(userID.length > 0){
                console.log("Usuario encontrado con el ID solicitado");
                return userID;
            }
            else{
                console.log("Usuario no encontrado");
                return null;
            }
        }
    }

    // Obtener a un usuario por su email
    static async getUserByEmail({ email_user }){
        if(email_user){
            const [userEmail] = await connection.query("SELECT * FROM user_register WHERE email_user LIKE ?", [`%${email_user}%`]);
            if(userEmail.length > 0){
                console.log("Usuario encontrado con el email solicitado");
                return userEmail[0];
            }
            else{
                console.log("Usuario no encontrado");
                return null;
            }
        }
    }

    // Obtener a un usuario por su username
    static async getUserByUsername({ username }){
        if(username){
            const [userUsername] = await connection.query("SELECT * FROM user_register WHERE username = ?", [username]);
            if(userUsername.length > 0){
                console.log("Usuario encontrado con el username solicitado");
                return userUsername[0];
            }
            else{
                console.log("Usuario no encontrado");
                return null;
            }
        }
    }

    // Actualizar un usuario
    static async updateUser({id_user, user}){
        if(!id_user || !user) return null;
        const {name_user, email_user, password_user, username} = user;
        // Se verifica si existe un usuario con ese ID
        const [existingUser] = await connection.query('SELECT * FROM user_register WHERE id_user = ?', [id_user]);
        if(existingUser.length > 0){
            const hashedPassword = password_user ? await bcrypt.hash(password_user, 10) : existingUser[0].password_user;
            const [updateUser] = await connection.query('UPDATE user_register SET name_user = ?, email_user = ?, password_user = ?, username = ? WHERE id_user = ?', [name_user, email_user, hashedPassword, username, id_user]);
            if(updateUser.affectedRows > 0){
                console.log('Usuario actualizado');
                return updateUser;
            }
            else{
                console.log('Error al actualizar el usuario');
                return null;
            }
        }
    }
}