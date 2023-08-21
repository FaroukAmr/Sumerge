var numberOfElements = 0;
var WIDTH = 8;
var HEIGHT = 8;
var COLOR = '';
var currentTime = 0;
function initGame(width, height) {
    if (numberOfElements < width * height) {
        numberOfElements++;
        var positions = getRandomXYPositions(numberOfElements, width, height);
        document.querySelector('.main').innerHTML = '';
        document.querySelector('.missing').innerHTML = '';
        COLOR = getRandomRGBValue();
        setupGame('.main', width, HEIGHT, positions);
        setupGame('.missing', width, height, positions, getExtraElements(positions, width, height));
        var extraElementDiv = document.getElementById('extra-element');
        if (extraElementDiv) {
            extraElementDiv.addEventListener('click', function () {
                initGame(WIDTH, HEIGHT);
            });
        }
        setInterval(function () {
            currentTime += 0.1;
            updateTimerDisplay();
        }, 100);
    }
}
function setupGame(containerClass, width, height, positions, extraElement) {
    var containers = document.querySelectorAll(containerClass);
    containers.forEach(function (container) {
        for (var i = 0; i < width; i++) {
            var row = document.createElement('div');
            row.classList.add('row');
            for (var j = 0; j < height; j++) {
                var column = document.createElement('div');
                var isExtraElement = extraElement && extraElement.x === i && extraElement.y === j;
                if (positions.has("".concat(i, ",").concat(j)) || isExtraElement) {
                    if (isExtraElement) {
                        column.id = 'extra-element';
                    }
                    column.classList.add('elm');
                    column.style.backgroundColor = COLOR;
                }
                else {
                    column.classList.add('empty');
                }
                row.append(column);
            }
            container.append(row);
        }
    });
}
function getRandomRGBValue() {
    var o = Math.round;
    var r = Math.random;
    var s = 255;
    return "rgba(".concat(o(r() * s), ",").concat(o(r() * s), ",").concat(o(r() * s), ")");
}
function getExtraElements(positions, maxX, maxY) {
    var x, y;
    do {
        x = Math.floor(Math.random() * maxX);
        y = Math.floor(Math.random() * maxY);
    } while (positions.has("".concat(x, ",").concat(y)));
    return { x: x, y: y };
}
function getRandomXYPositions(maxPositions, maxX, maxY) {
    var positions = new Set();
    while (positions.size < maxPositions) {
        var x = Math.floor(Math.random() * maxX);
        var y = Math.floor(Math.random() * maxY);
        positions.add("".concat(x, ",").concat(y));
    }
    return positions;
}
function updateTimerDisplay() {
    var timerElement = document.getElementById('timer');
    if (timerElement) {
        timerElement.innerHTML = "<h2>Time: ".concat(currentTime.toFixed(2), " seconds</h2>");
    }
}
document.addEventListener('DOMContentLoaded', function () {
    initGame(WIDTH, HEIGHT);
});
