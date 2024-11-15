document.addEventListener('DOMContentLoaded', function () {
  const ukrpartn = document.querySelector('.ukrpartn');

  function initPagination(section) {
    const paginList = section.querySelector('.paginList');
    const paginContainer = section.querySelector('.pagination__cont');
    const paginPager = section.querySelector('.facetwp-pager');
    const items = section.querySelectorAll('.partnblock__item');

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
        item.style.display = index >= start && index < end ? 'block' : 'none';
      });
    }

    function createPagination() {
      const totalPages = calculateTotalPages();
      paginPager.innerHTML = ''; // Очистка старой пагинации

      // Кнопка "Предыдущая"
      const prevButton = document.createElement('a');
      prevButton.classList.add('facetwp-page', 'prev');
      prevButton.dataset.page = currentPage > 1 ? currentPage - 1 : 1;
      prevButton.innerHTML = '<span></span>';
      if (currentPage === 1) {
        prevButton.classList.add('disabled');
      }
      prevButton.addEventListener('click', function () {
        if (currentPage > 1) {
          currentPage--;
          updatePagination();
        }
      });
      paginPager.appendChild(prevButton);

      // Отображение страниц (максимум 5)
      const maxVisiblePages = 5;
      const visiblePages = [];

      if (totalPages <= maxVisiblePages) {
        // Если общее количество страниц меньше или равно 5
        for (let i = 1; i <= totalPages; i++) {
          visiblePages.push(i);
        }
      } else {
        // Формирование диапазона страниц
        if (currentPage <= 3) {
          visiblePages.push(1, 2, 3, 4, 'dots', totalPages);
        } else if (currentPage >= totalPages - 2) {
          visiblePages.push(
            1,
            'dots',
            totalPages - 3,
            totalPages - 2,
            totalPages - 1,
            totalPages
          );
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
      }

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
          });
          paginPager.appendChild(pageButton);
        }
      });

      // Кнопка "Следующая"
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
          currentPage++;
          updatePagination();
        }
      });
      paginPager.appendChild(nextButton);
    }

    function updatePagination() {
      showPage(currentPage);
      createPagination();
    }

    // Инициализация
    function initialize() {
      if (totalItems > getCurrentItemsPerPage()) {
        updatePagination();
      } else {
        paginPager.innerHTML = ''; // Убираем пагинацию, если она не нужна
        items.forEach(item => (item.style.display = 'block'));
      }
    }

    initialize();
    window.addEventListener('resize', initialize);
  }

  initPagination(ukrpartn);
});
