export class ClampBalls{
  constructor(canvas, store){
    this.store = store
    this.canvas = canvas
  }

  onTick(){
    const balls = this.store.getBalls()
    const bounds = this.canvas.getBounds()
    balls.forEach(ball => {
      this.#clamp_ball(ball, bounds)
    });
  }

  #clamp_ball(ball, bounds){
    ball.pos.x = Math.max(0, Math.min(ball.pos.x, bounds.x));
    ball.pos.y = Math.max(0, Math.min(ball.pos.y, bounds.y));
  }
}