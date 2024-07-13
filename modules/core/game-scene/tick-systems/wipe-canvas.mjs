export class WipeCanvas{
  constructor(painter){
    this.painter = painter
  }

  onTick(){
    this.painter.wipe()
  }
}