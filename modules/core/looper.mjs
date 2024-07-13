// Looper will continously call onTick on registered systems
// It will also measure the fps of the system.
export class Looper {

  halt = true
  fps
  systems = []

  constructor(scheduler) {
    this.scheduler = scheduler
    this.fps = { frames: 0, time: 0 }
  }

  addSystem(system) {
    this.systems.push(system)
  }

  // Starts looping and updating systems.
  start() {
    console.log("Start ticking")
    this.fps.time = 0
    this.fps.frames = 0
    this.halt = false
    this.#loop()
  }

  stop() {
    this.halt = true
  }

  #loop(timeStamp) {
    // Calculate fps
    if ((timeStamp - this.fps.time) > 1000) {
      const now = timeStamp
      const secondsPassed = (now - this.fps.time) / 1000;
      const fps = Math.round(this.fps.frames / secondsPassed);

      console.log(`FPS: ${fps}`)

      this.fps.time = now
      this.fps.frames = 0
    }
    this.fps.frames++

    this.#updateSystems()

    if(!this.halt) 
      this.scheduler.schedule((timeStamp) => this.#loop(timeStamp))
  }

  #updateSystems() {
    this.systems.forEach(system => {
      system.onTick()
    })
  }
}