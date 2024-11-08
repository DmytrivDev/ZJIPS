document.addEventListener('DOMContentLoaded', () => {
  const downloadFile = document.querySelectorAll('.download');

  downloadFile?.forEach(download => {
    const downloadTxt = download.querySelector('.download__txt');
    const downloadLink = download.querySelector('.download__link');

    const downloadPath = downloadLink.getAttribute('href');

    const downloadName = downloadPath.split('/').pop();

    downloadTxt.textContent = `${downloadTxt.textContent} ${downloadName}`;
  });
});
