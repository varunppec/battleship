const GameBoard = require("./gameboard");

test("if placeship works properly", () => {
  let board = GameBoard();
  expect(board.placeShip(2, 3, 4, 3)[0]).toHaveProperty("length", 3);
  expect(board.placeShip(0, 0, 1, 0).length).toBe(2);
});

test("if recieveattack working properly", () => {
  let board = GameBoard();
  board.placeShip(2, 3, 4, 3);
  expect(board.receiveAttack(2, 3)).toBe(true);
  expect(board.receiveAttack(6, 0)).toBe(false);
});

test("if aresunk working properly", () => {
  let board1 = GameBoard();
  let value = board1.placeShip(2, 3, 4, 3);
  board1.placeShip(0,0, 0, 1);
  expect(board1.areSunk()).toBe(false);
  board1.receiveAttack(2,3);
  board1.receiveAttack(3,3);
  board1.receiveAttack(4,3);
  board1.receiveAttack(0,0);
  board1.receiveAttack(0,1);
  expect(board1.areSunk()).toBe(true);
});
