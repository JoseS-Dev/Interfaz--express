// Loguear sesion
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export function Auth(user){
    const token = jwt.sign(
        {id: user.id_user, email: user.email_user},
        process.env.DB_JWT_SECRET,
        {expiresIn: '1h'}
    )
    return token;

}

export const authMiddleware = (req, res, next) => {
    console.log(process.env.DB_JWT_SECRET);
    console.log(process.env.DB_JWT_EXPIRATION);
    const token = req.cookies.token;
    if(!token){
        return res.status(401).json({ message: 'No token provided' });
    }
    try{
        const decoded = jwt.verify(token, process.env.DB_JWT_SECRET);
        req.user = decoded;
        next();
    }
    catch(error){
        res.clearCookie('token');
        return res.status(403).json({ message: 'Invalid token' });
    }
};