import scrollLock from 'scroll-lock';

const filterOpen = document.querySelectorAll('.filter__open');
const librarySidebar = document.querySelector('.library__sidebar');
const librarySidebarBody = document.querySelector('.library__sidebar-body');

let isScrollLocked = false;

function toggleScrollLock() {
  if (librarySidebarBody) {
    if (isScrollLocked) {
      scrollLock.enablePageScroll(librarySidebarBody);
    } else {
      scrollLock.disablePageScroll(librarySidebarBody, {
        reserveScrollBarGap: true,
      });
    }
    isScrollLocked = !isScrollLocked;
  }
}

function toggleMenuFilter() {
  if (librarySidebar) {
    librarySidebar.classList.toggle('isOpened');
    toggleScrollLock();
  }
}

function closeMenuFilter() {
  if (librarySidebar && librarySidebarBody) {
    librarySidebar.classList.remove('isOpened');
    if (librarySidebarBody) scrollLock.enablePageScroll(librarySidebarBody);
    isScrollLocked = false;
  }
}

function handleResize() {
  if (window.innerWidth > 960) {
    closeMenuFilter();
  }
}

function initMenuFilter() {
  window.addEventListener('resize', handleResize);

  if (filterOpen) {
    filterOpen.forEach(btn => {
      btn.addEventListener('click', toggleMenuFilter);
    });
  }
}

initMenuFilter();
