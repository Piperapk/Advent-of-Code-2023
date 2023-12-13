import fs from "fs";

const data = fs
  .readFileSync("./day4-input.txt", "utf-8")
  .trim()
  .replaceAll("\r", "")
  .split("\n");

let totalPoints = 0;

const numbersForEachCard = data.map((card) => {
  const numbers = card.split(":")[1].split("|");
  const winningNumbers = numbers[0].trim().split(/\s+/);
  const scratchedNumbers = numbers[1].trim().split(/\s+/);

  return { winningNumbers, scratchedNumbers };
});

for (let i = 0; i < numbersForEachCard.length; i++) {
  const currentCard = numbersForEachCard[i];
  let winningNumbers = 0;

  for (let number of currentCard.scratchedNumbers) {
    const isWinning = currentCard.winningNumbers.includes(number);
    winningNumbers += isWinning ? 1 : 0;
  }
  const points =
    winningNumbers <= 1 ? winningNumbers : 2 ** (winningNumbers - 1);
  totalPoints += points;
}

console.log(totalPoints);
