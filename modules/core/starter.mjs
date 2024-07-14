
import { SceneManager } from "./common/scenes.mjs";
import { InitScene } from "./init-scene/init-scene.mjs";
import { BallScene } from "./game-scene/ball-scene.mjs";

export default class Starter {

  constructor(platform) {
    this.platform = platform
  }

  start() {
    const sceneManager = new SceneManager()
    sceneManager.addScene("init", new InitScene(this.platform, sceneManager))
    sceneManager.addScene("game", new BallScene(this.platform))
    sceneManager.start("init")
  }
}