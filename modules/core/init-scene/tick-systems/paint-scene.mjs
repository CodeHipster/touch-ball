export class InitScenePaintSystem {

  constructor(painter) {
    this.painter = painter
  }
  onTick() {
    this.painter.triangle()
  }
}