import { initSlider } from './splidecust';

const functionSplide = document.querySelector('.projmore');
if (functionSplide) {
  initSlider(functionSplide, {
    perPage: 1,
    gap: '1rem',
  });
}

// const elemSplides = document.querySelectorAll('.elem');
// elemSplides?.forEach(container => {
//   initSlider(container, {
//     perPage: 2,
//     breakpoints: {
//       960: {},
//       500: {},
//     },
//   });
// });
