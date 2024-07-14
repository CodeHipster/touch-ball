export class PaintBackground {

  constructor(painter) {
    this.painter = painter
  }

  onTick() {
    this.painter.background()
  }
}