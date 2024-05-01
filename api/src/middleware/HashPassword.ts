// middleware/bcryptMiddleware.ts

import bcrypt from 'bcrypt';
import { Request, Response, NextFunction } from 'express';

// Middleware pour hacher les mots de passe avec bcrypt
export const HashPassword = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // Vérifie si le corps de la requête contient un mot de passe
    if (req.body && req.body.password) {
      const hashedPassword = await bcrypt.hash(req.body.password, 10); // Hache le mot de passe avec un coût de 10
      req.body.password = hashedPassword; // Remplace le mot de passe brut par le mot de passe haché dans le corps de la requête
    }
    next(); // Passe au middleware suivant ou à la route suivante
  } catch (error) {
    // En cas d'erreur, renvoie une réponse d'erreur 500
    console.error('Error hashing password:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
