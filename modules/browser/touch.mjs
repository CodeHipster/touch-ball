import { Xy } from "../core/screen/location.mjs"

export function mapTouches(htmlCanvas, gesturesController) {
  console.log("Mapping touches to gesturesController.")
  const c = htmlCanvas
  c.addEventListener("touchstart", touchListener((pos, id, time) => gesturesController.touchStart(pos, id, time)))
  c.addEventListener("touchend", touchListener((pos, id, time) => gesturesController.touchEnd(pos, id, time)))
  c.addEventListener("touchmove", touchListener((pos, id, time) => gesturesController.touchMove(pos, id, time)))
  // cancel happens when the touch is interupted by the system, as opposed to the user.
  // for our use case we can handle it the same as ending a touch.
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