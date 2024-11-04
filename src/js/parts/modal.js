import scrollLock from 'scroll-lock';
import IMask from 'imask';

const activeModals = new Set();

const header = document.querySelector('header');
const scrollBarWidth = window.innerWidth - document.documentElement.clientWidth;

function showModal(modal) {
  modal.classList.add('isOpened', 'isAnimation');
  scrollLock.disablePageScroll(modal, { reserveScrollBarGap: true });
  activeModals.add(modal);

  header.style.paddingRight = `${scrollBarWidth}px`;
}

export function closeModal(modal) {
  modal.classList.remove('isOpened', 'isAnimation');
  scrollLock.enablePageScroll(modal);
  activeModals.delete(modal);

  header.style.paddingRight = '';
}

function initCloseModal(modal) {
  const modalContainer = modal.querySelector('.containerModal');
  const btnsCloseModal = modal.querySelectorAll('.closeModal');

  btnsCloseModal.forEach(btn => {
    btn.addEventListener('click', () => closeModal(modal));
  });

  if (modalContainer) {
    modalContainer.addEventListener('click', event => {
      if (event.target === modalContainer) {
        closeModal(modal);
      }
    });
  }

  document.addEventListener('keydown', event => {
    if (event.key === 'Escape') {
      closeModal(modal);
    }
  });
}

export function openModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    if (!modal.dataset.listenerAdded) {
      initCloseModal(modal);
      modal.dataset.listenerAdded = 'true';
    }
    showModal(modal);
  }
}

function initOpenModal() {
  const btnsOpenModal = document.querySelectorAll('.openModal');
  btnsOpenModal.forEach(btn => {
    btn.addEventListener('click', () => {
      const modalId = btn.dataset.id;
      if (modalId) {
        openModal(modalId);
      }
    });
  });
}
initOpenModal();

export const maskOptions = {
  mask: '+{38} (000) 000 00 00',
};

document.addEventListener('DOMContentLoaded', function () {
  const telInputs = document.querySelectorAll('input[type="tel"]');

  telInputs.forEach(input => {
    const phoneMask = IMask(input, maskOptions);
  });
});
