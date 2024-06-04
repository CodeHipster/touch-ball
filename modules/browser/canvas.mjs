export class Canvas {

  constructor(htmlCanvas, store) {
    this.htmlCanvas = htmlCanvas
    this.twoDContext = this.htmlCanvas.getContext("2d")
    this.store = store

    window.addEventListener("resize", () => this.#resize())
    window.addEventListener("load", () => this.#resize())
  }

  getCtx() {
    return this.twoDContext
  }

  getHtmlCanvas(){
    return this.htmlCanvas
  }

  // Set the canvas to fullscreen
  #resize() {
    const width = window.innerWidth
    const height = window.innerHeight
    this.htmlCanvas.width = width
    this.htmlCanvas.height = height

    this.#clamp_balls(width, height)
  }

  #clamp_balls(width, height) {
    this.store.getBalls().forEach(circle => {
      this.#clamp_ball(circle, width, height)
    })
  }

  #clamp_ball(ball, width, height) {
    ball.pos.x = Math.max(0, Math.min(ball.pos.x, width));
    ball.pos.y = Math.max(0, Math.min(ball.pos.y, height));
  }
}