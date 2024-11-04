const bannerCarousell = document.querySelector('.banner__carousell');

function initCalcSpeedCarse() {
  if (!bannerCarousell) {
    return;
  }

  const carousellPartF = bannerCarousell.querySelector('.carsePartF');
  const carousellPartS = bannerCarousell.querySelector('.carsePartS');

  const listWidthPartF = carousellPartF.scrollWidth; // Повна ширина списку F
  const carousellWidth = bannerCarousell.clientWidth; // Ширина видимої області

  const moveValue = listWidthPartF - carousellWidth;
  bannerCarousell.style.setProperty('--moveP', `${Math.abs(moveValue)}px`);
  bannerCarousell.style.setProperty('--moveM', `-${Math.abs(moveValue)}px`);

  const childrenCountF = carousellPartF.children.length;

  const speedFactor =
    parseFloat(bannerCarousell.getAttribute('data-speed')) || 1;

  const calcSpeed = speedFactor * childrenCountF; // Розрахунок швидкості в залежності від кількості елементів списку F

  carousellPartF.style.animationDelay = `-${calcSpeed}s`;
  carousellPartS.style.animationDelay = `-${calcSpeed / 2}s`;
  carousellPartF.style.webkitAnimationDelay = `-${calcSpeed}s`;
  carousellPartS.style.webkitAnimationDelay = `-${calcSpeed / 2}s`;

  carousellPartF.style.animationDuration = `${calcSpeed}s`;
  carousellPartS.style.animationDuration = `${calcSpeed}s`;
  carousellPartF.style.webkitAnimationDuration = `${calcSpeed}s`;
  carousellPartS.style.webkitAnimationDuration = `${calcSpeed}s`;
}

window.addEventListener('resize', initCalcSpeedCarse);
document.addEventListener('DOMContentLoaded', initCalcSpeedCarse);
