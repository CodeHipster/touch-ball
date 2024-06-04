export class GestureController{
  
  gestureHandlers = []

  addHandler(handler){
    this.gestureHandlers.push(handler)
  }

  touchStart(pos, id){
    console.log("touch start: ", pos, id)
    this.gestureHandlers.forEach(handler => {
      handler.touchStart(pos,id)
    })
  }

  touchEnd(pos, id){
    console.log("touch end: ", pos, id)
  }

  touchMove(pos, id){
    console.log("touch move: ", pos, id)
  }
}
