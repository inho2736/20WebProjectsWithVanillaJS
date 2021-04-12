const media = document.querySelector('#video');
const controls = document.querySelector('.controls');

const play = document.querySelector('#play');
const playIcon = play.querySelector('i');
const stop = document.querySelector('#stop');

const progress = document.querySelector('#progress');
const timestamp = document.querySelector('#timestamp');

play.addEventListener('click', playPauseMedia);
media.addEventListener('click', playPauseMedia);

function playPauseMedia() {
  if (media.paused) {
    media.play();
    playIcon.className = 'fa fa-pause';
  } else {
    media.pause();
    playIcon.className = 'fa fa-play';
  }
}

stop.addEventListener('click', stopMedia);
media.addEventListener('ended', stopMedia);

function stopMedia() {
  media.pause();
  media.currentTime = 0;
  playIcon.className = 'fa fa-play';
}

media.addEventListener('timeupdate', setTime);

function setTime() {
  let minutes = Math.floor(media.currentTime / 60);
  let seconds = Math.floor(media.currentTime - minutes * 60);
  let minuteValue;
  let secondValue;

  if (minutes < 10) {
    minuteValue = '0' + minutes;
  } else {
    minuteValue = minutes;
  }

  if (seconds < 10) {
    secondValue = '0' + seconds;
  } else {
    secondValue = seconds;
  }

  let mediaTime = minuteValue + ':' + secondValue;
  timestamp.textContent = mediaTime;

  progress.value = (media.currentTime / media.duration) * 100;
}

progress.addEventListener('change', onChangeProgress);
function onChangeProgress() {
  media.currentTime = (progress.value / 100) * media.duration;
}
