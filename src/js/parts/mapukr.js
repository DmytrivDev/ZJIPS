function centerRegionNames() {
  const mapContainer = document.querySelector('.mapukr');
  if (!mapContainer) return;

  const svgElement = mapContainer.querySelector('svg');
  const regions = svgElement.querySelectorAll('.mapukr__region');

  regions?.forEach(region => {
    const regionId = region.id;
    const regionName = region.dataset.name || regionId;
    const bbox = region.getBBox(); // Размеры и позиция области

    // Проверяем, существует ли элемент <p>, чтобы избежать дублирования
    let nameElement = document.querySelector(
      `.nameobl[data-region="${regionId}"]`
    );
    if (!nameElement) {
      nameElement = document.createElement('p');
      nameElement.className = 'nameobl';
      nameElement.textContent = regionName;
      nameElement.setAttribute('data-region', regionId);
      mapContainer.appendChild(nameElement);
    }

    // Вычисляем позиции в пикселях относительно SVG
    const centerX = bbox.x + bbox.width / 2;
    const centerY = bbox.y + bbox.height / 2;

    // Преобразуем координаты в абсолютные значения относительно .mapukr
    const svgWidth = svgElement.viewBox.baseVal.width || svgElement.clientWidth;
    const svgHeight =
      svgElement.viewBox.baseVal.height || svgElement.clientHeight;

    const scaleX = mapContainer.offsetWidth / svgWidth;
    const scaleY = mapContainer.offsetHeight / svgHeight;

    if (regionId === 'Sumy') {
      nameElement.style.top = `${centerY * scaleY + 15}px`;
      nameElement.style.left = `${centerX * scaleX - 10}px`;
    } else if (regionId === 'Odesa') {
      nameElement.style.top = `${centerY * scaleY + 5}px`;
      nameElement.style.left = `${centerX * scaleX + 25}px`;
    } else if (regionId === 'Cherkasy' || regionId === 'Kropivnitsky') {
      nameElement.style.top = `${centerY * scaleY + 5}px`;
      nameElement.style.left = `${centerX * scaleX + 10}px`;
    } else {
      nameElement.style.top = `${centerY * scaleY}px`;
      nameElement.style.left = `${centerX * scaleX}px`;
    }
  });
}

function updateRegionVisibility() {
  const regions = document.querySelectorAll('.mapukr__region');

  regions?.forEach(region => {
    const bringToFront = () => {
      const parent = region.parentNode;
      parent.appendChild(region);
    };

    const regionId = region.id;
    const nameElement = document.querySelector(
      `.nameobl[data-region="${regionId}"]`
    );

    if (!nameElement) return;

    if (region.classList.contains('isCurrent')) {
      bringToFront();
      nameElement.classList.add('isVisbl');
    } else {
      nameElement.classList.remove('isVisbl');
    }
  });
}

function enableRegionHoverEffect() {
  const regions = document.querySelectorAll('.mapukr__region');

  regions?.forEach(region => {
    let isCurrent = false;

    const handleMouseEnter = () => {
      if (!region.classList.contains('isCurrent')) {
        isCurrent = true;
        region.classList.add('isCurrent');
        updateRegionVisibility();
      }
    };
    const handleMouseLeave = () => {
      if (isCurrent) {
        region.classList.remove('isCurrent');
        updateRegionVisibility();
      }
    };

    const updateListeners = () => {
      const screenWidth = window.innerWidth >= 960;

      region.removeEventListener('mouseenter', handleMouseEnter);
      region.removeEventListener('mouseleave', handleMouseLeave);

      if (screenWidth) {
        region.addEventListener('mouseenter', handleMouseEnter);
        region.addEventListener('mouseleave', handleMouseLeave);
      }
    };

    updateListeners();

    window.addEventListener('resize', updateListeners);
  });
}

function initMap() {
  centerRegionNames();
  enableRegionHoverEffect();
  updateRegionVisibility();

  window.addEventListener('resize', debounce(centerRegionNames, 200));
}

function debounce(func, delay) {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), delay);
  };
}

document.addEventListener('DOMContentLoaded', initMap);
