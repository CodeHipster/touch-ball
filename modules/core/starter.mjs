
import { SceneManager } from "../browser/scenes/scenes.mjs";
import { InitScene } from "../browser/scenes/init-scene.mjs";
import { BallScene } from "../browser/scenes/ball-scene.mjs";

export default class Starter {

  constructor() { }

  start(htmlCanvas, audioContext) {
    const sceneManager = new SceneManager()
    sceneManager.addScene("init", new InitScene(htmlCanvas, sceneManager))
    sceneManager.addScene("game", new BallScene(audioContext, htmlCanvas))
    sceneManager.start("init")
  }
}