const projectArticle = document.querySelector('.project');
if (projectArticle) {
  tabsSidebar(projectArticle);
}

const tenderArticle = document.querySelector('.tender');
if (tenderArticle) {
  tabsSidebar(tenderArticle);
}

const policyArticle = document.querySelector('.policy');
if (policyArticle) {
  tabsSidebar(policyArticle);
}

function tabsSidebar(page) {
  let titles = page.querySelectorAll('.article__content h2');

  if (titles.length < 1) {
    titles = page.querySelectorAll('.article__content h3');
  }

  titles.forEach((title, index) => {
    title.setAttribute('id', `title-${index + 1}`);
  });

  const quickBodyList = document.createElement('ol');
  quickBodyList.classList.add(`article__tabs`, 'ankor');

  let cl = 'active';
  titles.forEach((title, index) => {
    const listItem = document.createElement('li');
    const link = document.createElement('a');
    link.className = `${cl} tab`;
    link.setAttribute('href', `#title-${index + 1}`);

    if (!page.classList.contains('policy')) {
      link.textContent = `0${index + 1}. ${title.textContent}`;
      if (index + 1 >= 10) {
        link.textContent = `${index + 1}. ${title.textContent}`;
      }
    } else {
      link.textContent = title.textContent;
    }

    listItem.appendChild(link);
    quickBodyList.appendChild(listItem);

    cl = index >= 0 ? 'none' : 'active';
  });

  const quickCont = page.querySelector('.article__sidebar');
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
        if (scrollTop >= header.offsetTop - headerHeight - 120) {
          activeLink = links[i];
        }
      });

      links.forEach(link => link.classList.remove('active'));
      activeLink.classList.add('active');
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

      let offset = target.offsetTop - 60;

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
