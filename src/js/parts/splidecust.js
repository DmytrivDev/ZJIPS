import Splide from '@splidejs/splide';
import '@splidejs/splide/css';

export const initSlider = (container, options = {}) => {
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

    if (arrows.next && arrows.prev) {
      arrows.next.disabled = currentIndex === totalSlides;
      arrows.prev.disabled = splide.index === 0;
      arrows.next.classList.toggle('isDisabled', arrows.next.disabled);
      arrows.prev.classList.toggle('isDisabled', arrows.prev.disabled);
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

// <section class="elem">
//   <div class="splide">
//     <div class="splide__track">
//       <ul class="splide__list">
//         <li class="splide__slide">
//           <p>slide 1</p>
//         </li>
//         <li class="splide__slide">
//           <p>slide 1</p>
//         </li>
//       </ul>
//     </div>
//   </div>

//   <div class="arrows">
//     <div class="arrows__body">
//       <button type="button" class="arrows__prev">
//         <span>Назад</span>
//       </button>
//       <span class="arrows__number">1/1</span>
//       <button type="button" class="arrows__next">
//         <span>Далі</span>
//       </button>
//     </div>
//   </div>
// </section>;
