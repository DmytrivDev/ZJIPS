import { initSlider } from './splidecust';

const functionSplide = document.querySelector('.function');
if (functionSplide) {
  initSlider(functionSplide, {
    perPage: 2,
    breakpoints: {
      960: {},
      500: {},
    },
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
