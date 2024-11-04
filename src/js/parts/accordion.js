import Accordion from 'accordion-js';
import 'accordion-js/dist/accordion.min.css';

const weblist = document.querySelector('.weblist__list');

if (weblist) {
  new Accordion(weblist, {
    duration: 400,
    showMultiple: false,
  });

  const openModalButtons = weblist.querySelectorAll('.btn-def');

  openModalButtons.forEach(button => {
    button.addEventListener('click', event => {
      event.stopPropagation();
    });
  });
}
