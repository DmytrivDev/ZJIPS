import { initSlider } from './splidecust';

const projmoreSplide = document.querySelector('.projmore');
if (projmoreSplide) {
  initSlider(projmoreSplide, {
    perPage: 1,
    gap: '1rem',
  });
}

const activitySplide = document.querySelector('.activity');
if (activitySplide) {
  initSlider(activitySplide, {
    perPage: 3,
    perMove: 1,
    gap: '1rem',
    breakpoints: {
      960: {
        perPage: 2,
      },
      685: {
        perPage: 1,
      },
    },
  });
}

const articleSplide = document.querySelectorAll('.article__splide');
articleSplide?.forEach(container => {
  initSlider(container, {
    type: 'fade',
    perPage: 1,
    speed: 500,
  });
});

// const articleSplide = document.querySelectorAll('.article__splide');
// articleSplide?.forEach(container => {
//   initSlider(container, {
//     perPage: 1,
//     breakpoints: {
//       960: {},
//       500: {},
//     },
//   });
// });
