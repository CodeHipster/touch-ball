export class PaintOnTouch{
  constructor(store){
    this.store = store
  }

  touchStart(pos, id){
    console.log("paint on touch")
    const balls = this.store.getBalls()
    const ball = balls.find(pos)
    if (ball){
      ball.randomizeColor()
    }
  }
}