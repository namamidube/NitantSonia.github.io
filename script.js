const imagePaths = [
    'photos/1.jpg',
    'photos/2.jpg',
    'photos/3.jpg',
    'photos/4.jpg',
    'photos/5.jpg',
    'photos/6.jpg',
    'photos/7.jpg',
    'photos/8.jpg',
    'photos/9.jpg',
    'photos/10.jpg'
  ];
  
  const track = document.getElementById('slideshow-track');
  
  // Add and duplicate images
  imagePaths.forEach(path => {
    const img = document.createElement('img');
    img.src = path;
    track.appendChild(img);
  });
  imagePaths.forEach(path => {
    const img = document.createElement('img');
    img.src = path;
    track.appendChild(img);
  });
  
  let index = imagePaths.length; // Start from the second set
  const totalImages = imagePaths.length * 2;
  
  // Set initial position to the end of first set
  window.addEventListener('load', () => {
    const slideWidth = track.children[0].clientWidth;
    track.style.transition = 'none';
    track.style.transform = `translateX(-${index * slideWidth}px)`;
    track.style.transition = 'transform 1s ease-in-out';
  });
  
  function openYearGallery(year) {
  window.open(`games/game${year}.html?year=${year}`, '_blank');
}
  

  
  function slideImages() {
    const slideWidth = track.children[0].clientWidth;
    index--;
  
    track.style.transform = `translateX(-${index * slideWidth}px)`;
  
    if (index <= 0) {
      setTimeout(() => {
        track.style.transition = 'none';
        index = imagePaths.length;
        track.style.transform = `translateX(-${index * slideWidth}px)`;
        void track.offsetWidth; // reflow
        track.style.transition = 'transform 1s ease-in-out';
      }, 1000);
    }
  }
  
  setInterval(slideImages, 2000);

  // TIMELINE YEAR IMAGES SECTION
  const timelineImageData = {
    2001: 'photos/2001',
    2005: 'photos/2005',
    2010: 'photos/2010',
    2015: 'photos/2015',
    2020: 'photos/2020',
  };

  const timelineItems = document.querySelectorAll('.timeline-item');

  timelineItems.forEach(item => {
    const year = parseInt(item.querySelector('h3')?.innerText);
    const folder = timelineImageData[year];
    if (!folder) return;

    const imageWrapper = document.createElement('div');
    imageWrapper.classList.add('timeline-images');

    // Add 4 images from the folder
    for (let i = 1; i <= 4; i++) {
      const img = document.createElement('img');
      img.src = `${folder}/${i}.jpg`;
      imageWrapper.appendChild(img);
    }

    // Position based on content side
    const content = item.querySelector('.timeline-content');
    if (content.classList.contains('left')) {
      imageWrapper.classList.add('right-images');
      item.insertBefore(imageWrapper, item.querySelector('.timeline-dot'));
    } else {
      imageWrapper.classList.add('left-images');
      item.insertBefore(imageWrapper, content);
    }

  });

  function toggleMenu() {
    const panel = document.getElementById("sidePanel");
    if (panel.style.left === "0px") {
      panel.style.left = "-200px";
    } else {
      panel.style.left = "0px";
    }
  }
  
  // Navigate and highlight active link
  function navigateTo(page) {
    window.location.href = page;
  }
  
  // Close side panel on outside click
  document.addEventListener("click", function (event) {
    const panel = document.getElementById("sidePanel");
    const menuButton = document.querySelector(".menu-button");
    if (!panel.contains(event.target) && !menuButton.contains(event.target)) {
      panel.style.left = "-200px";
    }
  });
  
  // Highlight active item (based on file name)
  window.onload = function () {
    const path = window.location.pathname.split("/").pop();
    const items = document.querySelectorAll(".side-panel li");
  
    items.forEach(item => {
      if (item.textContent.toLowerCase().includes("home") && path === "index.html") {
        item.classList.add("active");
      } else if (item.textContent.toLowerCase().includes("about") && path === "about.html") {
        item.classList.add("active");
      }
    });
  };