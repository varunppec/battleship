/* eslint-disable radix */
/* eslint-disable func-names */
const Player = require('./player').method1;
const shipPlacing = require('./shipplacing').m1;
const submitShips = require('./shipplacing').m2;
const getRandomInt = require('./player').method2;

shipPlacing();
let player1;
const submit = document.querySelector('#submit');
submit.onclick = function (e) {
  e.preventDefault();
  player1 = submitShips();
  if (player1) {
    const black = document.querySelector('.black');
    black.parentElement.removeChild(black);
    htmlPart();
  }
};

const populate = function (name) {
  const content = document.querySelector('.content');
  const gridHolder = document.createElement('div');
  gridHolder.classList.add('gridholder');
  const div = document.createElement('div');
  div.innerText = name;

  content.append(gridHolder);
  div.style.fontSize = '2em';
  const grid = document.createElement('div');
  grid.classList.add('grid');
  gridHolder.append(div, grid);
  for (i = 0; i < player1.myGameBoard.length; i++) {
    for (j = 0; j < player1.myGameBoard.length; j++) {
      const box = document.createElement('div');
      box.classList.add('box', name);
      box.setAttribute('x-data', i);
      box.setAttribute('y-data', j);
      grid.append(box);
      if (name == 'AI') {
        box.onclick = function () {
          attackAIBox(box);
        };
      } else {
        // eslint-disable-next-line no-restricted-syntax
        for (const ship of player1.myGameBoard.ships) {
          const coordinates = ship.getCoordinates();
          if (
            i >= coordinates.x1
            && i <= coordinates.x2
            && j >= coordinates.y1
            && j <= coordinates.y2
          ) {
            box.style.backgroundColor = 'grey';
          }
        }
      }
    }
  }
};

const attackAIBox = function (box) {
  const test = player1.attackBoard(
    player2,
    parseInt(box.getAttribute('x-data')),
    parseInt(box.getAttribute('y-data')),
  );
  if (test) {
    box.innerText = 'X';
    box.style.color = 'white';
    box.classList.add('used');
    if (player2.myGameBoard.areSunk()) {
      window.alert('Player1 has won');
      return;
    }
  } else if (test == false) {
    box.innerText = '.';
    box.style.color = 'white';
    box.classList.add('used');
  }
  attackPlayerBox();
};

const attackPlayerBox = function () {
  const test = player2.attackBoard(player1);
  if (test == false) {
    const x = player1.myGameBoard.something[0].x1;
    const y = player1.myGameBoard.something[0].y1;
    const boxes = document.querySelectorAll('.Player1');
    for (const box of boxes) {
      if (box.getAttribute('x-data') == x && box.getAttribute('y-data') == y) {
        box.style.color = 'white';
        box.innerText = '.';
        box.classList.add('used');
      }
    }
  } else if (!test) {
    attackPlayerBox();
  } else if (test == true) {
    for (i = 0; i < player1.myGameBoard.something[0].ships.length; i++) {
      if (!player1.myGameBoard.something[0].ships.hitstatus[i]) {
      } else if (
        player1.myGameBoard.something[0].ships.hitstatus[i]
        && player1.myGameBoard.something[0].ships.align == 1
      ) {
        const x = player1.myGameBoard.something[0].x1 + i;
        const y = player1.myGameBoard.something[0].y1;
        const boxes = document.querySelectorAll('.Player1');
        for (const box of boxes) {
          if (
            box.getAttribute('x-data') == x
            && box.getAttribute('y-data') == y
          ) {
            box.style.color = 'white';
            box.innerText = 'X';
            box.classList.add('used');
          }
        }
      } else if (
        player1.myGameBoard.something[0].ships.hitstatus[i]
        && player1.myGameBoard.something[0].ships.align == 0
      ) {
        const y = player1.myGameBoard.something[0].y1 + i;
        const x = player1.myGameBoard.something[0].x1;
        const boxes = document.querySelectorAll('.Player1');
        for (const box of boxes) {
          if (
            box.getAttribute('x-data') == x
            && box.getAttribute('y-data') == y
          ) {
            box.style.color = 'white';
            box.innerText = 'X';
            box.classList.add('used');
          }
        }
      }
    }
    if (player1.myGameBoard.areSunk()) {
      window.alert('AI has won');
    }
  }
};

const aiShips = function () {
  let coordinates = [];
  const ships = [];
  for (let i = 0, length = 5; i < 4; i++, length--) {
    let x1; let y1; let x2; let
      y2;
    const align = getRandomInt(0, 2);
    do {
      x1 = getRandomInt(0, 8);
      y1 = getRandomInt(0, 8);
      if (align == 1) {
        while (x1 + length - 1 > 7) {
          x1 = getRandomInt(0, 8);
        }
        x2 = x1 + length - 1;
        y2 = y1;
      } else {
        while (y1 + length - 1 > 7) {
          y1 = getRandomInt(0, 8);
        }
        y2 = y1 + length - 1;
        x2 = x1;
      }
    } while (checkNeighbours(x1, x2, y1, y2, coordinates));
    ships.push({
      x1, x2, y1, y2,
    });
    coordinates = pushCoordinates(x1, x2, y1, y2, coordinates);
  }
  const player2 = Player(true);
  ships.forEach((x) => {
    player2.myGameBoard.placeShip(x.x1, x.y1, x.x2, x.y2);
  });
  return player2;
};

const checkNeighbours = function (x1, x2, y1, y2, coordinates) {
  for (let i = x1 - 1; i <= x2 + 1; i++) {
    for (let j = y1 - 1; j <= y2 + 1; j++) {
      for (const coordinate of coordinates) {
        if (coordinate.x == i && coordinate.y == j) {
          return true;
        }
      }
    }
  }

  return false;
};

const pushCoordinates = function (x1, x2, y1, y2, coordinates) {
  for (let i = x1; i <= x2; i++) {
    for (let j = y1; j <= y2; j++) {
      coordinates.push({ x: i, y: j });
    }
  }
  return coordinates;
};

const player2 = aiShips();
const htmlPart = function () {
  populate('Player1');
  populate('AI');
};
