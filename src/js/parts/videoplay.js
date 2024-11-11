let activeVideo = null;

const playVideo = async videoElement => {
  if (activeVideo && activeVideo !== videoElement) {
    activeVideo.pause();
  }

  try {
    await videoElement.play();
    videoElement.controls = true;
    activeVideo = videoElement;
  } catch (err) {
    console.log(err);
  }
};

document.querySelectorAll('.inspiration__video').forEach(videoItem => {
  videoItem.addEventListener('click', function () {
    const video = videoItem.querySelector('video');

    if (video !== activeVideo) {
      const button = videoItem.querySelector('.video__play');

      if (button) {
        button.style.display = 'none';
        videoItem.classList.add('bg-hidd');
      }

      playVideo(video);
    }
  });
});
