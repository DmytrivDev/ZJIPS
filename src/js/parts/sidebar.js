const articleSidebar = document.querySelector('.article__sidebar');
if (articleSidebar) {
  tabsSidebar('article');
}

const policySidebar = document.querySelector('.policy__sidebar');
if (policySidebar) {
  tabsSidebar('policy');
}

function tabsSidebar(page) {
  let titles = document.querySelectorAll(`.${page}__content h2`);

  if (titles.length < 1) {
    titles = document.querySelectorAll(`.${page}__content h3`);
  }

  titles.forEach((title, index) => {
    title.setAttribute('id', `title-${index + 1}`);
  });

  const quickBodyList = document.createElement('ul');
  quickBodyList.classList.add(`${page}__tabs`, 'ankor');

  let cl = 'active';
  titles.forEach((title, index) => {
    const listItem = document.createElement('li');
    const link = document.createElement('a');
    link.className = `${cl} tab`;
    link.setAttribute('href', `#title-${index + 1}`);

    // !=================================================================
    if (page === 'article') {
      link.textContent = `${index + 1}. ${title.textContent}`;
    } else {
      link.textContent = title.textContent;
    }

    listItem.appendChild(link);
    quickBodyList.appendChild(listItem);

    cl = index >= 0 ? 'none' : 'active';
  });

  const quickCont = document.querySelector(`.${page}__sidebar`);
  if (quickCont) {
    quickCont.innerHTML = '';
    quickCont.appendChild(quickBodyList);
  }

  setTimeout(function () {
    const links = quickBodyList.querySelectorAll('a');
    const headers = Array.from(links).map((_, i) =>
      document.getElementById(`title-${i + 1}`)
    );

    const setActiveLink = function () {
      const scrollTop = window.scrollY;
      const headerHeight = document.querySelector('.header').offsetHeight;
      let activeLink = links[0];
      headers.forEach((header, i) => {
        if (scrollTop >= header.offsetTop - headerHeight - 115) {
          activeLink = links[i];
        }
      });

      links.forEach(link => link.classList.remove('active'));
      activeLink.classList.add('active');

      // if (page === 'policy') {
      //   smoothHorizontalScroll(activeLink, 1);
      // }
    };

    setActiveLink();
    window.addEventListener('scroll', setActiveLink);
  }, 500);

  document.querySelectorAll('a.ankor, .ankor a').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();

      const headerHeight = document.querySelector('.header').offsetHeight;

      const href = this.getAttribute('href');
      const target = document.querySelector(href);
      if (!target) return;

      let offset = target.offsetTop + 115;
      if (page === 'policy' && window.innerWidth < 960) {
        offset = target.offsetTop + 50;
      }

      const head = headerHeight;
      let ofF = offset;

      if (this.classList.contains('tab')) {
        ofF = offset - head;
      }

      let topic = this.dataset.topic || this.textContent;

      const targetInput = document.getElementById('target');
      if (targetInput) {
        targetInput.value = topic;
      }

      document.body.classList.remove('openedNav');

      window.scrollTo({
        top: ofF,
        behavior: 'smooth',
      });
    });
  });
}

// Кастомная функция для ускоренного горизонтального скролла с центровкой
function smoothHorizontalScroll(element, duration) {
  const container = document.querySelector('.policy__sidebar');
  const containerWidth = container.offsetWidth;
  const elementLeft = element.offsetLeft;
  const elementWidth = element.offsetWidth;

  const targetScrollPosition =
    elementLeft - (containerWidth / 2 - elementWidth / 2);

  let start = container.scrollLeft;
  let change = targetScrollPosition - start;
  let currentTime = 0;
  const increment = 1; // Ускорение (чем меньше, тем быстрее)

  function animateScroll() {
    currentTime += increment;
    const val = Math.easeInOutQuad(currentTime, start, change, duration);
    container.scrollLeft = val;
    if (currentTime < duration) {
      requestAnimationFrame(animateScroll);
    }
  }

  animateScroll();
}

// Функция для плавного эффекта
Math.easeInOutQuad = function (t, b, c, d) {
  t /= d / 2;
  if (t < 1) return (c / 2) * t * t + b;
  t--;
  return (-c / 2) * (t * (t - 2) - 1) + b;
};
