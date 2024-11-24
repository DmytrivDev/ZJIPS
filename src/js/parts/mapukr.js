const regions = document.querySelectorAll('.mapukr__region');

regions?.forEach(region => {
  region.addEventListener('mouseenter', () => {
    const parent = region.parentNode;
    parent.appendChild(region);
  });

  region.addEventListener('touchstart', () => {
    const parent = region.parentNode;
    parent.appendChild(region);
  });
});
