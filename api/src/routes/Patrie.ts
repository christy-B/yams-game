import { Router, Request, Response } from 'express';
import DbPatrie, {PatrieDocument} from '../model/DbPatrie';
import { updateDocument } from '../utility/Crud';

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


routerPatrie.put('/:id/winners', async (req: Request, res: Response) => {
  try {
    const patrieId = req.params.id;
    const { email, quantityWon } = req.body;

    // Vérifier si les données requises sont présentes
    if (!email || !quantityWon) {
      throw new Error('Missing required fields in request body');
    }

    // Mettre à jour les gagnants de la patrie dans la base de données
    const updatedPatrie = await DbPatrie.findByIdAndUpdate(
      patrieId,
      { $push: { winners: { email, quantityWon } } },
      { new: true }
    );

    // Vérifier si la patrie a été mise à jour avec succès
    if (!updatedPatrie) {
      throw new Error('Patrie not found');
    }
   
    // Envoyer une réponse réussie
    res.status(200).json({ message: 'Winners updated successfully', patrie: updatedPatrie });
  } catch (error: any) {
    // Envoyer un message d'erreur en cas d'échec
    console.error('Error updating winners:', error.message);
    res.status(400).json({ message: error.message || 'Bad Request' });
  }
});

export default routerPatrie;