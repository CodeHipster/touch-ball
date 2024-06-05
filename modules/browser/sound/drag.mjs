export class DragSound {
  // Holding a pool tap sound sources, so we can play multiple at the same time.
  // without wasting to many resources.
  audios = []
  playing = []

  constructor(audioContext) {
    this.audioContext = audioContext

    // creating pool
    this.#increaseAudioPool()
  }

  #increaseAudioPool(amount = 1) {
    for (let i = 0; i < amount; i++) {
      const audio = new AudioWorkletNode(this.audioContext, 'noise-generator')
      this.audios.push(audio)
    }
  }

  // velocity in 0-1
  play(velocity) {
    const audio = this.audios.pop()
    if (!audio) {
      this.#increaseAudioPool()
      audio = this.audios.pop();
    }
    this.playing.push(audio)
    const id = this.playing.length - 1

    let param = audio.parameters.get('velocity')
    param.linearRampToValueAtTime(velocity, this.audioContext.currentTime)
    // audio is always playing, to stop it we disconnect it from the output
    // to start we connect it.
    audio.connect(this.audioContext.destination)
    return id
  }

  stop(id) {
    const audio = this.playing[id]
    if (!audio) {
      console.log("audio is not playing, already stopped?")
      return
    }

    audio.disconnect()
    this.audios.push(audio)
  }

  // velocity from 0-1
  setVelocity(id, velocity) {
    const audio = this.playing[id]
    if (!audio) {
      console.log("audio is not playing, can't set pitch")
      return
    }
    let param = audio.parameters.get('velocity')
    param.linearRampToValueAtTime(velocity, this.audioContext.currentTime)
  }
}