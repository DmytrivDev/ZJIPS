const hero = document.querySelector('.hero');

const heroBoxTxt = document.querySelector('.hero__box');
const heroVec = document.querySelector('.hero__vec');
const heroFilter = document.querySelector('.hero__filter');

const logoWrapp = document.querySelector('.logo__wrapp');
const logoLink = document.querySelector('.custom-logo-link');
const logoTxt = document.querySelector('.logo__txt');

function addAnimationElem() {
  logoWrapp.classList.add('isScroll');
  heroBoxTxt.classList.add('isScroll');
  heroVec.classList.add('isScroll');
  heroFilter.classList.add('isScroll');
}
function removeAnimationElem() {
  logoWrapp.classList.remove('isScroll');
  heroBoxTxt.classList.remove('isScroll');
  heroVec.classList.remove('isScroll');
  heroFilter.classList.remove('isScroll');
}

let lastScrollY = window.scrollY; // Последняя позиция скролла
let isAnimating = false; // Флаг анимации
const scrollSpeed = 500; // Скорость прокрутки в миллисекундах

const smoothScrollTo = targetPosition => {
  isAnimating = true;

  const start = window.scrollY;
  const distance = targetPosition - start;
  const startTime = performance.now();

  const animateScroll = currentTime => {
    const timeElapsed = currentTime - startTime;
    const progress = Math.min(timeElapsed / scrollSpeed, 1);

    const easing = progress; // Линейная анимация
    window.scrollTo(0, start + distance * easing);

    if (progress < 1) {
      requestAnimationFrame(animateScroll);
    } else {
      isAnimating = false; // Завершение анимации
    }
  };

  requestAnimationFrame(animateScroll);
};

const isHeroPartiallyVisible = () => {
  const heroRect = hero.getBoundingClientRect();
  const visibleHeight =
    Math.min(heroRect.bottom, window.innerHeight) - Math.max(heroRect.top, 0);
  return visibleHeight >= 50; // Минимум 50 пикселей блока видно
};

export const handleScroll = () => {
  if (!hero) return;
  if (isAnimating) return; // Пропускаем, если анимация уже идет

  const heroRect = hero.getBoundingClientRect();
  const heroTop = window.scrollY + heroRect.top;
  const heroBottom = heroTop + hero.offsetHeight;

  const isScrollingDown = window.scrollY >= lastScrollY; // Направление вниз
  const isScrollingUp = !isScrollingDown; // Направление вверх

  // Скролл вниз
  if (isHeroPartiallyVisible() && isScrollingDown) {
    smoothScrollTo(heroBottom);
    // addAnimationElem();
  }

  // Скролл вверх
  if (isHeroPartiallyVisible() && isScrollingUp) {
    smoothScrollTo(heroTop);
    // removeAnimationElem();
  }

  lastScrollY = window.scrollY; // Обновляем позицию скролла
};

// window.addEventListener('scroll', handleScroll);

// document.addEventListener('DOMContentLoaded', () => {
//   if (hero && window.scrollY > 0) {
//     addAnimationElem();
//   }
// });

function calculateHeroScrollPercentage() {
  if (!hero) return;

  const heroRect = hero.getBoundingClientRect(); // Получаем размеры блока
  const heroHeight = hero.offsetHeight; // Высота блока hero
  const windowHeight = window.innerHeight; // Высота окна браузера

  // Определяем, сколько части блока hero видно в окне браузера
  const visibleHeight =
    Math.min(heroRect.bottom, windowHeight) - Math.max(heroRect.top, 0);

  // Рассчитываем процент видимости блока
  const visibilityPercentage =
    Math.max(0, Math.min(visibleHeight / heroHeight, 1)) * 100;

  applyTransformStyles(visibilityPercentage.toFixed(0));
}

// Функция для применения стилей на основе видимости
function applyTransformStyles(visibilityPercentage) {
  // const screenWidth = window.innerWidth >= 960;

  // Для heroBoxTxt
  const translateXValue = -70 + (visibilityPercentage / 100) * 70;
  const translateYValue = -10 + (visibilityPercentage / 100) * 10;
  const opacityValue = visibilityPercentage / 100;
  const scaleValue = 0.3 + (visibilityPercentage / 100) * (1 - 0.3);

  heroBoxTxt.style.transform = `translate(${translateXValue}%, ${translateYValue}rem) scale(${scaleValue})`;

  // Для heroVec
  heroVec.style.transform = `translateY(${translateYValue}%)`;
  heroVec.style.opacity = opacityValue;

  // Для heroFilter
  heroFilter.style.opacity = opacityValue;

  // Для logoWrapp (обратное направление)
  const topValue = (visibilityPercentage / 100) * 9; // От 0rem до 9rem
  const leftValue = (visibilityPercentage / 100) * 23.6; // От 0% до 23.6%
  const gapValue = (visibilityPercentage / 100) * 2.24; // От 0rem до 2.24rem

  logoWrapp.style.top = `${topValue}rem`;
  logoWrapp.style.left = `${leftValue}%`;
  logoWrapp.style.gap = `${gapValue}rem`;

  // Для custom-logo-link (обратное направление)
  const logoLinkWidth = 3 + (visibilityPercentage / 100) * (13.4375 - 3); // От 3rem до 13.4375rem
  logoLink.style.width = `${logoLinkWidth}rem`;

  // Для logoTxt (обратное направление)
  const logoTxtWidth = (visibilityPercentage / 100) * 100; // От 0% до 100%
  logoTxt.style.width = `${logoTxtWidth}%`;
}

window.addEventListener('scroll', calculateHeroScrollPercentage);
// window.addEventListener('resize', calculateHeroScrollPercentage);
