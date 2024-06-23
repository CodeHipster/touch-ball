export class Background {

  constructor(htmlCanvas) {
    this.htmlCanvas = htmlCanvas
    this.context = htmlCanvas.getContext("2d")
    window.addEventListener("resize", () => this.#resize())

    this.#resize()
  }

  getImage() {
    return this.image
  }

  setPixel(x, y, color) {
    const index = (this.image.width * Math.floor(y) + Math.floor(x)) * 4
    this.image.data[index] = color[0]
    this.image.data[index + 1] = color[1]
    this.image.data[index + 2] = color[2]

    console.log(this.image.data[index])
  }

  #resize() {
    const width = this.htmlCanvas.width
    const height = this.htmlCanvas.height
    this.image = this.context.createImageData(width, height);
    const data = this.image.data
    for (let i = 0; i < data.length; i += 4) {
      data[i] = 247; // red
      data[i + 1] = 236; // green
      data[i + 2] = 210; // blue
      data[i + 3] = 255; // alpha, fully opaque
    }
  }
}