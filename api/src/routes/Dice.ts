import express, { Request, Response } from 'express';
import { generateRandomDiceValues } from '../utility/dice/Random';
import { checkWinningCombinations } from '../utility/dice/winningCombinations';

const routerDice = express.Router();

// Route pour le tirage des dés
routerDice.get('/roll-dice', async (req: Request, res: Response) => {
  try {
    // Génération des valeurs aléatoires des dés
    const diceValues = generateRandomDiceValues();

    // Vérification des combinaisons gagnantes
    const result = checkWinningCombinations(diceValues);

    // Retour des résultats au client
    res.status(200).json({ diceValues, result });
  } catch (error) {
    console.error('Erreur lors du tirage des dés :', error);
    res.status(500).json({ message: 'Une erreur est survenue lors du tirage des dés.' });
  }
});

export default routerDice;
