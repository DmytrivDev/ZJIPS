import Splide from '@splidejs/splide';
import '@splidejs/splide/css';

const implementedSec = document.querySelector('.implemented');

// optionsSliders ======================================================

const optionsMapukrFirst = {
  type: 'fade',
  speed: 1000,
  perPage: 1,
  perMove: 1,
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
  speed: 1000,
  loop: true,
  perPage: 1,
  perMove: 1,
  updateOnMove: true,
  gap: '3rem',
  pagination: false,
  arrows: false,
  drag: false,
  swipe: false,
  keyboard: false,
  wheel: false,
  autoplay: true,
  interval: 4000,
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
      resetLoaderAnimation();
    }
  });
}

// ChildSliders ==============================================

const firstChildSliders = mapukrFirst?.querySelectorAll('.splide');
const secondChildSliders = mapukrSecond?.querySelectorAll('.splide');

const prevButton = implementedSec?.querySelector('.arrows__prev');
const nextButton = implementedSec?.querySelector('.arrows__next');

const loaderWrap = nextButton?.querySelector('.loader-wrap');

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
console.log(childSlidersFirst);

// Функция для сброса дочерних слайдов на первый
function resetChildSliders() {
  childSlidersFirst.forEach((slider, index) => {
    slider.destroy(); // Уничтожаем текущий экземпляр
    const sliderElement = firstChildSliders[index]; // DOM-элемент
    const newSlider = new Splide(sliderElement, {
      ...optionsChildSliders,
    }).mount();

    // Привязка события обновления номера слайда
    newSlider.on('move', () => {
      updateSlideNumber(index); // Обновляем номер слайда
    });
    childSlidersFirst[index] = newSlider; // Сохраняем новый экземпляр
  });

  childSlidersSecond.forEach((slider, index) => {
    slider.destroy();
    const sliderElement = secondChildSliders[index];
    const newSlider = new Splide(sliderElement, {
      ...optionsChildSliders,
    }).mount();

    newSlider.on('move', () => {
      updateSlideNumber(index);
    });
    childSlidersSecond[index] = newSlider;
  });

  updateSlideNumber(currentParentIndex);
}

// Функция для управления автопрокруткой
function toggleAutoplay(sliders, isPaused) {
  sliders.forEach(slider => {
    if (isPaused) {
      slider.Components.Autoplay.pause(); // Ставим на паузу
    } else {
      slider.Components.Autoplay.play(); // Возобновляем
    }
  });
}

// Функция для остановки или запуска автопрокрутки для всех слайдеров
function handleAutoplay(isPaused) {
  toggleAutoplay(childSlidersFirst, isPaused);
  toggleAutoplay(childSlidersSecond, isPaused);

  const loaders = loaderWrap?.querySelectorAll('div');
  loaders?.forEach(load => {
    if (isPaused) {
      load.style.animation = 'none';
    } else {
      void load.offsetWidth;
      load.style.animation = '';
    }
  });
}

function resetLoaderAnimation() {
  const loaders = loaderWrap?.querySelectorAll('div');
  loaders?.forEach(load => {
    load.style.animation = 'none';
    void load.offsetWidth;
    load.style.animation = '';
  });
}

[mapukrFirst, mapukrSecond].forEach(sliderElement => {
  if (sliderElement) {
    sliderElement.addEventListener('mouseenter', () => {
      handleAutoplay(true);
    });

    sliderElement.addEventListener('mouseleave', () => {
      handleAutoplay(false);
    });
  }
});

// Синхронизация дочерних слайдеров
function syncChildSliders(index, direction) {
  childSlidersFirst[index].go(direction);
  childSlidersSecond[index].go(direction);
}

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
      arrowsNumber.textContent = `${currentIndex} / ${totalSlides}`;
    }
  }
}

prevButton?.addEventListener('click', () => {
  syncChildSliders(currentParentIndex, '<');
  updateSlideNumber(currentParentIndex);
  resetLoaderAnimation();
});

nextButton?.addEventListener('click', () => {
  syncChildSliders(currentParentIndex, '>');
  updateSlideNumber(currentParentIndex);
  resetLoaderAnimation();
});

sliderFirst?.on('moved', newIndex => {
  currentParentIndex = newIndex;
  updateSlideNumber(currentParentIndex);
});

// Инициализация начального состояния `arrows__number`
updateSlideNumber(0);
