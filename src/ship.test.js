const Ship = require("./ship");

test("checks if hit and isSunk are working", () => {
  const titanic = Ship(5, 0, 1, 0, 5);
  expect(titanic.hit(2)).toEqual([false, false, true, false, false]);
  expect(titanic.isSunk()).toBe(false);
  expect(titanic.align).toBe(0);
});

test("checks if isSunk returns true if ship is hit completely", () => {
  const titanic = Ship(3, 3, 0, 5, 0);
  expect(titanic.hit(2)).toEqual([false, false, true]);
  expect(titanic.hit(0)).toEqual([true, false, true]);
  expect(titanic.hit(1)).toEqual([true, true, true]);
  expect(titanic.isSunk()).toBe(true);
})