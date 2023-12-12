import fs from "fs";

const data = fs
  .readFileSync("./day3-input.txt", "utf-8")
  .trim()
  .replaceAll("\r", "")
  .split("\n");

let sumOfGearRatios = 0;
let gearLocations = {};

// extract each number and see if they are a valid part
for (let rowIndex = 0; rowIndex < data.length; rowIndex++) {
  const row = data[rowIndex];
  let numberBuffer = "";
  let isPartNumber = false;
  let gear = null;

  for (let [charIndex, char] of Object.entries(row)) {
    const isNumber = !isNaN(Number(char));
    let nextChar = row[Number(charIndex) + 1];

    if (isNumber) {
      numberBuffer += char;

      const { isValid, gearIndex } = isValidPartCharacter(
        rowIndex,
        Number(charIndex)
      );

      isPartNumber ? null : (isPartNumber = isValid);
      gear ? null : (gear = gearIndex);
    }

    if (isNaN(Number(nextChar))) {
      // check next char to see if it's end of the number
      if (numberBuffer && isPartNumber) {
        // set a gear ratio if we haven't do so already
        gearLocations[gear]
          ? gearLocations[gear].push(Number(numberBuffer))
          : (gearLocations[gear] = [Number(numberBuffer)]);
      }
      // reset values
      numberBuffer = "";
      isPartNumber = false;
      gear = null;
    }
  }
}

function isGear(character) {
  return character === "*" ? true : false;
}

function isValidPartCharacter(rowIndex, numberIndex) {
  let isValid = false;
  let gearIndex;

  for (let i = 0; i < 3; i++) {
    const indexToLookup = numberIndex - 1 + i;

    const rowAboveChar = data[rowIndex - 1]?.[indexToLookup];
    const rowCurrent = data[rowIndex]?.[indexToLookup];
    const rowBelowChar = data[rowIndex + 1]?.[indexToLookup];

    if (isGear(rowAboveChar)) {
      isValid = true;
      gearIndex = `${rowIndex - 1}-${indexToLookup}`;
    }
    if (isGear(rowCurrent) && numberIndex !== indexToLookup) {
      isValid = true;
      gearIndex = `${rowIndex}-${indexToLookup}`;
    }
    if (isGear(rowBelowChar)) {
      isValid = true;
      gearIndex = `${rowIndex + 1}-${indexToLookup}`;
    }
  }

  return { isValid, gearIndex };
}

for (let gear in gearLocations) {
  const gearValue = gearLocations[gear];
  if (gearValue.length === 2) {
    sumOfGearRatios += gearValue[0] * gearValue[1];
  }
}

console.log(sumOfGearRatios);
