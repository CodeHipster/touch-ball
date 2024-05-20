export class Painter {
  canvas
  // canvas == 2d context of html canvas
  constructor(canvas) {
    this.canvas = canvas
  }

  wipe(){
    this.canvas.clearRect(0, 0, canvas.width, canvas.height);
  }

  paint(ball){
    this.canvas.beginPath();
    this.canvas.arc(ball.pos.x, ball.pos.y, ball.radius, 0, 2 * Math.PI);
    this.canvas.fill();
    this.canvas.stroke();
  }
}