let numberOfElements: number = 0;
const WIDTH: number = 8;
const HEIGHT: number = 8;
let COLOR: string = '';
let currentTime: number = 0;

interface XYPosition {
  x: number;
  y: number;
}

function initGame(width: number, height: number): void {
  if (numberOfElements < width * height) {
    numberOfElements++;
    const positions: Set<string> = getRandomXYPositions(
      numberOfElements,
      width,
      height
    );
    (document.querySelector('.main') as HTMLElement).innerHTML = '';
    (document.querySelector('.missing') as HTMLElement).innerHTML = '';
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
    setInterval(() => {
      currentTime += 0.1;
      updateTimerDisplay();
    }, 100);
  }
}

function setupGame(
  containerClass: string,
  width: number,
  height: number,
  positions: Set<string>,
  extraElement?: XYPosition
): void {
  const containers: NodeListOf<HTMLElement> =
    document.querySelectorAll(containerClass);
  containers.forEach((container) => {
    for (let i = 0; i < width; i++) {
      const row: HTMLDivElement = document.createElement('div');
      row.classList.add('row');
      for (let j = 0; j < height; j++) {
        const column: HTMLDivElement = document.createElement('div');
        const isExtraElement: boolean | undefined =
          extraElement && extraElement.x === i && extraElement.y === j;
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

function getRandomRGBValue(): string {
  const o = Math.round;
  const r = Math.random;
  const s = 255;
  return `rgba(${o(r() * s)},${o(r() * s)},${o(r() * s)})`;
}

function getExtraElements(
  positions: Set<string>,
  maxX: number,
  maxY: number
): XYPosition {
  let x: number, y: number;
  do {
    x = Math.floor(Math.random() * maxX);
    y = Math.floor(Math.random() * maxY);
  } while (positions.has(`${x},${y}`));
  return { x, y };
}

function getRandomXYPositions(
  maxPositions: number,
  maxX: number,
  maxY: number
): Set<string> {
  const positions: Set<string> = new Set();
  while (positions.size < maxPositions) {
    const x: number = Math.floor(Math.random() * maxX);
    const y: number = Math.floor(Math.random() * maxY);
    positions.add(`${x},${y}`);
  }
  return positions;
}

function updateTimerDisplay(): void {
  const timerElement: HTMLElement | null = document.getElementById('timer');
  if (timerElement) {
    timerElement.innerHTML = `<h2>Time: ${currentTime.toFixed(2)} seconds</h2>`;
  }
}

document.addEventListener('DOMContentLoaded', () => {
  initGame(WIDTH, HEIGHT);
});
