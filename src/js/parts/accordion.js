import Accordion from 'accordion-js';
import 'accordion-js/dist/accordion.min.css';

const weblist = document.querySelector('.weblist__list');

if (weblist) {
  new Accordion(weblist, {
    duration: 400,
    showMultiple: false,
  });

  const panels = weblist.querySelectorAll('.ac-panel');

  panels.forEach(panel => {
    panel.addEventListener('click', event => {
      event.stopPropagation();
    });
  });
}
