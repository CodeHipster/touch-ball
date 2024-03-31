export class GestureController{
  
  touchStart(pos, id){
    console.log("touch start: ", pos, id)
  }

  touchEnd(pos, id){
    console.log("touch end: ", pos, id)
  }

  touchMove(pos, id){
    console.log("touch move: ", pos, id)
  }
}