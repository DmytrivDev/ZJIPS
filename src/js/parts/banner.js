document.addEventListener('DOMContentLoaded', function () {
  const bannerCarousell = document.querySelector('.banner__carousell');

  const carousellPartF = document.querySelector('.carousell-part1');
  const carousellPartS = document.querySelector('.carousell-part2');

  function updateMarqueeAnimation() {
    if (bannerCarousell) {
      const listWidthPartF = carousellPartF.scrollWidth; // Полная ширина списка
      const listWidthPartS = carousellPartS.scrollWidth; // Полная ширина списка

      const carousellWidth = bannerCarousell.clientWidth; // Ширина видимой области

      const moveValueF = listWidthPartF - carousellWidth;
      carousellPartF.style.setProperty(
        '--move1-p',
        `${Math.abs(moveValueF)}px`
      );
      carousellPartF.style.setProperty(
        '--move1-m',
        `-${Math.abs(moveValueF)}px`
      );

      const moveValueS = listWidthPartS - carousellWidth;
      carousellPartS.style.setProperty(
        '--move2-p',
        `${Math.abs(moveValueS)}px`
      );
      carousellPartS.style.setProperty(
        '--move2-m',
        `-${Math.abs(moveValueS)}px`
      );
    }
  }

  updateMarqueeAnimation();

  window.addEventListener('resize', updateMarqueeAnimation);
});
