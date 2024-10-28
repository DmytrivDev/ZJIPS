const copyBtns = document.querySelectorAll('.clipboard');

copyBtns?.forEach(btn => {
  btn.addEventListener('click', () => {
    const idCopy = btn.dataset.id;

    if (idCopy) {
      const link = document.getElementById(idCopy);
      const contactBox = btn.closest('.footer__copy');

      if (link) {
        const linkText =
          idCopy === 'mapCopy'
            ? link.getAttribute('href')
            : link.textContent.trim();

        navigator.clipboard
          .writeText(linkText)
          .then(() => {
            if (!contactBox.timer) {
              contactBox.timer = null;
            }

            contactBox.classList.add('isCopy');

            if (contactBox.timer) {
              clearTimeout(contactBox.timer);
            }

            contactBox.timer = setTimeout(() => {
              contactBox.classList.remove('isCopy');
              contactBox.timer = null;
            }, 1000);
          })
          .catch(err => {
            console.error('Помилка при копіюванні: ', err);
          });
      }
    }
  });
});
