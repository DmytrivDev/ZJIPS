import scrollLock from 'scroll-lock';

const headerMain = document.querySelector('.header__main');
const burger = document.querySelector('.burger');

const mobMenu = document.querySelector('.mobmenu');
const mobMenuBody = document.querySelector('.mobmenu__body');
const mobNavLinks = document.querySelectorAll('.mobmenu .navmenu__list a');

let isScrollLocked = false;

function toggleScrollLock() {
  if (isScrollLocked) {
    scrollLock.enablePageScroll(mobMenuBody);
  } else {
    scrollLock.disablePageScroll(mobMenuBody, { reserveScrollBarGap: true });
  }
  isScrollLocked = !isScrollLocked;
}

function updateMobMenuBodyMargin() {
  if (headerMain && mobMenuBody) {
    const headerHeight = headerMain.getBoundingClientRect().height;

    mobMenuBody.style.marginTop = `${headerHeight}px`;
    mobMenuBody.style.height = `calc(100% - ${headerHeight}px)`;
  }
}

export function toggleMenu() {
  burger.classList.toggle('isOpened');
  mobMenu.classList.toggle('isOpened');

  toggleScrollLock();
}

export function closeMenu() {
  burger.classList.remove('isOpened');
  mobMenu.classList.remove('isOpened');

  scrollLock.enablePageScroll(mobMenuBody);
  isScrollLocked = false;
}

function disableOverhide() {
  if (window.innerWidth > 960) {
    closeMenu();
  }
}

function initMenu() {
  updateMobMenuBodyMargin();
  disableOverhide();

  window.addEventListener('resize', updateMobMenuBodyMargin);
  window.addEventListener('resize', disableOverhide);

  if (burger) {
    burger.addEventListener('click', toggleMenu);
  }

  if (mobNavLinks) {
    mobNavLinks.forEach(link => {
      link.addEventListener('click', closeMenu);
    });
  }
}

initMenu();
