export class TapSound{
  // Holding a pool tap sound sources, so we can play multiple at the same time.
  // without wasting to many resources.
  audios = []
  // current index in array
  index = 0

  constructor(audioContext){
    this.audioContext = audioContext

    // creating pool
    for (let i = 0; i < 10; i++) {
      const audioElement = new Audio('audio/tap.m4a')
      const source = audioContext.createMediaElementSource(audioElement)
      source.connect(audioContext.destination)
      this.audios.push(audioElement)
    }
  }

  play(){
    this.audios[this.index++].play();
    if (this.index >= this.audios.length) {
      this.index = 0
    }
  }
}