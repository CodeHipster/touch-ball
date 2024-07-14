import { TapSound } from "./sound/tap.mjs";
import { DragSound } from "./sound/drag.mjs";
import Scheduler from "./scheduler.mjs";
import { Canvas } from "./canvas.mjs";
import { Painter as InitScenePainter} from "./init-scene/painter.mjs"
import { Painter as GameScenePainter} from "./game-scene/painter.mjs";

// Class that provides instances of objects that implement some platform provided functionality.
// This class is the boundary between platform specific modules and platform independent core modules
export default class PlatformFactory{

  constructor(audioContext, htmlCanvas, backgroundCanvas){
    this.audioContext = audioContext
    this.htmlCanvas = htmlCanvas
    this.backgroundCanvas = backgroundCanvas
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
    if(!this.canvasInstance){
      this.canvasInstance = new Canvas(this.htmlCanvas)
    }
    return this.canvasInstance
  }

  initScenePainter(){
    return new InitScenePainter(this.htmlCanvas)
  }

  gameScenePainter(){
    return new GameScenePainter(this.htmlCanvas, this.backgroundCanvas)
  }
}