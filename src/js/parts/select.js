import NiceSelect from 'nice-select2';

const projlistSelect = document.querySelector('.projlist__select');
const librarySelect = document.querySelector('.library__select');

let selector;

document.addEventListener('facetwp-loaded', function () {
  if (librarySelect) {
    partNiceSelect(
      librarySelect.querySelector('select'),
      librarySelect.dataset.txt
    );
  }
  
  if (projlistSelect) {
    partNiceSelect(
      projlistSelect.querySelector('select'),
      projlistSelect.dataset.txt
    );
  }

  const pageCont = document.querySelector('.pagesFacet');
  const pager = pageCont?.querySelector('.facetwp-pager');

  if (pager) {
    const prev = pager.querySelector('.prev');
    const next = pager.querySelector('.next');

    if (pager.innerHTML !== '') {
      if (!prev) {
        pager.insertAdjacentHTML(
          'afterbegin',
          '<div class="facetwp-page prev"><span></span></div>'
        );
      }

      if (!next) {
        pager.insertAdjacentHTML(
          'beforeend',
          '<div class="facetwp-page next"><span></span></div>'
        );
      }
    }
  }
});

const sortCtrl = document.querySelector('.filter__sort-btn');

if (sortCtrl) {
  document.addEventListener('facetwp-loaded', function () {
    selector = document.querySelector('.filter__sort select');

    const valSt = selector.value;

    if (valSt !== '') {
      sortCtrl.classList.add('choice');
    } else {
      sortCtrl.classList.remove('choice');
    }
  });

  sortCtrl.addEventListener('click', e => {
    e.preventDefault;

    const val = selector.value;

    if (val === '') {
      selector.value = '_';
    } else {
      selector.value = '';
    }

    FWP.refresh();
  });
}

function partNiceSelect(part, txt) {
  if (!document.querySelector('.nice-select.facetwp-dropdown')) {
    console.log('11111')

    new NiceSelect(part, {
      searchable: false,
    });

    function updateSelectText() {
      const selectedOption = part.options[part.selectedIndex].text;

      const customText = `${txt}: <span>${selectedOption}</span>`;

      const filtercont = part.closest('.filtercont');

      const display = filtercont.querySelector('.nice-select .current');

      if (display) {
        display.innerHTML = customText;
      }
    }
    updateSelectText();

    part.addEventListener('change', updateSelectText);
  }
}

const sortCtrl2 = document.querySelector('.futureSort');

if (sortCtrl2) {
  document.addEventListener('facetwp-loaded', function () {
    selector = document.querySelector('.filter__sort select');

    const valSt = selector.value;

    changeSel(valSt);

    if (valSt !== '') {
      sortCtrl2.classList.add('choice');
    } else {
      sortCtrl2.classList.remove('choice');
    }
  });

  sortCtrl2.addEventListener('click', e => {
    e.preventDefault;

    const val = selector.value;

    if (val === '') {
      selector.value = 'old';
    } else {
      selector.value = '';
    }

    FWP.refresh();
  });
}

function changeSel(val) {
  if (val === '') {
    sortCtrl.classList.remove('choice');
  } else {
    sortCtrl.classList.add('choice');
  }
}

const shereLink = document.querySelector('.a2a_button_copy_link');

if (shereLink) {
  let timeoutId;

  shereLink.addEventListener('click', function (e) {
    e.preventDefault();

    var copyText = window.location.href;
    var tempInput = document.createElement('input');
    document.body.appendChild(tempInput);
    tempInput.value = copyText;
    tempInput.select();
    document.execCommand('copy');
    document.body.removeChild(tempInput);

    var button = document.querySelector('.a2a_button_copy_link');
    button.classList.add('copied');

    clearTimeout(timeoutId);

    timeoutId = setTimeout(function () {
      button.classList.remove('copied');
    }, 1000);
  });
}
