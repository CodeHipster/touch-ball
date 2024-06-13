import { Windowz } from "./modules/browser/window.mjs";
import { AudioController } from "./modules/browser/sound/audio.mjs";
import { SceneManager } from "./modules/browser/scenes/scenes.mjs";
import { InitScene } from "./modules/browser/scenes/init-scene.mjs";
import { BallScene } from "./modules/browser/scenes/ball-scene.mjs";

const audioController = new AudioController()
await audioController.loadScripts(["audio/noise-generator.js"])
const htmlCanvas = document.getElementById("canvas")
const audioContext = audioController.getContext();
const window = new Windowz(htmlCanvas, audioContext)
window.setup()

const sceneManager = new SceneManager()
sceneManager.addScene("init", new InitScene(htmlCanvas, sceneManager))
sceneManager.addScene("game", new BallScene(audioContext, htmlCanvas))
sceneManager.start("init")


