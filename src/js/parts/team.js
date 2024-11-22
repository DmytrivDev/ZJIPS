const team = document.querySelector('.team');

if (team) {
  const teamList = team.querySelector('.team__list');
  const teamItem = team.querySelector('.team__item');
  const btnMore = team.querySelector('.btn-def');

  btnMore.addEventListener('click', () => {
    scrollToAddItems();

    teamList.classList.add('addTeam');
    btnMore.style.display = 'none';

    setTimeout(() => {
      teamList.classList.add('isAnim');
    }, 100);
  });

  function checkScreenWidth() {
    const screenWidth = window.innerWidth;

    if (screenWidth >= 775) {
      teamList.classList.remove('addTeam');
      teamList.classList.remove('isAnim');
      btnMore.style.display = '';
    }
  }

  function scrollToAddItems() {
    const itemHeight = teamItem.offsetHeight;
    const scrollItem = itemHeight * 3;

    window.scrollTo({
      top: teamList.offsetTop + scrollItem,
      behavior: 'smooth',
    });
  }

  window.addEventListener('resize', checkScreenWidth);
}
