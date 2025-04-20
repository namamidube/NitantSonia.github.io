const countDisplay = document.getElementById('countDisplay');
const gameArea = document.getElementById('gameArea');
const imageContainer = document.getElementById('imageContainer');

let clickCount = 0;
const maxClicks = 5;
let moveTimeout;

const imageSources = [
  '../photos/2020/image1.jpg', // safe image
  '../photos/2020/image2.jpg', // game over image
  '../photos/2020/image3.jpg'  // game over image
];

// Helper to create and position an image
function createImage(src, index) {
  const img = document.createElement('img');
  img.src = src;
  img.style.position = 'absolute';
  img.style.width = '80px';
  img.style.height = '80px';
  img.style.cursor = 'pointer';

  const areaWidth = gameArea.clientWidth;
  const areaHeight = gameArea.clientHeight;
  const maxX = areaWidth - 100;
  const maxY = areaHeight - 100;

  img.style.left = `${Math.random() * maxX}px`;
  img.style.top = `${Math.random() * maxY}px`;

  img.addEventListener('click', () => handleClick(index));
  return img;
}

function handleClick(index) {
  clearTimeout(moveTimeout);

  if (index === 0) {
    clickCount++;
    countDisplay.textContent = `Clicks: ${clickCount}`;
    if (clickCount >= maxClicks) {
      setTimeout(() => {
        window.location.href = '../gallery.html?year=2020';
      }, 300);
    } else {
      generateImages(); // Move to new random positions
    }
  } else {
    alert('Game Over!');
    resetGame(); // Restart game
  }
}

function generateImages() {
  imageContainer.innerHTML = '';

  const placedPositions = [];
  const minDistance = 100; // Minimum distance between images (in pixels)

  const shuffled = [...imageSources]
    .map((src, i) => ({ src, i }))
    .sort(() => Math.random() - 0.5);

  shuffled.forEach(({ src, i }) => {
    let imgEl;
    let tries = 0;

    do {
      imgEl = createImage(src, i);
      var imgX = parseFloat(imgEl.style.left);
      var imgY = parseFloat(imgEl.style.top);
      var isOverlapping = placedPositions.some(([x, y]) => {
        const dx = imgX - x;
        const dy = imgY - y;
        return Math.sqrt(dx * dx + dy * dy) < minDistance;
      });
      tries++;
    } while (isOverlapping && tries < 50);

    if (tries < 50) {
      placedPositions.push([imgX, imgY]);
      imageContainer.appendChild(imgEl);
    }
  });

  moveTimeout = setTimeout(generateImages, 1000);
}


function resetGame() {
  clickCount = 0;
  countDisplay.textContent = `Clicks: ${clickCount}`;
  generateImages();
}

// Start the game
generateImages();
