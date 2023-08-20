let numberOfElements = 0;
const WIDTH = 8;
const HEIGHT = 8;
let COLOR = '';

function initGame(width, height) {
  numberOfElements++;
  const positions = getRandomXYPositions(numberOfElements, width, height);
  document.querySelector('.main').innerHTML = '';
  document.querySelector('.missing').innerHTML = '';
  COLOR = getRandomRGBValue();

  setupGame('.main', width, HEIGHT, positions);
  setupGame(
    '.missing',
    width,
    height,
    positions,
    getExtraElements(positions, width, height)
  );

  const extraElementDiv = document.getElementById('extra-element');
  if (extraElementDiv) {
    extraElementDiv.addEventListener('click', () => {
      initGame(WIDTH, HEIGHT);
    });
  }
}

function setupGame(containerClass, width, height, positions, extraElement) {
  const containers = document.querySelectorAll(containerClass);
  containers.forEach((container) => {
    for (let i = 0; i < width; i++) {
      const row = document.createElement('div');
      row.classList.add('row');
      for (let j = 0; j < height; j++) {
        const column = document.createElement('div');
        const isExtraElement =
          extraElement && extraElement.x == i && extraElement.y == j;
        if (positions.has(`${i},${j}`) || isExtraElement) {
          if (isExtraElement) {
            column.id = 'extra-element';
          }
          column.classList.add('elm');
          column.style.backgroundColor = COLOR;
        } else {
          column.classList.add('empty');
        }
        row.append(column);
      }
      container.append(row);
    }
  });
}

function getRandomRGBValue() {
  var o = Math.round,
    r = Math.random,
    s = 255;
  return 'rgba(' + o(r() * s) + ',' + o(r() * s) + ',' + o(r() * s);
}

function getExtraElements(positions, maxX, maxY) {
  let x, y;
  console.log(positions);
  do {
    x = Math.floor(Math.random() * maxX);
    y = Math.floor(Math.random() * maxY);
  } while (positions.has(`${x},${y}`));
  return { x, y };
}

function getRandomXYPositions(maxPositions, maxX, maxY) {
  const positions = new Set();
  while (positions.size < maxPositions) {
    const x = Math.floor(Math.random() * maxX);
    const y = Math.floor(Math.random() * maxY);
    positions.add(`${x},${y}`);
  }
  return positions;
}

document.addEventListener('DOMContentLoaded', () => {
  initGame(WIDTH, HEIGHT);
});
