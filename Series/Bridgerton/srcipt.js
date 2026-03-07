    // Función para las temporadas
    function toggleChapters(id) {
      const element = document.getElementById(id);
      element.style.display = element.style.display === 'flex' ? 'none' : 'flex';
  }

 // Función para el nuevo menú
 document.addEventListener("DOMContentLoaded", function() {
  const menuButtons = document.querySelectorAll('.menu-btn');
  
  menuButtons.forEach(button => {
      button.addEventListener('click', function() {
          const submenu = this.nextElementSibling;
          if (submenu) {
              submenu.classList.toggle('open');
          }
      });
  });

  // Cierra todos los submenús al hacer clic fuera del menú
  document.addEventListener('click', function(e) {
      if (!e.target.closest('.menu-container')) {
          document.querySelectorAll('.submenu').forEach(sub => {
              sub.classList.remove('open');
          });
      }
  });
});
const slider = document.querySelector('.episodios-slider');
const items = document.querySelectorAll('.episodio');
const dots = document.querySelectorAll('.dot');
let currentIndex = 0;
let autoSlideInterval;

function updateSlider() {
  slider.style.transform = `translateX(-${currentIndex * 100}%)`;
  dots.forEach((dot, index) => {
    dot.classList.toggle('active', index === currentIndex);
  });
}

function startAutoSlide() {
  autoSlideInterval = setInterval(() => {
    currentIndex = (currentIndex + 1) % items.length;
    updateSlider();
  }, 4000);
}

startAutoSlide();

slider.addEventListener('mouseenter', () => {
  clearInterval(autoSlideInterval);
});

slider.addEventListener('mouseleave', startAutoSlide);

dots.forEach((dot, index) => {
  dot.addEventListener('click', () => {
    currentIndex = index;
    updateSlider();
    clearInterval(autoSlideInterval);
    startAutoSlide();
  });
});
const charSlider = document.querySelector('.characters-container');
const charItems = document.querySelectorAll('.character');
const charDots = document.querySelectorAll('.char-dot');
let charCurrentIndex = 0;
let charAutoSlideInterval;

function updateCharSlider() {
  charSlider.style.transform = `translateX(-${charCurrentIndex * 100}%)`;
  charDots.forEach((dot, index) => {
    dot.classList.toggle('active', index === charCurrentIndex);
  });
}

function startCharAutoSlide() {
  charAutoSlideInterval = setInterval(() => {
    charCurrentIndex = (charCurrentIndex + 1) % charItems.length;
    updateCharSlider();
  }, 3500); // Cambia cada 3.5 segundos
}

startCharAutoSlide();

charSlider.addEventListener('mouseenter', () => {
  clearInterval(charAutoSlideInterval);
});

charSlider.addEventListener('mouseleave', startCharAutoSlide);

charDots.forEach((dot, index) => {
  dot.addEventListener('click', () => {
    charCurrentIndex = index;
    updateCharSlider();
    clearInterval(charAutoSlideInterval);
    startCharAutoSlide();
  });
});
const crewSlider = document.querySelector('.crew-container');
const crewItems = document.querySelectorAll('.crew-member');
const crewDots = document.querySelectorAll('.crew-dot');
let crewCurrentIndex = 0;
let crewAutoSlideInterval;

function updateCrewSlider() {
  crewSlider.style.transform = `translateX(-${crewCurrentIndex * 100}%)`;
  crewDots.forEach((dot, index) => {
    dot.classList.toggle('active', index === crewCurrentIndex);
  });
}

function startCrewAutoSlide() {
  crewAutoSlideInterval = setInterval(() => {
    crewCurrentIndex = (crewCurrentIndex + 1) % crewItems.length;
    updateCrewSlider();
  }, 4000);
}

startCrewAutoSlide();

crewSlider.addEventListener('mouseenter', () => {
  clearInterval(crewAutoSlideInterval);
});

crewSlider.addEventListener('mouseleave', startCrewAutoSlide);

crewDots.forEach((dot, index) => {
  dot.addEventListener('click', () => {
    crewCurrentIndex = index;
    updateCrewSlider();
    clearInterval(crewAutoSlideInterval);
    startCrewAutoSlide();
  });
});