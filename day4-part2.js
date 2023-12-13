import fs from "fs";

const data = fs
  .readFileSync("./day4-input.txt", "utf-8")
  .trim()
  .replaceAll("\r", "")
  .split("\n")
  .map((card, index) => {
    const numbers = card.split(":")[1].split("|");
    const winningNumbers = numbers[0].trim().split(/\s+/);
    const scratchedNumbers = numbers[1].trim().split(/\s+/);
    const cardNumber = index;

    return { cardNumber, winningNumbers, scratchedNumbers };
  });

function processCard(card, count) {
  let winningNumbers = 0;

  for (let number of card.scratchedNumbers) {
    if (card.winningNumbers.includes(number)) {
      winningNumbers++;
    }
  }

  let total = count + winningNumbers;

  for (let i = 1; i <= winningNumbers; i++) {
    const nextCardIndex = card.cardNumber + i;
    if (nextCardIndex < data.length) {
      total = processCard(data[nextCardIndex], total);
    }
  }

  return total;
}

let totalCards = data.length; // start with the original number of cards

for (let i = 0; i < data.length; i++) {
  totalCards = processCard(data[i], totalCards);
}

console.log(totalCards);
