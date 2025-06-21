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
    static async Register({ user }) {
        const {
            username,
            email_user,
            password_user
        } = user;
    
        // Se verifica que se proporcionen los campos necesarios
        if (!username || !email_user || !password_user) {
            console.log('Faltan campos obligatorios');
            return null;
        }
    
        try {
            // Se verifica si ya existe un usuario con ese email o nombre de usuario
            const [existingUser] = await connection.query(
                'SELECT * FROM user_register WHERE email_user = ? OR username = ?',
                [email_user, username]
            );
    
            if (existingUser.length > 0) {
                console.log('El email o el nombre de usuario ya están registrados');
                return null;
            } else {
                // Se encripta la contraseña
                const hashedPassword = await bcrypt.hash(password_user, 10);
    
                // Se inserta el nuevo usuario en la tabla user_register
                const [createUser] = await connection.query(
                    `
                    INSERT INTO user_register (username, email_user, password_user) 
                    VALUES (?, ?, ?)
                    `,
                    [username, email_user, hashedPassword]
                );
    
                if (createUser.affectedRows > 0) {
                    console.log("Registro Exitoso");
                    // Retorna el resultado de la creación del usuario
                    return createUser;
                } else {
                    console.log('Error al crear el usuario');
                    return null;
                }
            }
        } catch (error) {
            console.error('Error en el registro de usuario:', error);
            return null;
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
        const [users] = await connection.query(
            `SELECT a.*, b.*, c.*, d.*, e.*, f.*
            FROM user_register a 
            JOIN info_user b ON a.id_user = b.id_user
            JOIN address_user c ON a.id_user = c.id_user
            JOIN bank_info_user d ON a.id_user = d.id_user
            JOIN companies_user e ON a.id_user = e.id_user
            JOIN crypto_wallets_user f ON a.id_user = f.id_user
            ORDER BY a.id_user DESC`
        );
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
            const [userID] = await connection.query(
                `SELECT a.name_user, a.maiden_name_user, a.email_user, a.username,
                b.age_user, b.phone_user, b.birth_date_user, b.image_user, b.blood_group_user,
                b.height_user, b.weight_user, b.eye_color_user, b.ip_user, b.mac_address_user,
                b.university_user, b.ein_user, b.ssn_user, b.user_agent_user, b.role_user,
                c.street_address, c.city_address, c.state_address, c.state_code_address,
                c.postal_code_address, c.latitude_address, c.longitude_address, c.country_address,
                d.card_expire_user, d.card_number_user, d.card_type_user, d.currency_user,
                d.iban_user, e.department_company_user, e.company_name_user, e.company_title_user,
                e.company_street_user, e.company_city_user, e.company_state_user, e.company_state_code_user,
                e.company_postal_code_user, e.company_latitude_user, e.company_longitude_user,
                e.company_country_user, f.coin_user, f.wallet_address_user, f.network_user
                FROM user_register a JOIN info_user b ON a.id_user = b.id_user
                JOIN address_user c ON a.id_user = c.id_user
                JOIN bank_info_user d ON a.id_user = d.id_user
                JOIN companies_user e ON a.id_user = e.id_user
                JOIN crypto_wallets_user f ON a.id_user = f.id_user
                WHERE a.id_user = ?`,
                [id_user]
            );
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

    // Obtener un usuario por su rol
    static async getUserByRole({ role_user }){
        if(role_user){
            const [userRole] = await connection.query(
                `SELECT * FROM user_register WHERE role_user = ?`,
                [role_user]
            );
            if(userRole.length > 0){
                console.log("Usuario encontrado con el rol solicitado");
                return userRole;
            }
            else{
                console.log("Usuario no encontrado");
                return null;
            }
        }
    }

    static async updateUser({ id_user, user }) {
        if (!id_user || !user) {
            console.log('ID de usuario o datos de usuario no proporcionados.');
            return null;
        }

        const {
            name_user, maiden_name_user, email_user, password_user, username, role_user,
            // Datos de info_user
            age_user, phone_user, birth_date_user, image_user, blood_group_user,
            height_user, weight_user, eye_color_user, hair_user, ip_user, mac_address_user,
            university_user, ein_user, ssn_user, user_agent_user,
            // Datos de address_user
            street_address, city_address, state_address, state_code_address,
            postal_code_address, latitude_address, longitude_address, country_address,
            // Datos de bank_info_user
            card_expire_user, card_number_user, card_type_user, currency_user, iban_user,
            // Datos de companies_user
            department_company_user, company_name_user, company_title_user,
            company_street_user, company_city_user, company_state_user, company_state_code_user,
            company_postal_code_user, company_latitude_user, company_longitude_user,
            company_country_user,
            // Datos de crypto_wallets_user
            coin_user, wallet_address_user, network_user
        } = user;

        try {
            // Verificar si el usuario principal existe
            const [existingUserRow] = await connection.query('SELECT * FROM user_register WHERE id_user = ?', [id_user]);
            if (existingUserRow.length === 0) {
                console.log(`Usuario con ID ${id_user} no encontrado.`);
                return null;
            }
            const existingUser = existingUserRow[0]; // Obtener el objeto del usuario existente

            // Actualizar user_register (si hay cambios en sus campos)
            let hashedPassword = existingUser.password_user;
            if (password_user) {
                hashedPassword = await bcrypt.hash(password_user, 10);
            }

            const updateFieldsUserRegister = [];
            const updateValuesUserRegister = [];

            // Añadir campos solo si están definidos en el 'user' entrante
            if (username !== undefined) { updateFieldsUserRegister.push('username = ?'); updateValuesUserRegister.push(username); }
            if (email_user !== undefined) { updateFieldsUserRegister.push('email_user = ?'); updateValuesUserRegister.push(email_user); }
            if (password_user !== undefined) { updateFieldsUserRegister.push('password_user = ?'); updateValuesUserRegister.push(hashedPassword); }
            if (name_user !== undefined) { updateFieldsUserRegister.push('name_user = ?'); updateValuesUserRegister.push(name_user); }
            if (maiden_name_user !== undefined) { updateFieldsUserRegister.push('maiden_name_user = ?'); updateValuesUserRegister.push(maiden_name_user); }
            if (role_user !== undefined) { updateFieldsUserRegister.push('role_user = ?'); updateValuesUserRegister.push(role_user); }

            let userRegisterUpdated = false;
            if (updateFieldsUserRegister.length > 0) {
                const [updateResult] = await connection.query(
                    `UPDATE user_register SET ${updateFieldsUserRegister.join(', ')} WHERE id_user = ?`,
                    [...updateValuesUserRegister, id_user]
                );
                userRegisterUpdated = updateResult.affectedRows > 0;
                if (userRegisterUpdated) {
                    console.log(`Registro principal del usuario ${id_user} actualizado.`);
                } else {
                    console.log(`No se realizaron cambios en el registro principal del usuario ${id_user} o ya estaba actualizado.`);
                }
            }


            //Lógica para las tablas secundarias (UPSERT: UPDATE si existe, INSERT si no existe)

            // Función auxiliar para manejar upserts
            const upsertTable = async (tableName, fields, values, idColumnName = 'id_user') => {
                // Filtrar valores undefined antes de usarlos
                const filteredFields = [];
                const filteredValues = [];
                for (let i = 0; i < fields.length; i++) {
                    if (values[i] !== undefined) {
                        filteredFields.push(fields[i]);
                        filteredValues.push(values[i]);
                    }
                }

                if (filteredFields.length === 0) {
                    return { affectedRows: 0, operation: 'none' }; // No hay campos para actualizar/insertar
                }

                // Verificar si ya existe una fila para este id_user
                const [existingRow] = await connection.query(`SELECT * FROM ${tableName} WHERE ${idColumnName} = ?`, [id_user]);

                if (existingRow.length > 0) {
                    // Si existe, actualizar
                    const setClauses = filteredFields.map(field => `${field} = ?`).join(', ');
                    const [updateResult] = await connection.query(
                        `UPDATE ${tableName} SET ${setClauses} WHERE ${idColumnName} = ?`,
                        [...filteredValues, id_user]
                    );
                    return { affectedRows: updateResult.affectedRows, operation: 'update' };
                } else {
                    // Si no existe, insertar
                    const columns = [idColumnName, ...filteredFields];
                    const placeholders = columns.map(() => '?').join(', ');
                    const insertValues = [id_user, ...filteredValues];
                    const [insertResult] = await connection.query(
                        `INSERT INTO ${tableName} (${columns.join(', ')}) VALUES (${placeholders})`,
                        insertValues
                    );
                    return { affectedRows: insertResult.affectedRows, operation: 'insert' };
                }
            };

            let allSecondaryTablesUpdated = true;

            // info_user
            const infoUserFields = [
                'age_user', 'phone_user', 'birth_date_user', 'image_user', 'blood_group_user',
                'height_user', 'weight_user', 'eye_color_user', 'hair_user', 'ip_user', 'mac_address_user',
                'university_user', 'ein_user', 'ssn_user', 'user_agent_user'
            ];
            const infoUserValues = [
                age_user, phone_user, birth_date_user, image_user, blood_group_user,
                height_user, weight_user, eye_color_user, hair_user, ip_user, mac_address_user,
                university_user, ein_user, ssn_user, user_agent_user
            ];
            const infoUserResult = await upsertTable('info_user', infoUserFields, infoUserValues);
            if (infoUserResult.affectedRows > 0) {
                console.log(`info_user: ${infoUserResult.operation === 'insert' ? 'Insertado' : 'Actualizado'}.`);
            } else if (infoUserResult.operation !== 'none') {
                console.log('Error o no se realizaron cambios en info_user.');
                allSecondaryTablesUpdated = false;
            }


            // address_user
            const addressUserFields = [
                'street_address', 'city_address', 'state_address', 'state_code_address',
                'postal_code_address', 'latitude_address', 'longitude_address', 'country_address'
            ];
            const addressUserValues = [
                street_address, city_address, state_address, state_code_address,
                postal_code_address, latitude_address, longitude_address, country_address
            ];
            const addressUserResult = await upsertTable('address_user', addressUserFields, addressUserValues);
            if (addressUserResult.affectedRows > 0) {
                console.log(`address_user: ${addressUserResult.operation === 'insert' ? 'Insertado' : 'Actualizado'}.`);
            } else if (addressUserResult.operation !== 'none') {
                console.log('Error o no se realizaron cambios en address_user.');
                allSecondaryTablesUpdated = false;
            }


            // bank_info_user
            const bankUserFields = [
                'card_expire_user', 'card_number_user', 'card_type_user', 'currency_user', 'iban_user'
            ];
            const bankUserValues = [
                card_expire_user, card_number_user, card_type_user, currency_user, iban_user
            ];
            const bankUserResult = await upsertTable('bank_info_user', bankUserFields, bankUserValues);
            if (bankUserResult.affectedRows > 0) {
                console.log(`bank_info_user: ${bankUserResult.operation === 'insert' ? 'Insertado' : 'Actualizado'}.`);
            } else if (bankUserResult.operation !== 'none') {
                console.log('Error o no se realizaron cambios en bank_info_user.');
                allSecondaryTablesUpdated = false;
            }

            // companies_user
            const companyUserFields = [
                'department_company_user', 'company_name_user', 'company_title_user',
                'company_street_user', 'company_city_user', 'company_state_user', 'company_state_code_user',
                'company_postal_code_user', 'company_latitude_user', 'company_longitude_user', 'company_country_user'
            ];
            const companyUserValues = [
                department_company_user, company_name_user, company_title_user,
                company_street_user, company_city_user, company_state_user, company_state_code_user,
                company_postal_code_user, company_latitude_user, company_longitude_user, company_country_user
            ];
            const companyUserResult = await upsertTable('companies_user', companyUserFields, companyUserValues);
            if (companyUserResult.affectedRows > 0) {
                console.log(`companies_user: ${companyUserResult.operation === 'insert' ? 'Insertado' : 'Actualizado'}.`);
            } else if (companyUserResult.operation !== 'none') {
                console.log('Error o no se realizaron cambios en companies_user.');
                allSecondaryTablesUpdated = false;
            }

            // crypto_wallets_user
            const walletUserFields = [
                'coin_user', 'wallet_address_user', 'network_user'
            ];
            const walletUserValues = [
                coin_user, wallet_address_user, network_user
            ];
            const walletUserResult = await upsertTable('crypto_wallets_user', walletUserFields, walletUserValues);
            if (walletUserResult.affectedRows > 0) {
                console.log(`crypto_wallets_user: ${walletUserResult.operation === 'insert' ? 'Insertado' : 'Actualizado'}.`);
            } else if (walletUserResult.operation !== 'none') {
                console.log('Error o no se realizaron cambios en crypto_wallets_user.');
                allSecondaryTablesUpdated = false;
            }

            if (userRegisterUpdated || allSecondaryTablesUpdated) {
                console.log("Proceso de actualización completado. Revise los logs para detalles específicos.");
                return { success: true, id_user: id_user };
            } else {
                console.log("No se realizaron cambios en el usuario o hubo errores en la actualización.");
                return null;
            }

        } catch (error) {
            console.error('Error en updateUser:', error);
            return null;
        }
    }
}