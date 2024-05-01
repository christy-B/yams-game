import { Router } from 'express';
import DbUser, { UserDocument } from '../model/DbUser';
import { createDocument } from '../utility/Crud';
import { IUser } from '../types/IUser';
import { Request, Response } from 'express';
import { HashPassword } from '../middleware/HashPassword';


export const routerUser = Router();

// Route pour inscrire un nouvel utilisateur
routerUser.post('/signup', HashPassword, async (req: Request, res: Response) => {
  try {
    // Vérifier si req.body est défini et contient les champs requis
    if (!req.body || !req.body.firstname || !req.body.lastname || !req.body.password) {
      throw new Error('Missing required fields in request body');
    }

    // Extraire les données de req.body
    const firstname = req.body.firstname;
    const lastname = req.body.lastname;
    const password = req.body.password;
    const email = req.body.email; // Extraire email du corps de la requête si présent

    // Création d'un nouvel utilisateur avec email si disponible
    const newUser: IUser = {
      firstname,
      lastname,
      email,
      password
    };

    // Enregistrement de l'utilisateur dans la base de données
    const createdUser: UserDocument = await createDocument(DbUser, newUser);

    res.status(201).json(createdUser);
  } catch (error: any) {
    console.error('Error creating user:', error.message);
    res.status(400).json({ message: error.message || 'Bad Request' });
  }
});
