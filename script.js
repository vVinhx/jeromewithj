let currentMusic = 0;

const music = document.querySelector('audio');

const title = document.querySelector('.title');
const artist = document.querySelector('.artist');
const songSlider = document.querySelector('.seek-bar');
const play = document.querySelector('.play');
const prev = document.querySelector('.prev');
const next = document.querySelector('.next');
const shuffle = document.querySelector('.shuffle');
const repeat = document.querySelector('.repeat');
const currentTime = document.querySelector('.current-time');
const duration = document.querySelector('.duration');
const cover = document.querySelector('.cover');

play.addEventListener('click', () => {
  if (music.paused) {
    music.play();
    play.classList.remove('fa-solid fa-play');
    play.classList.add('fa-solid fa-pause');
  } else {
    music.pause();
    play.classList.remove('fa-solid fa-pause');
    play.classList.add('fa-solid fa-play');
  }
});

const setMusic = (i) => {
  songSlider.value = 0;
  let song = songs[i];
  currentMusic = i;
  music.src = song.path;
  title.innerText = song.title;
  artist.innerText = song.artist;
  cover.style.backgroundImage = `url(${song.cover})`;
  currentTime.innerText = '00:00';
  duration.innerText = '00:00';

  music.addEventListener('loadedmetadata', () => {
    songSlider.max = music.duration;
    duration.innerHTML = formatTime(music.duration);
  });
};

setMusic(0);

const formatTime = (time) => {
  let min = Math.floor(time / 60);
  if(min < 10) {
    min = `0${min}`;
  }
  let sec = Math.floor(time % 60);
  if(sec < 10) {
    sec = `0${sec}`;
  }
  return `${min}:${sec}`;

};

setInterval(() => {
  songSlider.value = music.currentTime;
  currentTime.innerHTML = formatTime(music.currentTime);
  if(Math.floor(music.currentTime) == Math.floor(songSlider.max)) {
    next.click();
  }
}, 500);

songSlider.addEventListener('click', (event) => {
  const clickPosition = event.clientX - songSlider.getBoundingClientRect().left;
  const sliderWidth = songSlider.offsetWidth;
  const clickPercentage = clickPosition / sliderWidth;
  const newTime = clickPercentage * music.duration;
  music.currentTime = newTime;
});

const playMusic = () => {
  music.play();
  play.classList.add('fa-solid fa-pause'); // This adds the 'pause' class to indicate the music is playing
};

next.addEventListener('click', () => {
  if(currentMusic >= songs.length - 1) {
    currentMusic = 0;
  } else {
    currentMusic++;
  }
  setMusic(currentMusic);
  playMusic();
  console.log(play.classList);
});

prev.addEventListener('click', () => {
  if(currentMusic <= 0) {
    currentMusic = songs.length - 1;
  } else {
    currentMusic--;
  }
  setMusic(currentMusic);
  playMusic();
});

