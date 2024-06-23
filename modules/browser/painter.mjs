export class Painter {
  context
  backgroundContext
  // canvas == 2d context of html canvas
  constructor(context, backgroundContext) {
    this.context = context
    this.backgroundContext = backgroundContext
  }

  wipe(){
    this.context.clearRect(0, 0, canvas.width, canvas.height);
  }

  paint(ball){
    this.context.fillStyle = `rgb(${ball.color[0]},${ball.color[1]},${ball.color[2]})`;
    this.context.beginPath();
    this.context.arc(ball.pos.x, ball.pos.y, ball.radius, 0, 2 * Math.PI);
    this.context.fill();
    this.context.stroke();
  }

  spray(ball){
    // If needed this can be optimized by manipulating the pixel buffer
    const sprayCount = 5

    for (let i = 0; i < sprayCount; i++) {
      const randomPos = Math.random() * ball.radius
      const randomAngle = Math.random() * 2 * Math.PI
      const offset = this.#rotate(randomPos, randomAngle)
      const x = ball.pos.x + offset[0]
      const y = ball.pos.y + offset[1]
      const radius = ball.radius / 10

      console.log(this.backgroundContext)
      
      this.backgroundContext.fillStyle = `rgb(${ball.color[0]},${ball.color[1]},${ball.color[2]})`;
      this.backgroundContext.beginPath();
      this.backgroundContext.arc(x, y, radius, 0, 2 * Math.PI);
      this.backgroundContext.fill();
    }
  }

  #rotate(x, angle) {
        const cos = Math.cos(angle)
        const sin = Math.sin(angle)
        const nx = (cos * x)
        const ny = -(sin * x)
    return [nx, ny];
}
}