import { Xy } from "../core/common/location.mjs"

export class Canvas {

  touches = []

  constructor(htmlCanvas) {
    console.info("Initialize Canvas")
    this.htmlCanvas = htmlCanvas
    this.twoDContext = htmlCanvas.getContext("2d")
    this.bounds = new Xy(htmlCanvas.width, htmlCanvas.height)

    window.addEventListener("resize", () => this.#resize())
    window.addEventListener("load", () => this.#resize())
    this.#resize()
  }

  registerTouch(fn) {
    this.touches.push(fn)
    this.htmlCanvas.addEventListener("touchend", fn)
  }

  clearTouches(){
    this.touches.forEach(fn => {
      this.htmlCanvas.removeEventListener("touchend", fn)
    });
    this.touches = []
  }

  getCtx() {
    return this.twoDContext
  }

  getHtmlCanvas(){
    return this.htmlCanvas
  }

  getBounds(){
    return this.bounds
  }

  // Set the canvas to fullscreen
  #resize() {
    const width = window.innerWidth
    const height = window.innerHeight
    this.htmlCanvas.width = width
    this.htmlCanvas.height = height

    console.info(`resized to: ${width},${height}`)
    this.bounds.x = this.htmlCanvas.width
    this.bounds.y = this.htmlCanvas.height
  }

}