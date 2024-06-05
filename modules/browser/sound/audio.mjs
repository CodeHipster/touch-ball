export class AudioController{

  constructor(){
    this.audioContext = new AudioContext()
  }

  async loadScripts(scriptLocations){
    // TODO: promise.all?
    for (let index = 0; index < scriptLocations.length; index++) {
      const location = scriptLocations[index];
      await this.audioContext.audioWorklet.addModule(location);
    }
  }

  getContext(){
    return this.audioContext
  }

}