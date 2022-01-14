const Ship = require("./ship");

const GameBoard = function (length = 8) {
  let ships = [];
  let hits = [];
  let something = [];
  const placeShip = (x1, y1, x2, y2) => {
    const ship = Ship((x2 - x1 || y2 - y1) + 1, x1, y1, x2, y2);
    ships.push(ship);
    return ships;
  };
  const receiveAttack = (x, y) => {
    let missed = true;
    for (let ship of ships) {
      let coordinates = ship.getCoordinates();
      if (
        coordinates.x1 <= x &&
        coordinates.x2 >= x &&
        coordinates.y1 <= y &&
        coordinates.y2 >= y
      ) {
        hits.push(ship.hit(x - coordinates.x1 || y - coordinates.y1));
        missed = false;
        something.pop();
        something.push({
          x1: coordinates.x1,
          y1: coordinates.y1,
          ships: ship,
          won: areSunk(),
        });
      }
    }
    if (missed) {
      something.pop();
      something.push({ x1: x, y1: y, ships: false });
    }
    return !missed;
  };

  const areSunk = () => {
    let status = true;
    for (let ship of ships) {
      if (ship.isSunk() == false) {
        status = false;
      }
    }
    if (status) return true;
    else return false;
  };
  return { ships, placeShip, receiveAttack, areSunk, length, hits, something };
};

module.exports = GameBoard;
