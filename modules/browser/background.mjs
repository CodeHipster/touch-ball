export class Background {

  constructor(htmlCanvas) {
    this.htmlCanvas = htmlCanvas
    this.shadowCanvas = htmlCanvas.cloneNode()

    window.addEventListener("resize", () => this.#resize())
    this.#resize()
  }

  getCanvas() {
    return this.shadowCanvas
  }

  #resize() {
    const width = window.innerWidth
    const height = window.innerHeight
    this.shadowCanvas.width = width
    this.shadowCanvas.height = height
    const ctx = this.shadowCanvas.getContext("2d")
    ctx.fillStyle = `rgb(247,236,210)`
    ctx.fillRect(0, 0, this.shadowCanvas.width, this.shadowCanvas.height)
  }
}