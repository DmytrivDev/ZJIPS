import { handleRegionClick } from './splidemap.js';

function centerRegionNames() {
  const mapContainer = document.querySelector('.mapukr');
  if (!mapContainer) return;

  const svgElement = mapContainer.querySelector('svg');
  const regions = svgElement.querySelectorAll('.mapukr__region');

  regions?.forEach(region => {
    const regionId = region.id;
    const regionName = region.dataset.name || regionId;
    const bbox = region.getBBox(); // Размеры и позиция области

    const screenWidth = window.innerWidth >= 960;

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

    const scale = Math.min(scaleX, scaleY);

    // Установка позиций
    if (regionId === 'Sumy') {
      nameElement.style.transform = 'translate(-100%, 45%)';
    } else if (regionId === 'Odesa') {
      nameElement.style.transform = 'translate(-65%, -25%)';
    } else if (regionId === 'Cherkasy') {
      nameElement.style.transform = 'translate(-85%, 15%)';
    } else if (regionId === 'Kropivnitsky') {
      nameElement.style.transform = 'translate(-90%, 15%)';
    } else if (regionId === 'Herson' || regionId === 'Rivne') {
      nameElement.style.transform = 'translate(-80%, -15%)';
    } else if (!screenWidth && regionId === 'Ivano-Frankivsk') {
      nameElement.style.transform = 'translate(5%, -25%)';
      nameElement.style.borderRadius =
        '0.07781rem 0.46675rem 0.46675rem 0.46675rem';
    } else if (!screenWidth && regionId === 'Uzhgorod') {
      nameElement.style.transform = 'translate(0%, 10%)';
      nameElement.style.borderRadius =
        '0.07781rem 0.46675rem 0.46675rem 0.46675rem';
    } else {
      nameElement.style.borderRadius = '';
      nameElement.style.transform = '';
    }
    nameElement.style.top = `${centerY * scale}px`;
    nameElement.style.left = `${centerX * scale}px`;
  });
}

function checkRegionDisabled() {
  const regions = document.querySelectorAll('.mapukr__region');

  regions?.forEach(region => {
    const disabledRegion = region.dataset.disabled;
    if (disabledRegion === 'true') {
      region.classList.add('isDisabledObl');
    }
  });
}

function handleRegionChoose() {
  const regions = document.querySelectorAll('.mapukr__region');

  let activeRegion = document.querySelector('.mapukr__region.isCurrentObl');

  regions?.forEach(region => {
    const bringToFront = () => {
      const parent = region.parentNode;
      parent.appendChild(region);
    };
    const containDisabled = region.classList.contains('isDisabledObl');

    region.addEventListener('click', e => {
      bringToFront();
      const targetRegion = e.target.closest('.mapukr__region');

      if (activeRegion !== targetRegion && !containDisabled) {
        activeRegion.classList.remove('isCurrentObl');
        activeRegion.classList.remove('isHoverObl');

        targetRegion.classList.add('isCurrentObl');
        activeRegion = targetRegion;

        handleRegionClick(targetRegion.id);

        updateRegionVisibility();
      }
    });
  });
}

function enableRegionHoverEffect() {
  const regions = document.querySelectorAll('.mapukr__region');

  regions?.forEach(region => {
    const containDisabled = region.classList.contains('isDisabledObl');

    const handleMouseEnter = () => {
      if (!containDisabled) {
        region.classList.add('isHoverObl');
        updateRegionVisibility();
      }
    };
    const handleMouseLeave = () => {
      region.classList.remove('isHoverObl');
      updateRegionVisibility();
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

    if (region.classList.contains('isCurrentObl')) {
      bringToFront();
      nameElement.classList.add('currentName');
    } else {
      nameElement.classList.remove('currentName');
    }

    if (region.classList.contains('isHoverObl')) {
      bringToFront();
      nameElement.classList.add('hoverName');
    } else {
      nameElement.classList.remove('hoverName');
    }
  });
}

function initMap() {
  centerRegionNames();
  checkRegionDisabled();
  handleRegionChoose();
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
