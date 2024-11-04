import IMask from 'imask';
import { stepModalParts } from './modal';

const modalForm = document.querySelector('.modal__form');

if (modalForm) {
  modalForm.addEventListener('submit', event => {
    event.preventDefault();
    const modal = document.getElementById('signupForm');

    stepModalParts(modal);
  });
}

const maskOptions = {
  mask: '+{38} (000) 000 00 00',
};

document.addEventListener('DOMContentLoaded', function () {
  const telInputs = document.querySelectorAll('input[type="tel"]');

  telInputs.forEach(input => {
    const phoneMask = IMask(input, maskOptions);
  });
});
