const Player = require("./player").method1;

const shipPlacing = function () {
  const container = document.querySelector(".container");
  const black = document.createElement("div");
  black.classList.add("black");
  const form_header = document.createElement('div');
  form_header.classList.add('form_header');
  form_header.innerText = 'Place the Ships';
  const form_box = document.createElement("div");
  form_box.classList.add("form_box");
  const form_grid = document.createElement("div");
  form_grid.classList.add("form_grid");
  const ships = document.createElement("div");
  ships.classList.add("ships");
  const submit = document.createElement("input");
  submit.type = "submit";
  submit.id = "submit";
  submit.value = 'Submit';
  let player1;
  submit.onclick = async function (e) {
    e.preventDefault();
    player1 = await submitShips();
    return player1;
  };
  form_box.append(form_header, form_grid, ships, submit);
  black.append(form_box);
  container.append(black);
  createGrid();
  createShips();
};

const createGrid = function () {
  const form_grid = document.querySelector(".form_grid");
  const box_holder = document.createElement("div");
  box_holder.classList.add("box_holder");
  box_holder.style.height = `${8 * 36}px`;
  box_holder.style.width = `${8 * 36}px`;
  form_grid.append(box_holder);
  for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
      const div = document.createElement("div");
      div.classList.add("formbox");
      div.setAttribute("x", i);
      div.setAttribute("y", j);
      div.addEventListener("dragover", (e) => {
        e.preventDefault();
        div.classList.add("drop-zone--over");
      });
      div.addEventListener("dragleave", (e) => {
        e.preventDefault();
        div.classList.remove("drop-zone--over");
      });
      div.addEventListener("drop", (e) => {
        e.preventDefault();
        const classname = e.dataTransfer.getData("text/plain");
        const droppedElement = document.getElementsByClassName(classname)[0];
        if (
          !(
            (parseInt(droppedElement.getAttribute("length")) + i > 8 &&
              droppedElement.getAttribute("align") == "true") ||
            (parseInt(droppedElement.getAttribute("length")) + j > 8 &&
              droppedElement.getAttribute("align") == "false") ||
            checkNeighbours(div, droppedElement)
          )
        ) {
          checkNeighbours(div, droppedElement);
          droppedElement.style.position = "absolute";
          div.append(droppedElement);
          droppedElement.classList.add("placed");
          div.classList.remove("drop-zone--over");
          droppedElement.addEventListener("click", (e) => {
            e.preventDefault();
            e.stopImmediatePropagation();
            const rotateValue = parseInt(
              droppedElement.parentElement.getAttribute("y")
            );
            if (
              droppedElement.getAttribute("align") == "true" &&
              parseInt(droppedElement.getAttribute("length")) -
                1 +
                rotateValue <
                8
            ) {
              droppedElement.style.transform = "rotate(90deg)";
              droppedElement.style.transformOrigin = `${
                (32 * droppedElement.getAttribute("length")) / 2
              }px ${(32 * droppedElement.getAttribute("length")) / 2}px 0px`;
              droppedElement.setAttribute("align", false);
              if (
                checkNeighbours(droppedElement.parentElement, droppedElement)
              ) {
                droppedElement.style.transform = "";
                droppedElement.setAttribute("align", true);
              }
            } else {
              droppedElement.style.transform = "";
              droppedElement.setAttribute("align", true);
              if (
                checkNeighbours(droppedElement.parentElement, droppedElement)
              ) {
                droppedElement.style.transform = "rotate(90deg)";
                droppedElement.style.transformOrigin = `${
                  (32 * droppedElement.getAttribute("length")) / 2
                }px ${(32 * droppedElement.getAttribute("length")) / 2}px 0px`;
                droppedElement.setAttribute("align", false);
              }
            }
          });
        } else {
          div.classList.remove("drop-zone--over");
        }
      });
      box_holder.append(div);
    }
  }
};

const createShips = function () {
  const ships = document.querySelector(".ships");
  const fiver = document.createElement("div");
  fiver.classList.add("fiver");
  const fourer = document.createElement("div");
  fourer.classList.add("fourer");
  const threer = document.createElement("div");
  threer.classList.add("threer");
  const twoer = document.createElement("div");
  twoer.classList.add("twoer");
  ships.append(fiver, fourer, threer, twoer);
  fiver.setAttribute("draggable", true);
  fourer.setAttribute("draggable", true);
  threer.setAttribute("draggable", true);
  twoer.setAttribute("draggable", true);
  fiver.setAttribute("align", true);
  fourer.setAttribute("align", true);
  threer.setAttribute("align", true);
  twoer.setAttribute("align", true);
  fillShips(fiver, 5);
  fillShips(fourer, 4);
  fillShips(threer, 3);
  fillShips(twoer, 2);
};

const fillShips = function (ship, length) {
  for (let i = 0; i < length; i++) {
    const div = document.createElement("div");
    div.classList.add("ship-boxes");
    div.style.backgroundColor = "rgba(255, 255, 255, 0.7)";
    ship.append(div);
  }
  ship.setAttribute("length", length);
  ship.addEventListener("dragstart", (e) => {
    e.dataTransfer.setData("text/plain", ship.className);
  });
};

const checkNeighbours = function (div, droppedElement) {
  const placedShips = document.querySelectorAll(".placed");
  for (let z of placedShips) {
    if (z == droppedElement) {
      continue;
    }
    const z1 = parseInt(z.parentElement.getAttribute("x"));
    const z2 = parseInt(z.parentElement.getAttribute("y"));
    const length_z = parseInt(z.getAttribute("length"));
    const z_align = z.getAttribute("align");

    const length = parseInt(droppedElement.getAttribute("length"));
    const x = parseInt(div.getAttribute("x"));
    const y = parseInt(div.getAttribute("y"));
    const align = droppedElement.getAttribute("align");
    for (let i = x - 1; i <= x + length && align == "true"; i++) {
      for (let j = y - 1; j <= y + 1; j++) {
        for (let k = 0; k < length_z; k++) {
          if (i == z1 + k && j == z2 && z_align == "true") {
            return true;
          }
          if (i == z1 && j == z2 + k && z_align == "false") {
            return true;
          }
        }
      }
    }

    for (let i = x - 1; i <= x + 1 && align == "false"; i++) {
      for (let j = y - 1; j <= y + length; j++) {
        for (let k = 0; k < length_z; k++) {
          if (i == z1 + k && j == z2 && z_align == "true") {
            return true;
          }

          if (i == z1 && j == z2 + k && z_align == "false") {
            return true;
          }
        }
      }
    }
  }
};

const submitShips = function () {
  const player1 = Player();
  const placedShips = document.querySelectorAll(".placed");
  if (placedShips.length == 4) {
    for (let ship of placedShips) {
      const length = parseInt(ship.getAttribute("length"));
      const align = ship.getAttribute("align");
      const x1 = parseInt(ship.parentElement.getAttribute("x"));
      const y1 = parseInt(ship.parentElement.getAttribute("y"));
      let x2, y2;
      if (align == 'true') {
        x2 = x1 + length - 1;
        y2 = y1;
      } else {
        y2 = y1 + length - 1;
        x2 = x1;
      }
      player1.myGameBoard.placeShip(x1, y1, x2, y2);
    }
  }
  else {
    return false;
  }
  return player1;
};

module.exports = { m1: shipPlacing, m2: submitShips };
