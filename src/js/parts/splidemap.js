import Splide from '@splidejs/splide';
import '@splidejs/splide/css';

const initSliderMap = (container, options = {}) => {
  const sliderElement = container.querySelector('.splide');
  if (!sliderElement) return;

  const splide = new Splide(sliderElement, {
    type: 'slide',
    speed: 1000,
    pagination: false,
    updateOnMove: true,

    ...options,
  }).mount();

  const arrows = {
    next: container.querySelector('.arrows__next'),
    prev: container.querySelector('.arrows__prev'),
    number: container.querySelector('.arrows__number'),
  };

  const updateSlideState = () => {
    const totalSlides = Math.ceil(
      splide.Components.Slides.getLength() / splide.options.perPage
    );
    const currentIndex = Math.ceil(splide.index / splide.options.perPage) + 1;

    const isAtStart = splide.index === 0;
    const isAtEnd = splide.index === splide.Components.Controller.getEnd();

    if (arrows.next && arrows.prev) {
      arrows.next.disabled = isAtEnd;
      arrows.prev.disabled = isAtStart;
      arrows.next.classList.toggle('isDisabled', isAtEnd);
      arrows.prev.classList.toggle('isDisabled', isAtStart);
    }

    if (arrows.number) {
      arrows.number.textContent = `${currentIndex}/${totalSlides}`;
    }
  };

  arrows.next?.addEventListener('click', () => splide.go('>'));
  arrows.prev?.addEventListener('click', () => splide.go('<'));

  if (splide.options.type === 'fade') {
    splide.on('moved', updateSlideState);
  } else {
    splide.on('move', updateSlideState);
  }

  window.addEventListener('resize', updateSlideState);

  updateSlideState();
};

const implementedSec = document.querySelector('.implemented');

const mapukrFirst = document.getElementById('mapukr-slider-first');
const sliderFirst = new Splide(mapukrFirst, {
  type: 'fade',
  perPage: 1,
  pagination: false, // Отключаем пагинацию
  arrows: false, // Убираем стрелки
  drag: false, // Отключаем перетаскивание слайда мышью
  swipe: false, // Отключаем свайпы на мобильных устройствах
  keyboard: false, // Отключаем управление стрелками клавиатуры
  wheel: false, // Отключаем прокрутку колесом мыши
  updateOnMove: true,
}).mount();

const mapukrSecond = document.getElementById('mapukr-slider-second');
const sliderSecond = new Splide(mapukrSecond, {
  type: 'fade',
  perPage: 1,
  pagination: false,
  arrows: false,
  drag: false,
  swipe: false,
  keyboard: false,
  wheel: false,
  updateOnMove: true,
}).mount();

const syncSliders = newIndex => {
  sliderFirst.go(newIndex);
  sliderSecond.go(newIndex);
};

export function handleRegionClick(regionId) {
  const slides = sliderFirst.Components.Slides;

  slides.forEach((slide, index) => {
    const slideId = slide.slide?.dataset.id;
    if (slideId === regionId) {
      syncSliders(index);
    }
  });
}

const firstChild = mapukrFirst.querySelectorAll('.splide');
firstChild.forEach(child => {
  const sliderChild = new Splide(child, {
    type: 'slide',
    perPage: 1,
    pagination: false,
    drag: false,
    swipe: false,
    keyboard: false,
    wheel: false,
    updateOnMove: true,
  }).mount();
});

const secondChild = mapukrSecond.querySelectorAll('.splide');
secondChild.forEach(child => {
  const sliderChild = new Splide(child, {
    type: 'slide',
    perPage: 1,
    pagination: false,
    drag: false,
    swipe: false,
    keyboard: false,
    wheel: false,
    updateOnMove: true,
  }).mount();
});
