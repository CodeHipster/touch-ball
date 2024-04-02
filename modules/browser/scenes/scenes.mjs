import { BallScene } from "./ball-scene.mjs";
import { InitScene } from "./init-scene.mjs";

export class SceneController{

  activeScene

  constructor(canvas){
    this.canvas = canvas;
    const ctx = canvas.getContext("2d")

    this.scenes = {
      init: new InitScene(ctx),
      ball: new BallScene(ctx) 
    }
  }

  start(){
    if(this.activeScene){
      console.log("There is already an active scene, can't start twice.")
      return
    }
    this.scenes.init.start()
    this.activeScene = this.scenes.init
  }
  
  switchScene(name){
    const newScene = this.scenes[name]
    if(!newScene) {
      console.error("There is no scene with name: ", name)
      return
    }
    if(this.activeScene){
      this.activeScene.stop()
    }
    this._wipeCanvas()
    this.activeScene = newScene
    newScene.start()
  }

  _wipeCanvas(){
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
  }

}