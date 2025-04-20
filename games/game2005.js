const uniqueImages = [
  "../photos/2005/1.jpg",
  "../photos/2005/2.jpg",
  "../photos/2005/3.jpg",
  "../photos/2005/4.jpg",
  "../photos/2005/5.jpg",
  "../photos/2005/6.jpg"
];

const imageCards = uniqueImages.concat(uniqueImages); // 6 pairs = 12 cards

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

let firstCard = null;
let lock = false;
let matches = 0;

const grid = document.getElementById("gameGrid");

function createCard(src) {
  const card = document.createElement("div");
  card.classList.add("card");

  const img = document.createElement("img");
  img.src = src;
  card.appendChild(img);

  card.addEventListener("click", () => {
    if (lock || card.classList.contains("matched") || card === firstCard) return;

    card.classList.add("revealed");

    if (!firstCard) {
      firstCard = card;
    } else {
      lock = true;
      if (firstCard.querySelector("img").src === card.querySelector("img").src) {
        firstCard.classList.add("matched");
        card.classList.add("matched");
        matches += 2;
        if (matches === 12) {
          setTimeout(() => {
            window.location.href = "../gallery.html?year=2005";
          }, 500);
        }
        firstCard = null;
        lock = false;
      } else {
        setTimeout(() => {
          firstCard.classList.remove("revealed");
          card.classList.remove("revealed");
          firstCard = null;
          lock = false;
        }, 1000);
      }
    }
  });

  return card;
}

function setupGame() {
  const shuffled = shuffle(imageCards.slice());
  shuffled.forEach(src => {
    grid.appendChild(createCard(src));
  });
}

setupGame();
