// Loguear sesion
import jwt from 'jsonwebtoken';
import { CONFIG_SERVER } from '../config.mjs';

export function Auth(user){
    const token = jwt.sign(
        {id: user.id_user, email: user.email_user},
        CONFIG_SERVER.JWT_SECRET,
        {expiresIn: '1h'}
    )
    return token;

}