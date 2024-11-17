const header = document.querySelector('header');

const ukrpartn = document.querySelector('.ukrpartn');
if (ukrpartn) {
  initPagination(ukrpartn);
}

const interpart = document.querySelector('.interpart');
if (interpart) {
  initPagination(interpart);
}

const businspartn = document.querySelector('.businspartn');
if (businspartn) {
  initPagination(businspartn);
}

const donorpartn = document.querySelector('.donorpartn');
if (donorpartn) {
  initPagination(donorpartn);
}

function initPagination(section) {
  const list = section.querySelector('.partnblock__list');
  const items = section.querySelectorAll('.partnblock__item');
  const paginContainer = section.querySelector('.pagination__cont');
  const paginPager = section.querySelector('.facetwp-pager');

  const totalItems = items.length;

  const itemsPerPage = {
    desktop: 12,
    mobile: 8,
  };

  let currentPage = 1;

  function getCurrentItemsPerPage() {
    const screenWidth = window.innerWidth;
    return screenWidth >= 960 ? itemsPerPage.desktop : itemsPerPage.mobile;
  }

  function calculateTotalPages() {
    const currentItemsPerPage = getCurrentItemsPerPage();
    return Math.ceil(totalItems / currentItemsPerPage);
  }

  function showPage(page) {
    const currentItemsPerPage = getCurrentItemsPerPage();
    const start = (page - 1) * currentItemsPerPage;
    const end = start + currentItemsPerPage;

    items.forEach((item, index) => {
      item.classList.add('partHid');
      if (index >= start && index < end) {
        item.classList.remove('partHid');
        item.classList.add('partVis');
        setTimeout(() => {
          item.classList.add('isAnim');
        }, 100);
      } else {
        item.classList.add('partHid');
        item.classList.remove('partVis');
        setTimeout(() => {
          item.classList.remove('isAnim');
        }, 100);
      }
    });
  }

  function scrollToSection() {
    const headerHeight = header ? header.offsetHeight : 0;
    const offset = headerHeight - 70;

    window.scrollTo({
      top: section.offsetTop - offset,
      behavior: 'smooth',
    });
  }

  function adjustItemHeights() {
    if (!list || items.length === 0) return;

    const listHeight = list.offsetHeight;

    items.forEach((item, index) => {
      const itemHeight = item.offsetHeight;

      if (index === items.length - 1 && listHeight === itemHeight) {
        item.classList.add('delBorder');
      } else {
        item.classList.remove('delBorder');
      }
    });
  }

  function createPagination() {
    const totalPages = calculateTotalPages();
    paginPager.innerHTML = '';

    // btn prev
    const prevButton = document.createElement('a');
    prevButton.classList.add('facetwp-page', 'prev');
    prevButton.dataset.page = currentPage > 1 ? currentPage - 1 : 1;
    prevButton.innerHTML = '<span></span>';
    if (currentPage === 1) {
      prevButton.classList.add('disabled');
    }
    prevButton.addEventListener('click', function () {
      if (currentPage > 1) {
        currentPage -= 1;
        updatePagination();
        scrollToSection();
      }
    });
    paginPager.appendChild(prevButton);

    // btns pages
    const maxVisiblePages = 4;
    const visiblePages = [];

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        visiblePages.push(i);
      }
    } else if (currentPage <= 2) {
      visiblePages.push(1, 2, 3, 'dots', totalPages);
    } else if (currentPage <= 3) {
      if (totalPages <= 5) {
        for (let i = 1; i <= totalPages; i++) {
          visiblePages.push(i);
        }
      } else {
        visiblePages.push(1, 2, 3, 4, 'dots', totalPages);
      }
    } else if (currentPage >= totalPages - 1) {
      visiblePages.push(1, 'dots', totalPages - 2, totalPages - 1, totalPages);
    } else if (currentPage >= totalPages - 2) {
      visiblePages.push(1, 'dots');
      for (let i = totalPages - 3; i <= totalPages; i++) {
        visiblePages.push(i);
      }
    } else {
      visiblePages.push(
        1,
        'dots',
        currentPage - 1,
        currentPage,
        currentPage + 1,
        'dots',
        totalPages
      );
    }

    // btns pages
    visiblePages.forEach(page => {
      if (page === 'dots') {
        const dots = document.createElement('a');
        dots.classList.add('facetwp-page', 'dots');
        dots.textContent = '…';
        paginPager.appendChild(dots);
      } else {
        const pageButton = document.createElement('a');
        pageButton.classList.add('facetwp-page');
        if (page === currentPage) {
          pageButton.classList.add('active');
        }
        pageButton.dataset.page = page;
        pageButton.textContent = page;
        pageButton.addEventListener('click', function () {
          currentPage = page;
          updatePagination();
          scrollToSection();
        });
        paginPager.appendChild(pageButton);
      }
    });

    // btn next
    const nextButton = document.createElement('a');
    nextButton.classList.add('facetwp-page', 'next');
    nextButton.dataset.page =
      currentPage < totalPages ? currentPage + 1 : totalPages;
    nextButton.innerHTML = '<span></span>';
    if (currentPage === totalPages) {
      nextButton.classList.add('disabled');
    }
    nextButton.addEventListener('click', function () {
      if (currentPage < totalPages) {
        currentPage += 1;
        updatePagination();
        scrollToSection();
      }
    });
    paginPager.appendChild(nextButton);
  }

  function updatePagination() {
    if (currentPage > calculateTotalPages()) {
      currentPage = calculateTotalPages();
    }

    showPage(currentPage);
    createPagination();
    adjustItemHeights();
  }

  function initialize() {
    if (totalItems > getCurrentItemsPerPage()) {
      updatePagination();
      paginContainer.style.display = 'flex';
      items.forEach(item => {
        item.classList.add('partHid');
      });
    } else {
      paginContainer.style.display = 'none';
      items.forEach(item => {
        item.classList.remove('partHid');
      });
    }
  }

  initialize();
  window.addEventListener('resize', initialize);
}
