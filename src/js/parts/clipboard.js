const copyBtns = document.querySelectorAll('.clipboard');

copyBtns?.forEach(btn => {
  btn.addEventListener('click', event => {
    const copyBox = event.target.closest('.copyBox');

    if (copyBox) {
      const copyElem = copyBox.querySelector('.copyElem');

      if (copyElem) {
        const textElem = copyElem.textContent.trim();

        navigator.clipboard
          .writeText(textElem)
          .then(() => {
            if (!copyBox.timer) {
              copyBox.timer = null;
            }

            copyBox.classList.add('isCopy');

            if (copyBox.timer) {
              clearTimeout(copyBox.timer);
            }

            copyBox.timer = setTimeout(() => {
              copyBox.classList.remove('isCopy');
              copyBox.timer = null;
            }, 1000);
          })
          .catch(err => {
            console.error('Помилка при копіюванні: ', err);
          });
      }
    }
  });
});
