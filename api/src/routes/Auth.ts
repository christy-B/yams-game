import { Router } from 'express';
import DbUser, { UserDocument } from '../model/DbUser';
import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import 'dotenv/config';


export const routerAuth = Router();

// Route pour connecter un utilisateur

routerAuth.post('/login', async (req: Request, res: Response) => {
  try {
    // Vérifier si req.body est défini et contient les champs requis
    if (!req.body || !req.body.email || !req.body.password) {
      throw new Error('Missing required fields in request body');
    }

    const { email, password } = req.body;

    // Recherche de l'utilisateur dans la base de données par son email
    const user: UserDocument | null = await DbUser.findOne({ email });

    // Vérifier si l'utilisateur existe
    if (!user) {
      throw new Error('User not found');
    }

    // Vérifier le mot de passe
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new Error('Invalid password');
    }

    // ** votre JWT Token
    const token = jwt.sign(
      { userId: user?._id, email: user?.email },
      process.env.JWTPRIVATEKEY as string,
      {
      expiresIn: "1m",
      }
      );
    // reponse
    res.status(200).json({
      status: 200,
      success: true,
      message: "login success",
      token: token,
      });
  } catch (error: any) {
    // Send the error message to the client
    res.status(400).json({
    status: 400,
    message: error.message.toString(),
    });
  }
});
