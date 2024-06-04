export class TouchBall{
  constructor(store){
    this.store = store
  }

  touchStart(pos, id){
    const balls = this.store.getBalls()
    const ball = balls.find(pos)
    if (ball){
      ball.randomizeColor()
    }
  }

  touchEnd(pos, id){
  }

  touchMove(pos, id){
  }
}