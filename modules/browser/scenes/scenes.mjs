export class SceneManager{

  scenes = {}
  activeScene

  constructor(canvas){
    this.canvas = canvas;
  }

  addScene(name, scene){
    this.scenes[name] = scene
  }

  start(name){
    if(this.activeScene){
      this.activeScene.stop()
    }
    this.activeScene = this.scenes[name]
    this.activeScene.start()
  }

}