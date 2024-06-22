export class Background {

  constructor(htmlCanvas) {
    this.htmlCanvas = htmlCanvas
    this.context = htmlCanvas.getContext("2d")
    window.addEventListener("resize", () => this.#resize())

    this.#resize()
  }

  getImage(){
    return this.image
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