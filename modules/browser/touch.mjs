import { Xy } from "../core/common/location.mjs"

export default class Touches{
  
  touchStarts = []
  touchEnds = []
  touchMoves = []
  touchCancels = []

  constructor(htmlCanvas){
    this.htmlCanvas = htmlCanvas
  }

  registerTouchStart(fn){
    const listener = touchListener((pos, id, time) => fn(pos, id, time))
    this.htmlCanvas.addEventListener("touchstart", listener)
    this.touchStarts.push(listener)
  }

  registerTouchEnd(fn){
    const listener = touchListener((pos, id, time) => fn(pos, id, time))
    this.htmlCanvas.addEventListener("touchend", listener)
    this.touchEnds.push(listener)
  }

  registerTouchMove(fn){
    const listener = touchListener((pos, id, time) => fn(pos, id, time))
    this.htmlCanvas.addEventListener("touchmove", listener)
    this.touchMoves.push(listener)
  }

  // cancel happens when the touch is interupted by the system, as opposed to the user.
  // for our use case we can handle it the same as ending a touch.
  registerTouchCancel(fn){
    const listener = touchListener((pos, id, time) => fn(pos, id, time))
    this.htmlCanvas.addEventListener("touchcancel", listener)
    this.touchCancels.push(listener)
  }

  clearListeners(){
    
    this.touchStarts.forEach(fn => {
      this.htmlCanvas.removeEventListener("touchstart", fn)
    });
    this.touchStarts = []
    
    this.touchEnds.forEach(fn => {
      this.htmlCanvas.removeEventListener("touchend", fn)
    });
    this.touchEnds = []
    
    this.touchMoves.forEach(fn => {
      this.htmlCanvas.removeEventListener("touchmove", fn)
    });
    this.touchMoves = []
    
    this.touchCancels.forEach(fn => {
      this.htmlCanvas.removeEventListener("touchcancel", fn)
    });
    this.touchCancels = []
  }
}

todo: implement register listeners
export function mapTouches(htmlCanvas, gesturesController) {
  console.log("Mapping touches to gesturesController.")
  const c = htmlCanvas
  c.addEventListener("touchstart", touchListener((pos, id, time) => gesturesController.touchStart(pos, id, time)))
  c.addEventListener("touchend", touchListener((pos, id, time) => gesturesController.touchEnd(pos, id, time)))
  c.addEventListener("touchmove", touchListener((pos, id, time) => gesturesController.touchMove(pos, id, time)))

  c.addEventListener("touchcancel", touchListener((pos, id, time) => gesturesController.touchEnd(pos, id, time)))
}

function touchListener(handler) {
  return (event) => {
    // console.log("Touch event: ", event)
    const touches = event.changedTouches
    for (let i = 0; i < touches.length; i++) {
      const touch = event.changedTouches.item(i)
      const x = touch.clientX
      const y = touch.clientY
      handler(new Xy(x, y), touch.identifier, event.timeStamp)
    }
  }
}