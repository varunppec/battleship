const modules = require("./player");
const getRandomInt = modules.method2;
const Player = modules.method1;

test("idk", () => {
  const player1 = Player();
  const player2 = Player(true);
  player2.myGameBoard.placeShip(3, 4, 3, 5);
  let test = player1.attackBoard(player2, 3, 5);
  expect(test).toEqual(true);
});

test("one more one", () => {
  const player1 = Player();
  const player2 = Player(true);
  player1.myGameBoard.placeShip(0, 0, 0, 1);
  let test = player2.attackBoard(player1);
  expect(player1).toHaveProperty("attackBoard");
  expect(player2).toHaveProperty("myGameBoard");

  console.log(test);
});
