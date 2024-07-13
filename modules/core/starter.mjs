
import { SceneManager } from "./common/scenes.mjs";
import { InitScene } from "./init-scene/init-scene.mjs";
import { BallScene } from "../browser/scenes/ball-scene.mjs";

export default class Starter {

  constructor(platform){
    this.platform = platform
  }

  start(htmlCanvas, audioContext) {
    const sceneManager = new SceneManager()
    sceneManager.addScene("init", new InitScene(this.platform, sceneManager))
    sceneManager.addScene("game", new BallScene(this.platform, htmlCanvas))
    sceneManager.start("init")
  }
}