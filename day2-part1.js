import fs from "fs";

const data = fs.readFileSync("./day2-input.txt", "utf-8").trim().split("\n");

// Game valid if only 12 red cubes, 13 green cubes, and 14 blue cubes
let gameTotal = 0;
const validGame = { red: 12, green: 13, blue: 14 };

for (let i = 0; i < data.length; i++) {
  const currentGame = data[i];
  const gameNumber = i + 1;
  let isValidGame = true;

  const revealedCubes = currentGame
    .split(":")[1]
    .split(";")
    .map((reveal) => {
      // split each color inti a key value pair of name and number
      const revealArray = reveal
        .replace("\r", "")
        .split(",")
        .map((color) => {
          const colorKey = color.split(" ");
          return { [colorKey[colorKey.length - 1]]: parseInt(color) };
        });

      return Object.assign({}, ...revealArray);
    });

  // check if it's a valid game
  for (let reveal of revealedCubes) {
    for (let cubeColor in reveal) {
      if (validGame[cubeColor] < reveal[cubeColor]) {
        isValidGame = false;
      }
    }

    if (!isValidGame) {
      break;
    }
  }

  if (isValidGame) {
    gameTotal += gameNumber;
  }
}

console.log(gameTotal);
