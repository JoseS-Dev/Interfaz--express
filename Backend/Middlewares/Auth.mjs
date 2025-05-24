// Loguear sesion
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export function Auth(user){
    const token = jwt.sign(
        {id: user.id_user, email: user.email_user},
        process.env.JWT_SECRET,
        {expiresIn: process.env.DB_JWT_EXPIRATION || '1h'}
    )
    return token;

}