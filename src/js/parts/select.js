import NiceSelect from 'nice-select2';

const projlistSelect = document.querySelector('.projlist__select');
const librarySelect = document.querySelector('.library__select');

let selector;

if (projlistSelect) {
  partNiceSelect(
    projlistSelect.querySelector('select'),
    projlistSelect.dataset.txt
  );
}

if (librarySelect) {
  partNiceSelect(
    librarySelect.querySelector('select'),
    librarySelect.dataset.txt
  );
}

function partNiceSelect(part, txt) {
  if (!document.querySelector('.nice-select.facetwp-dropdown')) {
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

const sortCtrl = document.querySelector('.futureSort');

if (sortCtrl) {
  document.addEventListener('facetwp-loaded', function () {
    selector = document.querySelector('.filter__sort select');

    const valSt = selector.value;

    changeSel(valSt);

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
