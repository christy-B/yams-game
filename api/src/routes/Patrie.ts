import { Router, Request, Response } from 'express';
import DbPatrie, {PatrieDocument} from '../model/DbPatrie';

const routerPatrie = Router();

// Route pour récupérer la liste des patries
routerPatrie.get('/getCollection', async (req: Request, res: Response) => {
  try {
    // Récupérer toutes les patries depuis la base de données
    const patries: PatrieDocument[] = await DbPatrie.find();

    // Retourner la liste des patries en réponse
    res.status(200).json(patries);
  } catch (error) {
    console.error('Error fetching patries:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

export default routerPatrie;
