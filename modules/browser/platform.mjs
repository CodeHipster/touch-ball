import { TapSound } from "./sound/tap.mjs";
import { DragSound } from "./sound/drag.mjs";
import Scheduler from "./scheduler.mjs";
import { Canvas } from "./canvas.mjs";
import { InitScenePaintSystem } from "./start-scene/painter.mjs"

// Class that provides instances of objects that implement some platform provided functionality.
// This class is the boundary between platform specific modules and platform independent core modules
export default class PlatformFactory{

  constructor(audioContext, htmlCanvas){
    this.audioContext = audioContext
    this.htmlCanvas = htmlCanvas
  }

  dragSound(){
    return new DragSound(this.audioContext)
  }

  tapSound(){
    return new TapSound(this.audioContext)
  }

  scheduler(){
    return new Scheduler()
  }

  canvas(){
    return new Canvas(this.htmlCanvas)
  }

  initScenePainter(){
    return new InitScenePaintSystem(this.htmlCanvas)
  }
}