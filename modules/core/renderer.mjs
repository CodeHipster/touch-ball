export class Renderer {
  store
  fps
  constructor(store, painter) {
    this.store = store
    this.painter = painter
    this.fps = {frames:0, time:0}
  }

  startRendering() {
    console.log("Starting renderer")
    this.fps.time = 0
    this.fps.frames = 0
    this.#loop()
  }

  #loop(timeStamp) {
    // Calculate fps
    if((timeStamp - this.fps.time) > 1000){
      const now = timeStamp
      const secondsPassed = (now - this.fps.time) / 1000;
      const fps = Math.round(this.fps.frames / secondsPassed);

      console.log(`FPS: ${fps}`)

      this.fps.time = now
      this.fps.frames = 0
    }
    this.fps.frames ++

    this.#render()

    window.requestAnimationFrame((timeStamp)=>this.#loop(timeStamp))
  }

  #render(){
    this.painter.wipe()
    this.store.getBalls().forEach(ball => {
      this.painter.paint(ball)
    });
  }
}