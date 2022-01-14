const GameBoard = require("./gameboard");

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min);
}

const Player = function (isAI) {
  const attacked = [];
  const myGameBoard = GameBoard();
  const attackBoard = (
    opponent,
    x = getRandomInt(0, myGameBoard.length),
    y = getRandomInt(0, myGameBoard.length)
  ) => {
    for (let item of attacked) {
      if (JSON.stringify(item) == JSON.stringify({ x: x, y: y })) {
        return;
      }
    }
    attacked.push({ x: x, y: y });
    if (opponent.myGameBoard.receiveAttack(x, y)) {
      return true;
    } else return false;
  };
  return { attackBoard, myGameBoard };
};

module.exports = { method1: Player, method2: getRandomInt };
