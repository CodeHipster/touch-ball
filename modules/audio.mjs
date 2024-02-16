// for cross browser
const AudioContext = window.AudioContext || window.webkitAudioContext;
const audioCtx = new AudioContext();

// load some sound
const audios = []
for (let i = 0; i < 5; i++) {
  const audioElement = document.querySelector('audio').cloneNode();
  const track = audioCtx.createMediaElementSource(audioElement);
  track.connect(audioCtx.destination);
  audios.push(audioElement)
}
let index = 0
export function tap() {
  // Check if context is in suspended state (autoplay policy)
  if (audioCtx.state === "suspended") {
    audioCtx.resume();
  }
  audios[index++].play();
  if (index >= audios.length) {
    index = 0
  }
}