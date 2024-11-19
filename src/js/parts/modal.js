import scrollLock from 'scroll-lock';

const activeModals = new Set();

const header = document.querySelector('header');

function getScrollBarWidth() {
  const scrollBarWidth =
    window.innerWidth - document.documentElement.clientWidth;
  return scrollBarWidth;
}
window.addEventListener('resize', getScrollBarWidth);

function showModal(modal) {
  header.style.paddingRight = `${getScrollBarWidth()}px`;

  modal.classList.add('isOpened', 'isAnimation');
  scrollLock.disablePageScroll(modal, { reserveScrollBarGap: true });
  activeModals.add(modal);
  checkStepModalParts(modal);
}

export function closeModal(modal) {
  modal.classList.remove('isOpened', 'isAnimation');
  scrollLock.enablePageScroll(modal);
  activeModals.delete(modal);
  checkStepModalParts(modal);

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

export function checkStepModalParts(modal) {
  const partF = modal.querySelector('.modal__part1');
  const partS = modal.querySelector('.modal__part2');

  if (partF && partS) {
    partF.classList.remove('hidPart');
    partS.classList.add('hidPart');
  }
}

export function stepModalParts(modal) {
  const partF = modal.querySelector('.modal__part1');
  const partS = modal.querySelector('.modal__part2');

  if (partF && partS) {
    partF.classList.add('hidPart');
    partS.classList.remove('hidPart');
  }
}

// export function checkStepModalParts(modal) {
//   const partF = modal.querySelector('.modal__part1');
//   const partS = modal.querySelector('.modal__part2');

//   if (partF && partS) {
//     partF.classList.remove('hidPart');
//     partF.classList.add('nextPart');

//     partS.classList.remove('nextPart');
//     partS.classList.add('hidPart');

//     partF.classList.add('isAnim');
//     partS.classList.remove('isAnim');
//   }
// }

// export function stepModalParts(modal) {
//   const partF = modal.querySelector('.modal__part1');
//   const partS = modal.querySelector('.modal__part2');

//   if (partF && partS) {
//     partF.classList.remove('nextPart');
//     partF.classList.add('hidPart');

//     partS.classList.remove('hidPart');
//     partS.classList.add('nextPart');
//     setTimeout(() => {
//       partF.classList.remove('isAnim');
//       partS.classList.add('isAnim');
//     }, 100);
//   }
// }
