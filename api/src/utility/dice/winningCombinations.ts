// utility/winningCombinations.ts

export const checkWinningCombinations = (diceValues: number[]): string[] => {
    const sortedDiceValues = diceValues.slice().sort(); // Tri des valeurs des dés
  
    // Vérification du YAM'S
    if (sortedDiceValues.every((value) => value === sortedDiceValues[0])) {
      return ['YAM\'S'];
    }
  
    // Vérification du CARRÉ
    for (let i = 0; i <= 1; i++) {
      if ((sortedDiceValues[i] === sortedDiceValues[i + 1] && sortedDiceValues[i] === sortedDiceValues[i + 2] && sortedDiceValues[i] === sortedDiceValues[i + 3])||(sortedDiceValues[i+1] === sortedDiceValues[i + 2] && sortedDiceValues[i+1] === sortedDiceValues[i + 3] && sortedDiceValues[i+1] === sortedDiceValues[i + 4])) {
        return ['CARRÉ'];
      }
    }
  
    // Vérification du DOUBLE
    let pairsCount = 0;
    for (let i = 0; i < 5; i++) {
      if (sortedDiceValues[i] === sortedDiceValues[i + 1]) {
        pairsCount++;
        i++; 
      }
    }
    if (pairsCount >= 2) {
      return ['DOUBLE'];
    }
  
    return ['LOST']; // Aucune combinaison gagnante
};
