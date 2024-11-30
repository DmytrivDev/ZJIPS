import scrollLock from 'scroll-lock';

import { handleScroll } from './preview.js';

const headerMain = document.querySelector('.header__main');
const burger = document.querySelector('.burger');
const mobMenu = document.querySelector('.mobmenu');
const mobMenuBody = document.querySelector('.mobmenu__body');
const mobNavLinks = document.querySelectorAll('.mobmenu .navmenu__list a');

let isScrollLocked = false;

function toggleScrollLock() {
  if (mobMenuBody) {
    if (isScrollLocked) {
      scrollLock.enablePageScroll(mobMenuBody);
    } else {
      scrollLock.disablePageScroll(mobMenuBody, { reserveScrollBarGap: true });
      handleScroll();
    }
    isScrollLocked = !isScrollLocked;
  }
}

function updateMobMenuBodyMargin() {
  if (headerMain && mobMenuBody) {
    const headerHeight = headerMain.getBoundingClientRect().height;
    mobMenuBody.style.marginTop = `${headerHeight}px`;
    mobMenuBody.style.height = `calc(100% - ${headerHeight}px)`;
  }
}

function toggleMenu() {
  if (burger && mobMenu) {
    burger.classList.toggle('isOpened');
    mobMenu.classList.toggle('isOpened');
    toggleScrollLock();
  }
}

function closeMenu() {
  if (burger && mobMenu) {
    burger.classList.remove('isOpened');
    mobMenu.classList.remove('isOpened');
    if (mobMenuBody) scrollLock.enablePageScroll(mobMenuBody);
    isScrollLocked = false;
  }
}

function handleResize() {
  updateMobMenuBodyMargin();
  if (window.innerWidth > 960) {
    closeMenu();
  }
}

function initMenu() {
  if (mobMenuBody && headerMain) {
    updateMobMenuBodyMargin();
    window.addEventListener('resize', handleResize);
  }

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
