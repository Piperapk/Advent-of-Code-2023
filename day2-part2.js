import fs from "fs";

const data = fs.readFileSync("./day2-input.txt", "utf-8").trim().split("\n");

let gameTotal = 0;

for (let i = 0; i < data.length; i++) {
  const currentGame = data[i];
  const maxCubes = { red: 0, green: 0, blue: 0 };

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

  // check the max number of cubes that the game needs
  for (let reveal of revealedCubes) {
    for (let cubeColor in reveal) {
      if (reveal[cubeColor] > maxCubes[cubeColor]) {
        maxCubes[cubeColor] = reveal[cubeColor];
      }
    }
  }

  const powerOfCubes = Object.values(maxCubes).reduce((acc, currentValue) => {
    return (acc *= currentValue);
  }, 1);

  gameTotal += powerOfCubes;
}

console.log(gameTotal);
