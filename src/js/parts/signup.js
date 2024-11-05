import axios from 'axios';
import IMask from 'imask';
import { stepModalParts } from './modal';

const signupForm = document.getElementById('signupForm');
const modal = document.getElementById('signupModal');

if (signupForm) {
  signupForm.addEventListener('submit', event => {
    event.preventDefault();

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
