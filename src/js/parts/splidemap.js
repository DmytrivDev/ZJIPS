import Splide from '@splidejs/splide';
import '@splidejs/splide/css';

const implementedSec = document.querySelector('.implemented');

// optionsSliders ======================================================

const optionsMapukrFirst = {
  type: 'fade',
  speed: 300,
  perPage: 1,
  pagination: false, // Отключаем пагинацию
  arrows: false, // Убираем стрелки
  drag: false, // Отключаем перетаскивание слайда мышью
  swipe: false, // Отключаем свайпы на мобильных устройствах
  keyboard: false, // Отключаем управление стрелками клавиатуры
  wheel: false, // Отключаем прокрутку колесом мыши
  updateOnMove: true,
};
const optionsChildSliders = {
  type: 'loop',
  speed: 500,
  loop: true,
  perPage: 1,
  pagination: false,
  arrows: false,
  drag: false,
  swipe: false,
  wheel: false,
  // autoplay: true,
  interval: 4000,
  resetProgress: true,
  pauseOnHover: false,
};

// mapukrSliders ======================================================

const mapukrFirst = document.getElementById('mapukr-slider-first');
const mapukrSecond = document.getElementById('mapukr-slider-second');

let sliderFirst;
if (mapukrFirst) {
  sliderFirst = new Splide(mapukrFirst, {
    ...optionsMapukrFirst,
  }).mount();
}

let sliderSecond;
if (mapukrSecond) {
  sliderSecond = new Splide(mapukrSecond, {
    ...optionsMapukrFirst,
  }).mount();
}

function syncSliders(newIndex) {
  sliderFirst.go(newIndex);
  sliderSecond.go(newIndex);
}

export function handleRegionClick(regionId) {
  const slides = sliderFirst.Components.Slides;

  slides.forEach((slide, index) => {
    const slideId = slide.slide?.dataset.id;
    if (slideId === regionId) {
      syncSliders(index);
      resetChildSliders();
    }
  });
}

// ChildSliders ==============================================

const firstChildSliders = mapukrFirst?.querySelectorAll('.splide');
const secondChildSliders = mapukrSecond?.querySelectorAll('.splide');

// Массивы для хранения дочерних слайдеров
const childSlidersFirst = [];
const childSlidersSecond = [];

// Инициализация дочерних слайдеров
firstChildSliders?.forEach((child, index) => {
  const childSlider = new Splide(child, {
    ...optionsChildSliders,
  }).mount();

  childSlider.on('move', () => {
    updateSlideNumber(index);
  });

  childSlidersFirst[index] = childSlider;
});

secondChildSliders?.forEach((child, index) => {
  const childSlider = new Splide(child, {
    ...optionsChildSliders,
  }).mount();

  childSlider.on('move', () => {
    updateSlideNumber(index);
  });

  childSlidersSecond[index] = childSlider;
});

// Функция для сброса дочерних слайдов на первый
function resetChildSliders() {
  setTimeout(() => {
    childSlidersFirst.forEach(slider => slider.go(0));
    childSlidersSecond.forEach(slider => slider.go(0));
  }, 300);
}

// Синхронизация дочерних слайдеров
function syncChildSliders(index, direction) {
  childSlidersFirst[index].go(direction);
  childSlidersSecond[index].go(direction);
}

const prevButton = implementedSec?.querySelector('.arrows__prev');
const nextButton = implementedSec?.querySelector('.arrows__next');

// Текущее состояние главного слайдера
let currentParentIndex = 0;

function updateSlideNumber(parentIndex) {
  if (childSlidersFirst.length !== 0) {
    const currentChildSlider = childSlidersFirst[parentIndex];
    const currentIndex = currentChildSlider.index + 1;
    const totalSlides = currentChildSlider.Components.Elements.slides.length;

    const parentSlide = firstChildSliders[parentIndex];

    const arrowsNumber = parentSlide
      .closest('.splide__slide')
      .querySelector('.arrows__number');

    if (arrowsNumber) {
      arrowsNumber.textContent = `${currentIndex}/${totalSlides}`;
    }
  }
}

prevButton?.addEventListener('click', () => {
  syncChildSliders(currentParentIndex, '<');
  updateSlideNumber(currentParentIndex);
});

nextButton?.addEventListener('click', () => {
  syncChildSliders(currentParentIndex, '>');
  updateSlideNumber(currentParentIndex);
});

sliderFirst?.on('moved', newIndex => {
  currentParentIndex = newIndex;
  updateSlideNumber(currentParentIndex);
});

// Инициализация начального состояния `arrows__number`
updateSlideNumber(0);
