export class Painter {

  constructor(htmlCanvas, backgroundCanvas) {
    this.context = htmlCanvas.getContext("2d")
    this.backgroundCanvas = backgroundCanvas
    this.backgroundContext = this.backgroundCanvas.getContext("2d")
  }

  paint(ball) {
    this.context.fillStyle = `rgb(${ball.color[0]},${ball.color[1]},${ball.color[2]})`;
    this.context.beginPath();
    this.context.arc(ball.pos.x, ball.pos.y, ball.radius, 0, 2 * Math.PI);
    this.context.fill();
    this.context.stroke();
  }

  // Spray on background
  spray(ball) {
    const sprayCount = 5 * ball.velocity
    
    this.backgroundContext.fillStyle = `rgb(${ball.color[0]},${ball.color[1]},${ball.color[2]})`;
    for (let i = 0; i < sprayCount; i++) {
      const randomPos = (Math.random() * ball.radius) / 3 + ball.radius / 2
      const randomAngle = Math.random() * 2 * Math.PI
      const offset = this.#rotate(randomPos, randomAngle)
      const x = ball.pos.x + offset[0]
      const y = ball.pos.y + offset[1]
      const radius = ball.radius / 10

      this.backgroundContext.beginPath();
      this.backgroundContext.arc(x, y, radius, 0, 2 * Math.PI);
      this.backgroundContext.fill();
    }

    // Draw a big ball in the center
    const randomPos = (Math.random() * ball.radius) / 3
    const randomAngle = Math.random() * 2 * Math.PI
    const offset = this.#rotate(randomPos, randomAngle)
    const x = ball.pos.x + offset[0]
    const y = ball.pos.y + offset[1]
    this.backgroundContext.beginPath();
    this.backgroundContext.arc(x, y, ball.radius / 3, 0, 2 * Math.PI);
    this.backgroundContext.fill();
  }

  // Paint the background on the canvas
  background(){
    this.context.drawImage(this.backgroundCanvas, 0, 0);
  }

  #rotate(x, angle) {
    const cos = Math.cos(angle)
    const sin = Math.sin(angle)
    const nx = (cos * x)
    const ny = -(sin * x)
    return [nx, ny];
  }
}