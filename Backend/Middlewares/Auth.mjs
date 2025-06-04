// Loguear sesion
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export function Auth(user){
    const token = jwt.sign(
        {id: user.id_user, email: user.email_user},
        process.env.DB_JWT_SECRET,
        {expiresIn: process.env.DB_JWT_EXPIRATION || '1h'}
    )
    return token;

}

export const authMiddleware = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    
    // Verificar formato del header
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ 
            error: 'Formato de autorización inválido. Usa Bearer token' 
        });
    }

    const token = authHeader.split(' ')[1];
    
    try {
        const decoded = jwt.verify(token, process.env.DB_JWT_SECRET);
        req.user = decoded;
        next(); 
    } catch (error) {
        return res.status(401).json({
            error: `Token inválido o expirado: ${error.message}`
        });
    }
};