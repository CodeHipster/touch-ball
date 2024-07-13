export class PaintBalls {
  store
  constructor(store, painter) {
    this.store = store
    this.painter = painter
  }

  onTick() {
    // console.log("paint balls")
    this.store.getBalls().forEach(ball => {
      this.painter.paint(ball)
    });
  }
}