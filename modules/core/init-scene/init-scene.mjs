import { Looper } from "../common/looper.mjs"

export class InitScene {

  constructor(platform, sceneManager) {

    const scheduler = platform.scheduler()
    this.canvas = platform.canvas()
    this.looper = new Looper(scheduler)
    const painter = platform.initScenePainter()
    this.looper.addSystem(painter)
    this.sceneManager = sceneManager
  }

  start() {
    // start rendering
    this.looper.start()
    this.canvas.registerTouch(() => { this.#onTouch() })
  }

  stop() {
    this.canvas.clearTouches()
    console.log(this.looper)
    this.looper.stop()
  }


  #onTouch() {
    // wait 200 ms for the first touch events to process
    // They are defined on the window. Perhaps better to make that explicit in this scene.
    console.log("touch")
    setTimeout(() => {
      this.sceneManager.start("game")
    }, 200)
  }

}
