import { validateLogin, validateUser } from "../Validations/Schema.mjs";
import jwt from 'jsonwebtoken';
import { CONFIG_SERVER } from "../config.mjs";
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
                const token = jwt.sign(
                    {id: user.id_user, email: user.email_user},
                    CONFIG_SERVER.JWT_SECRET,
                    {expiresIn: '1h'}
                )
                return res
                .cookie('Access--Token', token, {
                    httpOnly: true
                })
                .status(200).json({
                    message: 'Usuario Logueado',
                    user,token
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
            return res
            .clearCookie('Access--Token')
            .status(200).json({
                message: 'Sesión cerrada'
            });
        }catch(error){
            console.log(error);
            return res.status(500).json({
                message: 'Error en el servidor',
                error
            });
        }
    }

}