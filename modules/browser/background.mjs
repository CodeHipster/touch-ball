export class Background {

  shadowCanvas

  constructor(htmlCanvas) {
    this.htmlCanvas = htmlCanvas
    this.shadowCanvas = htmlCanvas.cloneNode()

    console.log("boop")
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
    console.log("beep")
    const width = window.innerWidth
    const height = window.innerHeight
    this.shadowCanvas.width = width
    this.shadowCanvas.height = height
    const ctx = this.shadowCanvas.getContext("2d")
    ctx.fillStyle = `rgb(247,236,210)`
    ctx.fillRect(0, 0, this.shadowCanvas.width, this.shadowCanvas.height)
  }
}