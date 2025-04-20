const images = {
  image1: '../photos/2015/image1.jpg', // Full image
  image2: '../photos/2015/image2.jpg',
  image3: '../photos/2015/image3.jpg',
};

let selectedImage; // Full image
let correctZoomedImage; // Correct zoomed image
let zoomedImages = [];
let zoomCropData = []; // To store the crop data for each zoomed image

// Game setup function
function setupGame() {
  // Select a random full image (image1, image2, or image3)
  const imageKeys = Object.keys(images);
  const selectedKey = imageKeys[Math.floor(Math.random() * imageKeys.length)];
  selectedImage = images[selectedKey];

  // Set the full image in the game area
  document.getElementById('full-image').src = selectedImage;

  // Create the zoomed-in images (correct one + 2 incorrect ones)
  createZoomedImages(selectedKey);
}

// Function to create zoomed-in images for different images
function createZoomedImages(selectedImageKey) {
  const zoomedImageData = getZoomedImagesFor(selectedImageKey);

  const zoomedImageContainers = [
    document.getElementById('zoomed-image1'),
    document.getElementById('zoomed-image2'),
    document.getElementById('zoomed-image3')
  ];

  // Shuffle the zoomed images data to randomize which zoomed-in image is which
  shuffleArray(zoomedImageData);

  zoomedImageContainers.forEach((container, index) => {
    container.width = 120;
    container.height = 120;

    const image = new Image();
    image.src = zoomedImageData[index].src;
    image.onload = () => {
      const ctx = container.getContext('2d');
      ctx.clearRect(0, 0, container.width, container.height);

      // Crop a zoomed area from the image (centered crop for now)
      const cropSize = 300;
      const cropX = Math.random() * (image.width - cropSize);
      const cropY = Math.random() * (image.height - cropSize);

      // Store crop data for later use in red box
      zoomCropData[index] = {
        cropX,
        cropY,
        cropSize,
        imageWidth: image.width,
        imageHeight: image.height,
      };

      ctx.drawImage(
        image,
        cropX, cropY, cropSize, cropSize, 
        0, 0, container.width, container.height // destination
      );
    };

    container.dataset.correct = zoomedImageData[index].correct;
  });

  document.getElementById('feedback-text').textContent = '';
}

// Function to get zoomed images for a given image key
function getZoomedImagesFor(correctImageKey) {
  // All images
  const allImages = Object.keys(images);

  // Get the correct zoomed image and two incorrect images
  const correctImage = images[correctImageKey];

  // Get the other images to make them incorrect options
  const incorrectImages = allImages.filter(image => image !== correctImageKey).map(image => images[image]);

  // Now, we have one correct image and two incorrect ones
  return [
    { src: correctImage, correct: true },
    { src: incorrectImages[0], correct: false },
    { src: incorrectImages[1], correct: false },
  ];
}

// Shuffle function (Fisher-Yates algorithm)
function shuffleArray(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]]; // Swap elements
  }
}

// Event listeners for each zoomed image (canvas)
document.getElementById('zoomed-image1').addEventListener('click', () => checkAnswer(0));
document.getElementById('zoomed-image2').addEventListener('click', () => checkAnswer(1));
document.getElementById('zoomed-image3').addEventListener('click', () => checkAnswer(2));

function checkAnswer(selectedIndex) {
  const feedbackText = document.getElementById('feedback-text');
  const selectedCanvas = document.querySelector(`#zoomed-image${selectedIndex + 1}`);

  if (selectedCanvas.dataset.correct === 'true') {
    feedbackText.textContent = 'Correct! Well done!';
    feedbackText.classList.remove('incorrect');
    feedbackText.classList.add('correct');

    // 🎯 Draw red box on full image
    drawRedBoxOnFullImage(zoomCropData[selectedIndex]);

    // ⏳ Delay redirect by 2s so user can see the red box
    setTimeout(() => {
      window.location.href = '../gallery.html?year=2015'; // Redirect after 2s
    }, 2000);
  } else {
    feedbackText.textContent = 'Incorrect, try again!';
    feedbackText.classList.remove('correct');
    feedbackText.classList.add('incorrect');
  }
}

function drawRedBoxOnFullImage(cropData) {
  const fullImg = document.getElementById('full-image');
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');

  // Set canvas size to match full image dimensions
  canvas.width = fullImg.width;
  canvas.height = fullImg.height;

  // Draw the image on canvas
  const tempImage = new Image();
  tempImage.src = fullImg.src;
  tempImage.onload = () => {
    ctx.drawImage(tempImage, 0, 0, canvas.width, canvas.height);

    // Calculate scale ratios
    const scaleX = canvas.width / cropData.imageWidth;
    const scaleY = canvas.height / cropData.imageHeight;

    // Draw red rectangle
    ctx.strokeStyle = 'red';
    ctx.lineWidth = 3;
    ctx.strokeRect(
      cropData.cropX * scaleX,
      cropData.cropY * scaleY,
      cropData.cropSize * scaleX,
      cropData.cropSize * scaleY
    );

    // Replace the image with the canvas
    fullImg.replaceWith(canvas);
    canvas.id = 'full-image'; // Keep the ID
  };
}

// Start the game
setupGame();
