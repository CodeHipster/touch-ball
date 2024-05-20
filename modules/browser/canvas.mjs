export class Canvaz {

  constructor(elementName, store) {
    this.context = document.getElementById(elementName).getContext("2d")
    this.store = store

    window.addEventListener("resize", () => this.#resize())
  }

  getCtx() {
    return this.context
  }

  // Set the canvas to fullscreen
  #resize() {
    const width = window.innerWidth
    const height = window.innerHeight
    console.log("resizing")
    this.context.width = width
    this.context.height = height

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