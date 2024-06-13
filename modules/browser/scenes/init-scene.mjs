import { Looper } from "../../core/looper.mjs"
import { InitScenePaintSystem } from "../../core/start-scene/painter.mjs"

export class InitScene {

  constructor(canvas, sceneManager) {
    this.canvas = canvas
    this.looper = new Looper()
    const painter = new InitScenePaintSystem(this.canvas)
    this.looper.addSystem(painter)
    this.sceneManager = sceneManager
  }

  start() {
    // start rendering
    this.looper.start()

    // Store function in variable, to be able to remove it later.
    this.onTouch = () => {
      // wait 200 ms for the first touch events to process
      // They are defined on the window. Perhaps better to make that explicit in this scene.
      setTimeout(() => {
        this.sceneManager.start("game")
      }, 200)
    }

    this.canvas.addEventListener("touchend", this.onTouch)
  }

  stop() {
    this.canvas.removeEventListener("touchend", this.onTouch)
    console.log(this.looper)
    this.looper.stop()
  }

}
