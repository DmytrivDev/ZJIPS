const partnblockItems = document.querySelectorAll('.partnblock__item');

function initPlaceholder() {
  if (!partnblockItems) {
    return;
  }

  partnblockItems.forEach(item => {
    const box = item.querySelector('.partnblock__box');
    const img = box.querySelector('img');

    // Перевірка, чи є зображення
    if (!img || img.src === '') {
      // Отримуємо текст з data-namepartn
      const dataNamePart = box.getAttribute('data-namepartn');

      // Створюємо блок для заглушки
      const placeholderDiv = document.createElement('div');
      placeholderDiv.className = 'partnblock__placehld';

      const placeholderSpan = document.createElement('span'); // Можна додати контент до span, якщо потрібно
      const placeholderText = document.createElement('p');

      // Перевірка наявності data-namepartn
      if (dataNamePart && dataNamePart.trim() !== '') {
        placeholderText.textContent = dataNamePart; // Вставляємо текст, якщо він присутній
      } else {
        placeholderText.textContent = 'Значення не вказано'; // Заглушка тексту
      }

      // Додаємо span і p в placeholderDiv
      placeholderDiv.appendChild(placeholderSpan);
      placeholderDiv.appendChild(placeholderText);

      // Очищаємо вміст box і додаємо заглушку
      box.innerHTML = ''; // Очищуємо вміст box
      box.appendChild(placeholderDiv); // Додаємо заглушку
    }
  });
}

document.addEventListener('DOMContentLoaded', initPlaceholder);
