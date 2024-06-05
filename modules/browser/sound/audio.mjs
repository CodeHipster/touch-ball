export class AudioController{

  constructor(){
    this.audioCtx = new AudioContext()
  }

  getContext(){
    return this.audioCtx
  }

  
}