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
                await connection.query('INSERT INTO login_user (id_user) VALUES (?)', [id_user]);
                return userDB;
            }
            else{
                console.log('Contraseña incorrecta');
                return null;
            }
        }
    }
    static async Register({user}){
        const {
            name_user, maiden_name_user, email_user, password_user, username,
            age_user, phone_user, birth_date_user, image_user, blood_type_user,
            height_user, weight_user, eye_color_user, ip_user, mac_address_user,
            university_user, ein_user, ssn_user, user_agent_user, role_user,
            street_address, city_address, state_address, state_code_address,
            postal_code_address, latitude_address, longitude_address, country_address,
            card_expire_user, card_number_user, card_type_user, currency_user,
            iban_user, department_company_user, company_name_user, company_title_user,
            company_street_user, company_city_user, company_state_user, company_state_code_user,
            company_postal_code_user, company_latitude_user, company_longitude_user,
            company_country_user, coin_user, wallet_address_user, network_user

        } = user;
        if(!name_user || !email_user || !password_user || !username) return null;
        // Se verifica si ya existe un usuario con ese email
        const [existingUser] = await connection.query('SELECT * FROM user_register WHERE email_user = ?', [email_user]);
        if(existingUser.length > 0){
            console.log('El email ya está registrado');
            return null;
        }
        else{
            const hashedPassword = await bcrypt.hash(password_user, 10);
            const [createUser] = await connection.query(
                `
                INSERT INTO user_register (name_user,maiden_name_user, email_user, password_user, username) 
                VALUES (?, ?, ?, ?, ?)
                `, 
                [name_user,maiden_name_user, email_user, hashedPassword, username]);
            if(createUser.affectedRows > 0){
                console.log("Registro Existoso");
                // Se guarda los datos adicionales del usuario en la tabla info_user
                const userID = createUser.insertId;
                const [ InfoUser ] = await connection.query(
                    `INSERT INTO info_user 
                    (id_user,age_user,phone_user,birth_date_user,image_user,blood_type_user,
                    height_user,weight_user,eye_color_user,ip_user,mac_address_user,
                    university_user,ein_user,ssn_user,user_agent_user,role_user) 
                    VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
                    [
                        userID, age_user, phone_user, birth_date_user, image_user, blood_type_user,
                        height_user, weight_user, eye_color_user, ip_user, mac_address_user,
                        university_user, ein_user, ssn_user, user_agent_user, role_user

                    ]
                )
                console.log("Datos personales del usuario guardados");
                // Se guarda la direccion del usuario en la tabla address_user
                const[ addressUser ] = await connection.query(
                    `INSERT INTO address_user 
                    (id_user,street_address,city_address,state_address,state_code_address,
                    postal_code_address,latitude_address,longitude_address,country_address) 
                    VALUES (?,?,?,?,?,?,?,?,?)`,
                    [
                        userID, street_address, city_address, state_address, state_code_address,
                        postal_code_address, latitude_address, longitude_address, country_address
                    ]
                );
                console.log("Direccion del usuario guardada");
                // Se guarda los datos de la tarjeta del usuario en la tabla bank_info_user
                const[ BankUser ] = await connection.query(
                    `INSERT INTO bank_info_user 
                    (id_user,card_expire_user,card_number_user,card_type_user,currency_user,
                    iban_user) 
                    VALUES (?,?,?,?,?,?)`,
                    [
                        userID, card_expire_user, card_number_user, card_type_user, currency_user,
                        iban_user
                    ]
                )
                console.log("Datos de la tarjeta del usuario guardados");
                // Se guarda los datos de la empresa del usuario en la tabla companies_user
                const[ CompanyUser ] = await connection.query(
                    `INSERT INTO companies_user 
                    (id_user,department_company_user,company_name_user,company_title_user,
                    company_street_user,company_city_user,company_state_user,company_state_code_user,
                    company_postal_code_user,company_latitude_user,company_longitude_user,
                    company_country_user) 
                    VALUES (?,?,?,?,?,?,?,?,?,?,?,?)`,
                    [
                        userID, department_company_user, company_name_user, company_title_user,
                        company_street_user, company_city_user, company_state_user, company_state_code_user,
                        company_postal_code_user, company_latitude_user, company_longitude_user,
                        company_country_user
                    ]
                )
                console.log("Datos de la empresa del usuario guardados");
                // Se guarda los datos de la billetera del usuario en la tabla crypto_wallet_user
                const[cryptoUser] = await connection.query(
                    `INSERT INTO crypto_wallet_user 
                    (id_user,coin_user,wallet_address_user,network_user) 
                    VALUES (?,?,?,?)`,
                    [
                        userID, coin_user, wallet_address_user, network_user
                    ]
                );
                console.log("Datos de la billetera del usuario guardados");
                // Se verifica que se hayan guardado todos los datos
                if(InfoUser.affectedRows > 0 && addressUser.affectedRows > 0 && BankUser.affectedRows > 0 && CompanyUser.affectedRows > 0 && cryptoUser.affectedRows > 0){
                    console.log("Usuario creado con exito");
                    return createUser;
                }
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