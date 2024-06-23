export class Background {

  shadowCanvas

  constructor(htmlCanvas) {
    this.htmlCanvas = htmlCanvas
    this.shadowCanvas = htmlCanvas.cloneNode()

    window.addEventListener("resize", () => this.#resize())

    this.#resize()
  }

  getCtx(){
    return this.shadowCanvas.getContext("2d")
  }

  getCanvas() {
    return this.shadowCanvas
  }

  #resize() {
    this.shadowCanvas.width = this.htmlCanvas.width
    this.shadowCanvas.height = this.htmlCanvas.height
    const ctx = this.shadowCanvas.getContext("2d")
    ctx.fillStyle = `rgb(247,236,210)`
    ctx.fillRect(0, 0, this.shadowCanvas.width, this.shadowCanvas.height)
  }
}