import { validateLogin, validateUser, validateUpdateUser, validateRegister } from "../Validations/SchemaUser.mjs";
import { Auth } from "../Middlewares/Auth.mjs";
export class UsersControllers{
    constructor({ModelsUsers}){
        this.ModelsUsers = ModelsUsers;
    }

    // Logear un usuario
    getLogin = async (req , res) => {
        try{
            console.log(req.body);
            const result = validateLogin(req.body);
            const user = await this.ModelsUsers.Login({user: result.data});
            if(user){
                return res
                .cookie('Access--Token', Auth(user), {
                    httpOnly: true
                })
                .status(200).json({
                    message: 'Usuario Logueado',
                    user,
                    token: Auth(user)
                })
            }
            else{
                return res.status(400).json({
                    message: 'Error al loguear el usuario'
                });
            }
        }catch(error){
            console.log(error);
            return res.status(500).json({
                message: 'Error en el servidor',
                error
            });
        }
    }

    // Registrar un usuario
    getRegister = async (req, res) => {
        try{
            const result = validateRegister(req.body);
            if(!result.success){
                return res.status(400).json({
                    message: 'Error en la validación',
                    error: result.error
                });
            }
            const Register = await this.ModelsUsers.Register({user: result.data});
            if(Register){
                return res.status(201).json({
                    message: 'Usuario registrado',
                    user: Register,
                    token: Auth(Register)
                });
            }
            else{
                return res.status(400).json({
                    message: 'Error al registrar el usuario'
                });
            }
        }
        catch(error){
            console.log(error);
            return res.status(500).json({
                message: 'Error en el servidor',
                error
            });
        }
    }
    /// Cerrar sesion
    getLogout = async (req, res) => {
        try{
            const user = await this.ModelsUsers.getLogout({user: req.body});
            return res
            .clearCookie('Access--Token')
            .status(200).json({
                message: 'Sesión cerrada',
                userLoggedOut: user
            });
        }catch(error){
            console.log(error);
            return res.status(500).json({
                message: 'Error en el servidor',
                error
            });
        }
    }

    getVerify = async (req, res) => {
            
            console.log('Verificando usuario autenticado');
            if (!req.user) return res.status(401).json({
                message: 'Usuario no autenticado',
                isAuthenticated: false,
            });

            return res.status(200).json({
                message: 'Usuario autenticado',
                isAuthenticated: true,
            });
    }

    // Obtener a todos los usuarios
    getAllUsers = async (req, res) => {
        try{
            const users = await this.ModelsUsers.getAllUsers();
            if(users.length > 0){
                return res.status(200).json({
                    message: 'Usuarios obtenidos',
                    users
                })
            }
            else{
                return res.status(404).json({
                    message: 'No hay usuarios registrados'
                });
            }
        }
        catch(error){
            console.log(error);
            return res.status(500).json({
                message: 'Error en el servidor',
                error
            });
        }
    }

    // Obtener a un usuario por su ID
    getUserByID = async (req, res) => {
        console.log('Obteniendo usuario por ID');
        try{
            const { id_user } = req.params;
            const userID = await this.ModelsUsers.getUserByID({id_user});
            if(userID){
                return res.status(200).json({
                    message: 'Usuario encontrado',
                    user: userID
                });
            }
            else{
                return res.status(404).json({
                    message: 'Usuario no encontrado'
                });
            }
        }
        catch(error){
            console.log(error);
            return res.status(500).json({
                message: 'Error en el servidor',
                error
            });
        }
    }
    
    // Obtener a un usuario por su email
    getUserByEmail = async (req, res) => {
        try{
            const { email_user } = req.params;
            const userEmail = await this.ModelsUsers.getUserByEmail({email_user});
            if(userEmail){
                return res.status(200).json({
                    message: 'Usuario encontrado',
                    user: userEmail
                });
            }
            else{
                return res.status(404).json({
                    message: 'Usuario no encontrado'
                });
            }
        }
        catch(error){
            console.log(error);
            return res.status(500).json({
                message: 'Error en el servidor',
                error
            });
        }
    }

    // Obtener a un usuario por su username
    getUserByUsername = async (req, res) => {
        try{
            const { username } = req.params;
            const userUsername = await this.ModelsUsers.getUserByUsername({username});
            if(userUsername){
                return res.status(200).json({
                    message: 'Usuario encontrado',
                    user: userUsername
                });
            }
            else{
                return res.status(404).json({
                    message: 'Usuario no encontrado'
                });
            }
        }
        catch(error){
            console.log(error);
            return res.status(500).json({
                message: 'Error en el servidor',
                error
            });
        }
    }

    // Obtener un usuario por su rol
    getUserByRole = async (req, res) => {
        try{
            const { role_user } = req.params;
            const userRole = await this.ModelsUsers.getUserByRole({role_user});
            if(!userRole || userRole.length === 0){
                return res.status(404).json({
                    message: 'No hay usuarios con ese rol'
                });
            }
            return res.status(200).json({
                message: 'Usuarios encontrados',
                users: userRole
            });
        }
        catch(error){
            console.log(error);
            return res.status(500).json({
                message: 'Error en el servidor',
                error
            });
        }
    }

    // Actualizar a un usuario
    updateUser = async (req, res) => {
        try{
            const { id_user } = req.params;
            const result = validateUpdateUser(req.body);
            if(!result.success){
                console.log(result.error.errors);
                return res.status(400).json({
                    message: 'Error en la validación',
                    error: result.error
                });
            }
            const user = await this.ModelsUsers.updateUser({id_user, user: result.data});
            return res.status(200).json({
                message: 'Usuario actualizado',
                user
            });
        }
        catch(error){
            console.log(error);
            return res.status(500).json({
                message: 'Error en el servidor',
                error
            });
        }
    }
    
    activateUser = async (req, res) => {
        try {
            const { id_user } = req.params;
            const user = await this.ModelsUsers.activateOrDeactiveUser({ id_user, isActive: 1 });
            if(user){
                return res.status(200).json({
                    message: 'Usuario activado',
                    user
                });
            } else {
                return res.status(404).json({
                    message: 'Usuario no encontrado'
                });
            }
        } catch (error){
            console.error(error);
            return res.status(500).json({
                message: 'Error en el servidor',
                error
            });
        }
    }
    
    deactivateUser = async (req, res) => {
        try {
            const { id_user } = req.params;
            const user = await this.ModelsUsers.activateOrDeactiveUser({ id_user, isActive: 0 });
            if(user){
                return res.status(200).json({
                    message: 'Usuario desactivado',
                    user
                });
            } else {
                return res.status(404).json({
                    message: 'Usuario no encontrado'
                });
            }
        } catch (error) {
            console.error(error);
            return res.status(500).json({
                message: 'Error en el servidor',
                error
            });
        }
    }
}