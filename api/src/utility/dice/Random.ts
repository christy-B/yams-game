export const generateRandomDiceValues = (): number[] => {
  const diceValues: number[] = [];
  /* const diceValues = [
    5,
    5,
    5,
    5,
    5
  ] */
  for (let i = 0; i < 5; i++) {
    diceValues.push(Math.floor(Math.random() * 6) + 1);
  }
  return diceValues;
};