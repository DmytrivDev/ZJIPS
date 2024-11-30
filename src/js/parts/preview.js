const hero = document.querySelector('.hero');

const heroBoxTxt = document.querySelector('.hero__box');
const heroVec = document.querySelector('.hero__vec');
const heroFilter = document.querySelector('.hero__filter');

const logoWrapp = document.querySelector('.logo__wrapp');

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
    addAnimationElem();
  }

  // Скролл вверх
  if (isHeroPartiallyVisible() && isScrollingUp) {
    smoothScrollTo(heroTop);
    removeAnimationElem();
  }

  lastScrollY = window.scrollY; // Обновляем позицию скролла
};

window.addEventListener('scroll', handleScroll);

document.addEventListener('DOMContentLoaded', () => {
  if (hero && window.scrollY > 0) {
    addAnimationElem();
  }
});
