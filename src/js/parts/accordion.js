import Accordion from 'accordion-js';
import 'accordion-js/dist/accordion.min.css';

const weblist = document.querySelector('.weblist__list');

if (weblist) {
  let accordionInstance = null;

  document.addEventListener('facetwp-loaded', function () {
    const panels = weblist.querySelectorAll('.ac-panel');

    panels.forEach(panel => {
      panel.addEventListener('click', event => {
        event.stopPropagation();
      });
    });

    if (accordionInstance) {
      accordionInstance.destroy();
    }

    accordionInstance = new Accordion(weblist, {
      duration: 400,
      showMultiple: false,
    });
  });
}

const bprlist = document.querySelector('.bpr__list');

if (bprlist) {
  new Accordion(bprlist, {
    duration: 400,
    showMultiple: false,
  });

  const panels = bprlist.querySelectorAll('.ac-panel');

  panels.forEach(panel => {
    panel.addEventListener('click', event => {
      event.stopPropagation();
    });
  });
}
