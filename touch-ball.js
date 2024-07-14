import { Windowz } from "./modules/browser/window.mjs";
import { AudioController } from "./modules/browser/sound/audio.mjs";
import Starter from "./modules/core/starter.mjs";
import PlatformFactory from "./modules/browser/platform.mjs";
import { Background } from "./modules/browser/background.mjs";

const audioController = new AudioController()
await audioController.loadScripts(["audio/noise-generator.js"])
const htmlCanvas = document.getElementById("canvas")
const audioContext = audioController.getContext();
const window = new Windowz(htmlCanvas, audioContext)
window.setup()
const background = new Background(htmlCanvas)
const platform = new PlatformFactory(audioContext, htmlCanvas, background.getCanvas())

new Starter(platform).start();


