import { random_color } from "../core/colors.mjs";

export class Painter {
  context
  // canvas == 2d context of html canvas
  constructor(context) {
    this.context = context
  }

  wipe(){
    this.context.clearRect(0, 0, canvas.width, canvas.height);
  }

  paint(ball){
    this.context.fillStyle = ball.color;
    this.context.beginPath();
    this.context.arc(ball.pos.x, ball.pos.y, ball.radius, 0, 2 * Math.PI);
    this.context.fill();
    this.context.stroke();
  }

  spray(ball){
    // If needed this can be optimized by manipulating the pixel buffer
    // https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Pixel_manipulation_with_canvas
    const area = Math.PI * ball.radius * ball.radius
    const sprayCount = area * .3

    this.context.fillStyle = ball.color;
    for (let i = 0; i < sprayCount; i++) {
      const xOff = Math.sin(Math.random() * 2 * Math.PI) * ball.radius
      const yOff = Math.sin(Math.random() * 2 * Math.PI) * ball.radius
      this.context.fillRect(ball.pos.x + xOff, ball.pos.y + yOff, 1, 1);
    }
  }
}