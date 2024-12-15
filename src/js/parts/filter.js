import axios from 'axios';

export const pagination = () => {
  async function loadFutureEvents(page, sortRule) {
    try {
      const formData = new FormData();
      const castomP = document.querySelector('.custom-pagination');
      const perPage = castomP.dataset.perpage ? castomP.dataset.perpage : 3;
      castomP.classList.add('loadingP');
      formData.append('action', 'load_future_events');
      formData.append('page', page);
      formData.append('sortRule', sortRule);
      formData.append('perpage', perPage);

      const response = await axios.post('/wp-admin/admin-ajax.php', formData);

      if (response.data) {
        document.querySelector('.tenders__newlist').innerHTML =
          response.data.posts;

        // Оновлюємо пагінацію
        document.querySelector('.custom-pagination').innerHTML =
          response.data.pagination;

        castomP.classList.remove('loadingP');
        checkPag();

        // Додаємо слухачів до нових елементів пагінації
        addPaginationListeners();
      }
    } catch (error) {
      console.log(error);
    }
  }

  // Додаємо слухачів подій для елементів пагінації
  function addPaginationListeners() {
    const paginationLinks = document.querySelectorAll('.page-numbers');
    paginationLinks.forEach(function (link) {
      link.addEventListener('click', function (e) {
        e.preventDefault();
        const url = this.getAttribute('href');
        const searchParams = new URLSearchParams(new URL(url).search);
        let page = searchParams.get('paged');
        if (!page) {
          page = url.match(/\/page\/(\d+)/)[1];
        }

        const sortRule = document.querySelector('.filter__sort-custombtn')
          ?.dataset.sort;

        loadFutureEvents(page, sortRule);
      });
    });
  }

  function sortListner() {
    const sortBtn = document.querySelector('.filter__sort-custombtn');

    sortBtn?.addEventListener('click', function (e) {
      e.preventDefault();
      let sortRule = e.currentTarget.dataset.sort;

      if (sortRule === 'ASC') {
        e.currentTarget.dataset.sort = 'DESC';
        e.currentTarget.classList.add('choice');
        sortRule = 'DESC';
      } else {
        e.currentTarget.dataset.sort = 'ASC';
        e.currentTarget.classList.remove('choice');
        sortRule = 'ASC';
      }

      loadFutureEvents(1, sortRule);
    });
  }

  // Ініціалізуємо слухачі при завантаженні сторінки
  addPaginationListeners();
  sortListner();
};

// Виклик функції для ініціалізації пагінації при завантаженні сторінки
document.addEventListener('DOMContentLoaded', pagination);

checkPag();

function checkPag() {
  const pager = document.querySelector('.custom-pager');

  if (pager) {
    const prev = pager?.querySelector('.prev');
    const next = pager?.querySelector('.next');

    if (pager.innerHTML !== '') {
      if (!prev) {
        pager.insertAdjacentHTML(
          'afterbegin',
          '<div class="prev page-numbers"><span></span></div>'
        );
      }

      if (!next) {
        pager.insertAdjacentHTML(
          'beforeend',
          '<div class="next page-numbers"><span></span></div>'
        );
      }
    }
  }
}
