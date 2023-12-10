import fs from "fs";

// advent day 1 part 1

const data = fs.readFileSync("./day1-input.txt", "utf-8").trim().split("\n");

let firstAndLastNumberForData = [];

function getNumberInDirection(string, direction = "toLeft") {
  let stringArray = string.split("");
  if (direction === "toRight") {
    stringArray.reverse();
  }
  let number;

  for (let character of stringArray) {
    if (Number(character)) {
      number = character;
      return number;
    }
  }
}

for (let string of data) {
  const combinedNumber =
    getNumberInDirection(string) + getNumberInDirection(string, "toRight");

  firstAndLastNumberForData.push(Number(combinedNumber));
}

const finalResult = firstAndLastNumberForData.reduce(
  (accumulator, currentValue) => accumulator + currentValue,
  0
);

console.log(finalResult);
