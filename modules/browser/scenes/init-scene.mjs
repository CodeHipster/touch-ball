import { Looper } from "../../core/looper.mjs"
import { InitScenePaintSystem } from "../../core/start-scene/painter.mjs"

export class InitScene{

  constructor(canvas, sceneManager){
    this.canvas = canvas
    this.looper = new Looper()
    const painter = new InitScenePaintSystem(this.canvas)
    this.looper.addSystem(painter)
    this.sceneManager = sceneManager
  }

  start(){
    // start rendering
    this.looper.start()

    // Store function in variable, to be able to remove it later.
    this.onTouch = ()=>{
      this.sceneManager.start("game")
    }

    // listen to click
    this.canvas.addEventListener("touchend", this.onTouch)


    // TODO: trigger initialization of audio and fullscreen from pressing this scene.
  }

  stop(){
    this.canvas.removeEventListener("touchend", this.onTouch)
    console.log(this.looper)
    this.looper.stop()
  }

}
