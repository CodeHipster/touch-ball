export class PaintBackground {

  bitmap = null

  constructor(background, context) {
    this.background = background
    this.context = context
  }

  onTick() {
    const canvas = this.background.getCanvas()
    this.context.drawImage(canvas, 0, 0);
  }
}