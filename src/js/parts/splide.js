import { initSlider } from './splidecust';

const functionSplide = document.querySelector('.projmore');
if (functionSplide) {
  initSlider(functionSplide, {
    perPage: 1,
    gap: '1rem',
  });
}

const articleSplide = document.querySelectorAll('.article__img-splide');
articleSplide?.forEach(container => {
  initSlider(container, {
    type: 'fade',
    perPage: 1,
    speed: 500,
  });
});

// const articleSplide = document.querySelectorAll('.article__img-splide');
// articleSplide?.forEach(container => {
//   initSlider(container, {
//     perPage: 1,
//     breakpoints: {
//       960: {},
//       500: {},
//     },
//   });
// });
