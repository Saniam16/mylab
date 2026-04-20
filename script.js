document.addEventListener("DOMContentLoaded", () => {

  console.log("JavaScript is connected!");


  const audio = document.getElementById("audio");
  const playBtn = document.getElementById("playBtn");
  const pauseBtn = document.getElementById("pauseBtn");
  const muteBtn = document.getElementById("muteBtn");
  const volumeSlider = document.getElementById("volumeSlider");
  const progressBar = document.getElementById("progressBar");
  const currentTimeEl = document.getElementById("currentTime");
  const durationEl = document.getElementById("duration");
  const speedControl = document.getElementById("speedControl");

  
  function updateUI() {
    playBtn.textContent = audio.paused ? " Play" : " Pause";
  }

  audio.addEventListener("play", updateUI);
  audio.addEventListener("pause", updateUI);

  
  playBtn.addEventListener("click", () => {
    audio.play();
  });

  pauseBtn.addEventListener("click", () => {
    audio.pause();
  });

  
  volumeSlider.addEventListener("input", () => {
    audio.volume = volumeSlider.value;
  });


  muteBtn.addEventListener("click", () => {
    audio.muted = !audio.muted;
    muteBtn.textContent = audio.muted ? " Unmute" : " Mute";
  });

 
  function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  }

  
  audio.addEventListener("loadedmetadata", () => {
    progressBar.max = audio.duration;
    durationEl.textContent = formatTime(audio.duration);
  });

  audio.addEventListener("timeupdate", () => {
    progressBar.value = audio.currentTime;
    currentTimeEl.textContent = formatTime(audio.currentTime);
  });


  progressBar.addEventListener("input", () => {
    audio.currentTime = progressBar.value;
  });

  
  if (speedControl) {
    speedControl.addEventListener("change", () => {
      audio.playbackRate = speedControl.value;
    });
  }


  audio.addEventListener("ended", () => {
    progressBar.value = 0;
    currentTimeEl.textContent = "0:00";
    updateUI();
  });

 
  document.addEventListener("keydown", (e) => {

    if (e.code === "Space") {
      e.preventDefault();
      audio.paused ? audio.play() : audio.pause();
    }

    if (e.code === "ArrowRight") {
      audio.currentTime = Math.min(audio.currentTime + 5, audio.duration);
    }

    if (e.code === "ArrowLeft") {
      audio.currentTime = Math.max(audio.currentTime - 5, 0);
    }

  });

});
