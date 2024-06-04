import { Xy } from "../core/screen/location.mjs"

export function mapTouches(canvas, gesturesController) {
  console.log("Mapping touches to gesturesController.")
  const c = canvas.getHtmlCanvas();
  c.addEventListener("touchstart", touchListener((pos, id)=>gesturesController.touchStart(pos,id)))
  c.addEventListener("touchend", touchListener((pos, id)=>gesturesController.touchEnd(pos,id)))
  c.addEventListener("touchmove", touchListener((pos, id)=>gesturesController.touchMove(pos,id)))
  // cancel happens when the touch is interupted by the system, as opposed to the user.
  // for our use case we can handle it the same as ending a touch.
  c.addEventListener("touchcancel", touchListener((pos, id)=>gesturesController.touchEnd(pos,id)))
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