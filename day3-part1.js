import fs from "fs";

const data = fs
  .readFileSync("./day3-input.txt", "utf-8")
  .trim()
  .replaceAll("\r", "")
  .split("\n");

let sumOfParts = 0;

// extract each number and see if they are a valid part
for (let rowIndex = 0; rowIndex < data.length; rowIndex++) {
  const row = data[rowIndex];
  let numberBuffer = "";
  let isPartNumber = false;

  for (let [charIndex, char] of Object.entries(row)) {
    const isNumber = !isNaN(Number(char));
    let nextChar = row[Number(charIndex) + 1];

    if (isNumber) {
      numberBuffer += char;
      isPartNumber
        ? null
        : (isPartNumber = isValidPartCharacter(rowIndex, Number(charIndex)));
    }

    if (isNaN(Number(nextChar))) {
      // check next char to see if it's end of the number
      if (numberBuffer && isPartNumber) {
        sumOfParts += Number(numberBuffer);
      }
      // reset values
      numberBuffer = "";
      isPartNumber = false;
    }
  }
}

function isSymbol(character) {
  return character == null ||
    character === "." ||
    (Number(character) >= 0 && Number(character) <= 9)
    ? false
    : true;
}

function isValidPartCharacter(rowIndex, numberIndex) {
  const rowAbove = data[rowIndex - 1];
  const rowCurrent = data[rowIndex];
  const rowBelow = data[rowIndex + 1];

  const isValid =
    isSymbol(rowAbove?.[numberIndex - 1]) ||
    isSymbol(rowAbove?.[numberIndex]) ||
    isSymbol(rowAbove?.[numberIndex + 1]) ||
    isSymbol(rowCurrent?.[numberIndex - 1]) ||
    isSymbol(rowCurrent?.[numberIndex + 1]) ||
    isSymbol(rowBelow?.[numberIndex - 1]) ||
    isSymbol(rowBelow?.[numberIndex]) ||
    isSymbol(rowBelow?.[numberIndex + 1]);

  return isValid;
}

console.log(sumOfParts);
