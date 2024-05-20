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
}