export class InitScenePaintSystem {

  triangleRatio = 1.1547005383792515

  constructor(htmlCanvas) {
    this.canvas = htmlCanvas
    this.context = htmlCanvas.getContext("2d")
  }

  onTick() {
    // render play button
    const width = this.canvas.width
    const height = this.canvas.height

    var triangleHeight = height / 2
    var triangleWidth = triangleHeight / this.triangleRatio

    const maxWidth = triangleWidth * 3
    if (width < maxWidth) {
      // The screen is to small, scale height based on allowed width
      triangleWidth = width / 3
      triangleHeight = triangleWidth * this.triangleRatio
    }

    const center = {
      x: width / 2,
      y: height / 2
    }

    const vertexA = {
      x: center.x - triangleWidth / 2,
      y: center.y - triangleHeight / 2
    }

    const vertexB = {
      x: center.x + triangleWidth / 2,
      y: center.y
    }
    const vertexC = {
      x: center.x - triangleWidth / 2,
      y: center.y + triangleHeight / 2
    }

    // draw triangle
    this.context.beginPath();
    this.context.moveTo(vertexA.x, vertexA.y);
    this.context.lineTo(vertexB.x, vertexB.y);
    this.context.lineTo(vertexC.x, vertexC.y);
    this.context.closePath();

    // set colors
    this.context.lineWidth = 5;
    this.context.fillStyle = '#FF0000';
    this.context.fill();
    this.context.strokeStyle = 'black';
    this.context.stroke();
  }
}