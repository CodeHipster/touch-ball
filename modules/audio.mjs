// for cross browser
const AudioContext = window.AudioContext || window.webkitAudioContext;
const audioCtx = new AudioContext();

await audioCtx.audioWorklet.addModule('processors/noise-generator.js');

// load some sound
const audios = []
const dragSounds = []
for (let i = 0; i < 5; i++) {
  const audioElement = document.querySelector('audio').cloneNode()
  const track = audioCtx.createMediaElementSource(audioElement)
  track.connect(audioCtx.destination)
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


// TODO: schedule a timer that stops after 1 second. at every drag invocation, reset the timer.
export function drag(circleId, speed) {

  if (!dragSounds[circleId]) {
    const noiseGenerator = new AudioWorkletNode(audioCtx, 'noise-generator');
    noiseGenerator.connect(audioCtx.destination);
    dragSounds[circleId] = noiseGenerator;
  }
  let param = dragSounds[circleId].parameters.get('velocity')

  //map speed to range between 0-1, where max speed is 200
  let velocity = speed / 200;
  velocity = (velocity > 1) ? velocity = 1 : velocity;
  param.exponentialRampToValueAtTime(velocity, audioCtx.currentTime);

  console.log(`dragging circle ${circleId} at velocity ${velocity}`)

}


// const startDrag = async (context) => {

//   const noiseGenerator = new AudioWorkletNode(context, 'noise-generator');
//   // const filter = context.createBiquadFilter();
//   noiseGenerator.connect(context.destination);
//   // filter.connect(context.destination);

//   // // configure filter
//   // filter.type = "lowshelf";
//   // filter.frequency.setValueAtTime(1000, context.currentTime);
//   // filter.gain.setValueAtTime(25, context.currentTime);

//   // Connect the oscillator to 'amplitude' AudioParam.
//   // paramAmp = noiseGenerator.parameters.get('amplitude');
//   // paramSpeed = noiseGenerator.parameters.get('velocity');
// };