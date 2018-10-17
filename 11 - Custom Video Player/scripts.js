//get player
const player = document.querySelector('.player');
const video = player.querySelector('.viewer');

const progressBar = player.querySelector('.progress');
const progress = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');

//pausing video on click
function togglePlay() {
  if(video.paused) video.play();
  else video.pause();
}

function updateButton(){
  toggle.textContent = this.paused ? '►' : '⏸';
}

function skip(){
  video.currentTime += parseInt(this.dataset.skip);
}

function updateProgress(){
  const currentPercent = (video.currentTime / video.duration) * 100;
  progress.style.flexBasis = `${currentPercent}%`;
}

function updateRange(){
    video[this.name] = this.value;
}

function updateTime(e){
  const currentPercent = (e.offsetX / progressBar.offsetWidth);
  video.currentTime = video.duration * currentPercent;
}

video.addEventListener('click', togglePlay);
toggle.addEventListener('click', togglePlay);
video.addEventListener('play', updateButton);
video.addEventListener("timeupdate", updateProgress);
video.addEventListener('pause', updateButton);
// progressBar.addEventListener('')
skipButtons.forEach(button => button.addEventListener('click', skip));

ranges.forEach(range => range.addEventListener('input', updateRange));

let mouseDown = false;
progressBar.addEventListener('click', updateTime);
progressBar.addEventListener('mousedown', () => mouseDown = true);
progressBar.addEventListener('mouseup', () => mouseDown = false);
progressBar.addEventListener('mousemove', (e) => {if(mouseDown) updateTime(e)});