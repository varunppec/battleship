const Ship = function (length, x1, y1, x2, y2) {
  let hitstatus = [];
  const align = x2 - x1 ? 1 : 0;
  hitstatus.length = length;
  hitstatus.fill(false);
  const hit = (no) => {
    hitstatus[no] = true;
    return hitstatus;
  };
  const isSunk = () => {
    let sunkStatus = true;
    hitstatus.forEach((x) => {
      if (x == false) sunkStatus = false;
    });
    return sunkStatus;
  };
  const getCoordinates = () => {
    return { x1, x2, y1, y2 };
  };
  return { length, isSunk, hit, getCoordinates, align, hitstatus };
};

module.exports = Ship;
