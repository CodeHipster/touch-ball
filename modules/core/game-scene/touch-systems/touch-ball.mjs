export class TouchBall{
  constructor(store, tapSound){
    this.store = store
    this.tapSound = tapSound
  }

  touchStart(pos, id, time){
    const balls = this.store.getBalls()
    const ball = balls.find(pos)
    if (ball){
      this.tapSound.play()
    }
  }

  touchEnd(pos, id, time){
    const balls = this.store.getBalls()
    const ball = balls.find(pos)
    if (ball){
      ball.randomizeColor()
    }
  }

  touchMove(pos, id, time){
  }

  moveStop(pos, id, time){
  }
}