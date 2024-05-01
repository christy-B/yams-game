import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import 'dotenv/config';

// Middleware pour vérifier le token JWT
export const Auth= (req: Request, res: Response, next: NextFunction) => {
    try {
        const header = req.headers.authorization || '';
        if (!header.startsWith('Bearer ')) {
            return res.status(401).json({ message: 'Missing authorization header with Bearer token' });
        }
    
        const token = header.split('Bearer ')[1];
        try {
            const decoded: any = jwt.verify(token, process.env.JWTPRIVATEKEY as string);
            if (!decoded) {
                return res.status(401).json({ message: 'Access token could not be decoded' });
            }
            if (!decoded.userId) {
                return res.status(401).json({ message: 'userId was not found in the payload' });
            }
            // Stocker le userId sur la réponse pour utilisation ultérieure
            res.locals.userId = decoded.userId;
            next();
        } catch (err: any) {
            console.error(err);
            if (err instanceof jwt.TokenExpiredError) {
                return res.status(401).json({ message: 'Access token expired' });
            }
            return res.status(401).json({ message: 'Invalid access token' });
        }
    } catch (err) {
        next(err);
    }
};
