export class GestureController {

  gestureHandlers = []
  touchStopTimers = []

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

      // postpone stop
      const msToStop = 100
      clearTimeout(this.touchStopTimers[id]);
      this.touchStopTimers[id] = setTimeout(() => {
        handler.moveStop(pos, id, time+msToStop);
      }, msToStop);
    })
  }
}
