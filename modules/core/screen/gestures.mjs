export class GestureController {

  gestureHandlers = []

  addHandler(handler) {
    this.gestureHandlers.push(handler)
  }

  touchStart(pos, id, time) {
    this.gestureHandlers.forEach(handler => {
      handler.touchStart(pos, id, time)
    })
  }

  touchEnd(pos, id, time) {
    this.gestureHandlers.forEach(handler => {
      handler.touchEnd(pos, id, time)
    })
  }

  touchMove(pos, id, time) {
    this.gestureHandlers.forEach(handler => {
      handler.touchMove(pos, id, time)
    })
  }
}
