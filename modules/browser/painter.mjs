export class Painter {
  context
  // canvas == 2d context of html canvas
  constructor(context, background) {
    this.context = context
    this.background = background
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
    const area = Math.PI * ball.radius * ball.radius
    const sprayCount = area * .3

    console.log(ball.radius)

    for (let i = 0; i < sprayCount; i++) {
      const xOff = Math.sin(Math.random() * 2 * Math.PI) * ball.radius
      const yOff = Math.sin(Math.random() * 2 * Math.PI) * ball.radius
      this.background.setPixel(ball.pos.x + xOff, ball.pos.y + yOff, ball.color);
    }
  }
}