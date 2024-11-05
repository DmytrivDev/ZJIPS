import Splide from '@splidejs/splide';
import '@splidejs/splide/css';

const instHeroSlider = () => {
  const slider = document.querySelector('.hero__splide');

  if (slider) {
    const options = {
      type: 'slider',
      speed: 1000,
      pagination: false,
      updateOnMove: true,
      drag: false,
      swipe: false,
      breakpoints: {
        960: {
          speed: 500,
        },
      },
    };

    const splide = new Splide(slider, options).mount();

    updateSlideNumber(splide);
    updateArrowsState(splide);

    splide.on('move', () => {
      updateSlideNumber(splide);
      updateArrowsState(splide);
    });

    arrowsClicker();

    function arrowsClicker() {
      const container = document.querySelector('.hero__splide');

      const arrowsNext = document.querySelector('.hero-arrows__next');
      const arrowsPrev = document.querySelector('.hero-arrows__prev');

      arrowsNext.addEventListener('click', () => {
        container.querySelector('.splide__arrow--next').click();
      });

      arrowsPrev.addEventListener('click', () => {
        container.querySelector('.splide__arrow--prev').click();
      });
    }

    function updateSlideNumber(slide) {
      const currentIndex = slide.index + 1;
      const totalSlides = slide.Components.Slides.getLength();
      const spanElements = document.querySelectorAll('.hero-arrows__number');

      spanElements.forEach(spanElement => {
        spanElement.textContent = `${currentIndex}/${totalSlides}`;
      });
    }

    function updateArrowsState(slide) {
      const arrowsNext = document.querySelector('.hero-arrows__next');
      const arrowsPrev = document.querySelector('.hero-arrows__prev');

      if (slide.index === slide.Components.Slides.getLength() - 1) {
        arrowsNext.disabled = true;
        arrowsNext.classList.add('is-disabled');
      } else {
        arrowsNext.disabled = false;
        arrowsNext.classList.remove('is-disabled');
      }

      if (slide.index === 0) {
        arrowsPrev.disabled = true;
        arrowsPrev.classList.add('is-disabled');
      } else {
        arrowsPrev.disabled = false;
        arrowsPrev.classList.remove('is-disabled');
      }
    }
  }
};
instHeroSlider();

const instFunctionSlider = () => {
  const slider = document.querySelector('.function__splide');

  if (slider) {
    const options = {
      type: 'slide',
      speed: 1000,
      pagination: false,
      updateOnMove: true,
      perPage: 2,
      gap: '1.5rem',
      width: '81rem',
      breakpoints: {
        960: {
          width: 'auto',
          speed: 500,
          perPage: 1,
        },
      },
    };

    const splide = new Splide(slider, options).mount();

    updateSlideNumber(splide);
    updateArrowsState(splide);

    splide.on('move', () => {
      updateSlideNumber(splide);
      updateArrowsState(splide);
    });

    window.addEventListener('resize', () => {
      updateSlideNumber(splide);
      updateArrowsState(splide);
    });

    arrowsClicker();

    function arrowsClicker() {
      const container = document.querySelector('.function__splide');

      const arrowsNext = document.querySelector('.function-arrows__next');
      const arrowsPrev = document.querySelector('.function-arrows__prev');

      arrowsNext.addEventListener('click', () => {
        container.querySelector('.splide__arrow--next').click();
      });

      arrowsPrev.addEventListener('click', () => {
        container.querySelector('.splide__arrow--prev').click();
      });
    }

    function updateSlideNumber(slide) {
      const totalSlides = Math.ceil(
        slide.Components.Slides.getLength() / slide.options.perPage
      );

      const currentIndex = Math.ceil(slide.index / slide.options.perPage) + 1;

      const spanElements = document.querySelectorAll(
        '.function-arrows__number'
      );

      spanElements.forEach(spanElement => {
        spanElement.textContent = `${currentIndex}/${totalSlides}`;
      });
    }

    function updateArrowsState(slide) {
      const arrowsNext = document.querySelector('.function-arrows__next');
      const arrowsPrev = document.querySelector('.function-arrows__prev');

      const totalSlides = Math.ceil(
        slide.Components.Slides.getLength() / slide.options.perPage
      );

      if (Math.ceil(slide.index / slide.options.perPage) === totalSlides - 1) {
        arrowsNext.disabled = true;
        arrowsNext.classList.add('is-disabled');
      } else {
        arrowsNext.disabled = false;
        arrowsNext.classList.remove('is-disabled');
      }

      if (slide.index === 0) {
        arrowsPrev.disabled = true;
        arrowsPrev.classList.add('is-disabled');
      } else {
        arrowsPrev.disabled = false;
        arrowsPrev.classList.remove('is-disabled');
      }
    }
  }
};
instFunctionSlider();

const instParagraphSlider = () => {
  const slider = document.querySelector('.paragraph__splide');

  if (slider) {
    const options = {
      type: 'slide',
      speed: 1000,
      pagination: false,
      updateOnMove: true,
      perPage: 1,
      gap: '0',
    };

    const splide = new Splide(slider, options).mount();

    updateSlideNumber(splide);
    updateArrowsState(splide);

    splide.on('move', () => {
      updateSlideNumber(splide);
      updateArrowsState(splide);
    });

    window.addEventListener('resize', () => {
      updateSlideNumber(splide);
      updateArrowsState(splide);
    });

    arrowsClicker();

    function arrowsClicker() {
      const container = document.querySelector('.paragraph__splide');

      const arrowsNext = document.querySelector('.paragraph-arrows__next');
      const arrowsPrev = document.querySelector('.paragraph-arrows__prev');

      arrowsNext.addEventListener('click', () => {
        container.querySelector('.splide__arrow--next').click();
      });

      arrowsPrev.addEventListener('click', () => {
        container.querySelector('.splide__arrow--prev').click();
      });
    }

    function updateSlideNumber(slide) {
      const totalSlides = Math.ceil(
        slide.Components.Slides.getLength() / slide.options.perPage
      );

      const currentIndex = Math.ceil(slide.index / slide.options.perPage) + 1;

      const spanElements = document.querySelectorAll(
        '.paragraph-arrows__number'
      );

      spanElements.forEach(spanElement => {
        spanElement.textContent = `${currentIndex}/${totalSlides}`;
      });
    }

    function updateArrowsState(slide) {
      const arrowsNext = document.querySelector('.paragraph-arrows__next');
      const arrowsPrev = document.querySelector('.paragraph-arrows__prev');

      const totalSlides = Math.ceil(
        slide.Components.Slides.getLength() / slide.options.perPage
      );

      if (Math.ceil(slide.index / slide.options.perPage) === totalSlides - 1) {
        arrowsNext.disabled = true;
        arrowsNext.classList.add('is-disabled');
      } else {
        arrowsNext.disabled = false;
        arrowsNext.classList.remove('is-disabled');
      }

      if (slide.index === 0) {
        arrowsPrev.disabled = true;
        arrowsPrev.classList.add('is-disabled');
      } else {
        arrowsPrev.disabled = false;
        arrowsPrev.classList.remove('is-disabled');
      }
    }
  }
};
instParagraphSlider();
