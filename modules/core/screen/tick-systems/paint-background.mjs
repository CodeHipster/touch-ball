export class PaintBackground {
  constructor(background, context) {
    this.background = background
    this.context = context
  }

  onTick() {
    // console.log("background")
    // This causes flickering, perhaps try an extra canvas? https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Optimizing_canvas
    this.context.putImageData(this.background.image, 0, 0)
  }
}