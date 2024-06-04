export class TouchBall{
  constructor(store){
    this.store = store
  }

  touchStart(pos, id, time){
    const balls = this.store.getBalls()
    const ball = balls.find(pos)
    if (ball){
      ball.randomizeColor()
    }
  }

  touchEnd(pos, id, time){
  }

  touchMove(pos, id, time){
  }

  moveStop(pos, id, time){
  }
}