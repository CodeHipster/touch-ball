export class PaintBackground {
  
  bitmap = null
  
  constructor(background, context) {
    this.background = background
    this.context = context
  }

  onTick() {
    // context.putImageData has a bug in android where it creates artifacts when used with context.stroke()
    // this.context.putImageData(this.background.getImage(), 0,0)
    // Using an imageBitmap drawn a frame later as a work around.
    const image = this.background.getImage()
    createImageBitmap(image, 0, 0, image.width, image.height)
    .then((bitmap)=>{
      this.bitmap = bitmap
    })

    if(this.bitmap){
      this.context.drawImage(this.bitmap, 0, 0);
    }
  }
}