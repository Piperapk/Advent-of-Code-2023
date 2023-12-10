// advent day 1 part 2
import fs from "fs";

const data = fs.readFileSync("./day1-input.txt", "utf-8").trim().split("\n");

let firstAndLastNumberForData = [];

function getNumberFromString(string) {
  const numberMap = {
    one: 1,
    two: 2,
    three: 3,
    four: 4,
    five: 5,
    six: 6,
    seven: 7,
    eight: 8,
    nine: 9,
  };

  const numberFirstIndex = {};
  const numberLastIndex = {};

  // iterate over the number map and get the index of each key and value (numbers) in the map
  for (let key of Object.keys(numberMap)) {
    numberFirstIndex[key] = string.indexOf(key);
    numberFirstIndex[numberMap[key]] = string.indexOf(numberMap[key]);
    numberLastIndex[key] = string.lastIndexOf(key);
    numberLastIndex[numberMap[key]] = string.lastIndexOf(numberMap[key]);
  }

  // get lowest and highest indices
  const lowest = Object.entries(numberFirstIndex).reduce(
    (accumulator, currentValue) => {
      const [key, value] = currentValue;
      if (accumulator[1] > value && value !== -1) {
        accumulator[0] = !Number(key) ? numberMap[key] : key;
        accumulator[1] = value;
      }
      return accumulator;
    },
    [0, string.length]
  );
  const highest = Object.entries(numberLastIndex).reduce(
    (accumulator, currentValue) => {
      const [key, value] = currentValue;
      if (accumulator[1] <= value) {
        accumulator[0] = !Number(key) ? numberMap[key] : key;
        accumulator[1] = value;
      }
      return accumulator;
    },
    [0, 0]
  );

  return String(lowest[0]) + String(highest[0]);
}

for (let string of data) {
  const combinedNumber = getNumberFromString(string);
  firstAndLastNumberForData.push(Number(combinedNumber));
}

const finalResult = firstAndLastNumberForData.reduce(
  (accumulator, currentValue) => accumulator + currentValue,
  0
);

console.log(finalResult);
