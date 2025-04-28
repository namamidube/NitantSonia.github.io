const imageBase = '../photos/2001';
const tileCount = 9;
const tray = document.getElementById('tray');
const puzzle = document.getElementById('puzzle');
const winMessage = document.getElementById('winMessage');

let order = [...Array(tileCount).keys()].map(i => i + 1); // [1..9]
let selectedTile = null; // For mobile click-select
shuffle(order);

function createPuzzleBoard() {
  puzzle.innerHTML = '';
  for (let i = 0; i < tileCount; i++) {
    const emptySlot = document.createElement('div');
    emptySlot.classList.add('drop-slot');
    emptySlot.dataset.slot = i;

    emptySlot.addEventListener('dragover', dragOver);
    emptySlot.addEventListener('drop', drop);
    emptySlot.addEventListener('click', slotClick); // Added for tap-to-place

    puzzle.appendChild(emptySlot);
  }
}

function createTileTray() {
  tray.innerHTML = '';
  order.forEach(num => {
    const tile = document.createElement('div');
    tile.classList.add('tile');
    tile.setAttribute('draggable', 'true');
    tile.dataset.number = num;
    tile.style.backgroundImage = `url(${imageBase}/1_${num}.jpg)`;

    tile.addEventListener('dragstart', dragStart);
    tile.addEventListener('click', tileClick); // Added for tap-to-select

    tray.appendChild(tile);
  });
}

function tileClick(e) {
  // Select a tile by tapping it
  if (selectedTile) {
    selectedTile.classList.remove('selected');
  }
  selectedTile = e.target;
  selectedTile.classList.add('selected');
}

function slotClick(e) {
  if (selectedTile && e.target.classList.contains('drop-slot') && e.target.children.length === 0) {
    e.target.appendChild(selectedTile);
    selectedTile.classList.remove('selected');
    selectedTile = null;
    checkWin();
  }
}

function dragStart(e) {
  e.dataTransfer.setData('text/plain', e.target.dataset.number);
}

function dragOver(e) {
  e.preventDefault();
}

function drop(e) {
  e.preventDefault();
  const number = e.dataTransfer.getData('text/plain');
  const tile = document.querySelector(`.tile[data-number='${number}']`);

  if (e.target.classList.contains('drop-slot') && e.target.children.length === 0) {
    e.target.appendChild(tile);
  }
  checkWin();
}

function checkWin() {
  const slots = document.querySelectorAll('.drop-slot');
  const current = Array.from(slots).map(slot => {
    const tile = slot.querySelector('.tile');
    return tile ? Number(tile.dataset.number) : 0;
  });

  const isCorrect = current.every((num, idx) => num === idx + 1);
  if (isCorrect) {
    winMessage.classList.remove('hidden');
    setTimeout(() => {
      window.location.href = '../gallery.html?year=2001';
    }, 1500);
  }
}

function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
}

createPuzzleBoard();
createTileTray();
