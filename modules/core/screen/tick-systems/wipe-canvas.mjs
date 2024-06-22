export class WipeCanvas{
  constructor(painter){
    this.painter = painter
  }

  onTick(){
    // console.log("wipe")
    this.painter.wipe()
  }
}