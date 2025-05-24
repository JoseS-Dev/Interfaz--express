import { validateUser } from "../Validations/Schema.mjs";

export class UsersControllers{
    constructor({UserModels}){
        this.UserModels = UserModels;
    }

    // Logear un usuario
    getLogin = async (req , res) => {
        try{
            const {id} = req.params;
            if(id){
                const user = await this.UserModels.getLogin({id});
                if(user){
                    return res.status(200).json({
                        message: 'Usuario logueado',
                        user
                    });
                }
                else{
                    return res.status(400).json({
                        message: 'Error al loguear el usuario'
                    });
                }
            }
        }catch(error){
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
            const Register = await this.UserModels.getRegister({user: result.data});
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
            return res.status(500).json({
                message: 'Error en el servidor',
                error
            });
        }
    }
}