import Accordion from 'accordion-js';
import 'accordion-js/dist/accordion.min.css';

const questionList = document.querySelector('.fqa__list');
if (questionList) {
  instAccordion(questionList);
}

function instAccordion(part) {
  new Accordion(part, {
    duration: 400,
    showMultiple: false,
  });
}
