const hero = document.querySelector('.hero');

const heroBoxTxt = document.querySelector('.hero__box');
const heroVec = document.querySelector('.hero__vec');
const heroFilter = document.querySelector('.hero__filter');

const logoWrapp = document.querySelector('.logo__wrapp');
const logoLink = document.querySelector('.custom-logo-link');
const logoTxt = document.querySelector('.logo__txt');

export function scrollHeroIfVisible() {
  if (!hero) return;

  const heroRect = hero.getBoundingClientRect();
  const windowHeight = window.innerHeight;

  const visibleHeight =
    Math.min(heroRect.bottom, windowHeight) - Math.max(heroRect.top, 0);

  // Проверяем, виден ли блок в окне браузера
  const isHeroVisible = heroRect.top < windowHeight && heroRect.bottom > 0;

  if (isHeroVisible) {
    const currentScroll =
      window.pageYOffset || document.documentElement.scrollTop;
    const visibleHeightClamped = Math.max(0, visibleHeight); // видимая высота

    window.scrollTo({
      top: currentScroll + visibleHeightClamped,
      behavior: 'smooth',
    });
  }
}

function calculateHeroScrollPercentage() {
  if (!hero) return;

  const heroRect = hero.getBoundingClientRect();
  const originalHeroHeight = hero.offsetHeight; // Оригинальная высота
  const adjustedHeroHeight = originalHeroHeight - 70; // Искусственное увеличение

  const windowHeight = window.innerHeight;

  // Определяем, сколько части блока hero видно в окне браузера
  const visibleHeight =
    Math.min(heroRect.bottom - 70, windowHeight) - Math.max(heroRect.top, 0);

  // Рассчитываем процент видимости блока
  const visibilityPercentage =
    Math.max(0, Math.min(visibleHeight / adjustedHeroHeight, 1)) * 100;

  applyTransformStyles(visibilityPercentage.toFixed(0));
}

function applyTransformStyles(visibilityPercentage) {
  const isDesktop = window.innerWidth >= 960;

  const translateXValue = isDesktop
    ? -45 + (visibilityPercentage / 100) * 45
    : -35 + (visibilityPercentage / 100) * 35;
  const translateYValue = -10 + (visibilityPercentage / 100) * 10;
  const opacityValue = visibilityPercentage / 100;
  const scaleValue = 0.3 + (visibilityPercentage / 100) * (1 - 0.3);

  // Для heroBoxTxt
  heroBoxTxt.style.transform = `translate(${translateXValue}%, ${translateYValue}rem) scale(${scaleValue})`;

  // Для heroVec
  heroVec.style.transform = `translateY(${translateYValue}%)`;
  heroVec.style.opacity = opacityValue;

  // Для heroFilter
  heroFilter.style.opacity = opacityValue;

  const topValue = isDesktop
    ? (visibilityPercentage / 100) * 9
    : (visibilityPercentage / 100) * 6.5625; // От 0rem до 9rem
  const leftValue = isDesktop
    ? (visibilityPercentage / 100) * 23.6
    : (visibilityPercentage / 100) * 0; // От 0% до 23.6%
  const gapValue = isDesktop
    ? (visibilityPercentage / 100) * 2.24
    : (visibilityPercentage / 100) * 1.0625; // От 0rem до 2.24rem

  // Для logoWrapp (обратное направление)
  logoWrapp.style.top = `${topValue}rem`;
  logoWrapp.style.left = `${leftValue}%`;
  logoWrapp.style.gap = `${gapValue}rem`;

  const logoLinkWidth = isDesktop
    ? 3 + (visibilityPercentage / 100) * (13.4375 - 3)
    : 3 + (visibilityPercentage / 100) * (6.36938 - 3); // От 3rem до 13.4375rem

  // Для custom-logo-link (обратное направление)
  logoLink.style.width = `${logoLinkWidth}rem`;

  const logoTxtWidth = (visibilityPercentage / 100) * 100; // От 0% до 100%

  // Для logoTxt (обратное направление)
  logoTxt.style.width = `${logoTxtWidth}%`;
}

window.addEventListener('scroll', calculateHeroScrollPercentage);
window.addEventListener('resize', calculateHeroScrollPercentage);
document.addEventListener('DOMContentLoaded', calculateHeroScrollPercentage);

// let lastScrollY = window.scrollY; // Последняя позиция скролла
// let isAnimating = false; // Флаг анимации
// const scrollSpeed = 500; // Скорость прокрутки в миллисекундах

// const smoothScrollTo = targetPosition => {
//   isAnimating = true;

//   const start = window.scrollY;
//   const distance = targetPosition - start;
//   const startTime = performance.now();

//   const animateScroll = currentTime => {
//     const timeElapsed = currentTime - startTime;
//     const progress = Math.min(timeElapsed / scrollSpeed, 1);

//     const easing = progress; // Линейная анимация
//     window.scrollTo(0, start + distance * easing);

//     if (progress < 1) {
//       requestAnimationFrame(animateScroll);
//     } else {
//       isAnimating = false; // Завершение анимации
//     }
//   };

//   requestAnimationFrame(animateScroll);
// };

// const isHeroPartiallyVisible = () => {
//   const heroRect = hero.getBoundingClientRect();
//   const visibleHeight =
//     Math.min(heroRect.bottom, window.innerHeight) - Math.max(heroRect.top, 0);
//   return visibleHeight >= 50; // Минимум 50 пикселей блока видно
// };

// export const handleScroll = () => {
//   if (!hero) return;
//   if (isAnimating) return; // Пропускаем, если анимация уже идет

//   const heroRect = hero.getBoundingClientRect();
//   const heroTop = window.scrollY + heroRect.top;
//   const heroBottom = heroTop + hero.offsetHeight;

//   const isScrollingDown = window.scrollY >= lastScrollY; // Направление вниз
//   const isScrollingUp = !isScrollingDown; // Направление вверх

//   // Скролл вниз
//   if (isHeroPartiallyVisible() && isScrollingDown) {
//     smoothScrollTo(heroBottom);
//   }

//   // Скролл вверх
//   if (isHeroPartiallyVisible() && isScrollingUp) {
//     smoothScrollTo(heroTop);
//   }

//   lastScrollY = window.scrollY; // Обновляем позицию скролла
// };
