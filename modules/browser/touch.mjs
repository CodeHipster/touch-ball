import { Xy } from "../core/common/location.mjs"

export default class Touches {

  // Store listener functions to be able to remove them at a later time.
  touchStarts = []
  touchEnds = []
  touchMoves = []
  touchCancels = []

  constructor(htmlCanvas) {
    this.htmlCanvas = htmlCanvas
  }

  registerTouchStart(fn) {
    const listener = touchListener(fn)
    this.htmlCanvas.addEventListener("touchstart", listener)
    this.touchStarts.push(listener)
  }

  registerTouchEnd(fn) {
    const listener = touchListener(fn)
    this.htmlCanvas.addEventListener("touchend", listener)
    // cancel happens when the touch is interupted by the system, as opposed to the user.
    // for our use case we can handle it the same as ending a touch.
    this.htmlCanvas.addEventListener("touchcancel", listener)
    this.touchEnds.push(listener)
    this.touchCancels.push(listener)
  }

  registerTouchMove(fn) {
    const listener = touchListener(fn)
    this.htmlCanvas.addEventListener("touchmove", listener)
    this.touchMoves.push(listener)
  }

  clearListeners() {
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