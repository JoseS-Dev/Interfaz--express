import { validateLogin, validateUser } from "../Validations/SchemaUser.mjs";
import { Auth } from "../Middlewares/Auth.mjs";
export class UsersControllers{
    constructor({ModelsUsers}){
        this.ModelsUsers = ModelsUsers;
    }

    // Logear un usuario
    getLogin = async (req , res) => {
        try{
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
            const result = validateUser(req.body);
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
                    user: Register
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
            if (!req.user) return res.status(401).json({
                message: 'Usuario no autenticado'
            });

            return res.status(200).json({
                message: 'Usuario autenticado',
                user: req.user
            });
        }
}