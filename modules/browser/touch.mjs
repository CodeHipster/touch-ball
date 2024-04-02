import { Xy } from "../core/screen/location.mjs"

export function mapTouches(canvas, gesturesController) {
  console.log("Mapping touches to gesturesController.")
  canvas.addEventListener("touchstart", touchListener(gesturesController.touchStart))
  canvas.addEventListener("touchend", touchListener(gesturesController.touchEnd))
  canvas.addEventListener("touchmove", touchListener(gesturesController.touchMove))
  // cancel happens when the touch is interupted by the system, as opposed to the user.
  // for our use case we can handle it the same as ending a touch.
  canvas.addEventListener("touchcancel", touchListener(gesturesController.touchEnd))
}

function touchListener(handler){
  return (event) => {
    console.log("Touch event: ", event.type)
    const touches = event.changedTouches
    for (let i = 0; i < touches.length; i++) {
      const touch = event.changedTouches.item(i)
      const x = touch.clientX
      const y = touch.clientY
      handler(new Xy(x, y), touch.identifier)
    }
  }
}