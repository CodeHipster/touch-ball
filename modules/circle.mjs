export function new_circle(x, y, radius) {
  return {
    x: x,
    y: y,
    radius: radius
  }
}

export function inside_circle(circle, x2, y2){
  return circle.radius >= Math.sqrt(Math.pow(x2 - circle.x, 2) + Math.pow(y2 - circle.y, 2))
}


export class Circle{
  constructor(pos, radius){
    this.x = pos.x
    this.y = pos.y
    this.radius = radius
  }

  // gestures
  touched(pos){
    const x2 = Math.pow(pos.x - this.x, 2);
    const y2 = Math.pow(pos.y - this.y, 2);
    return this.radius >= Math.sqrt( x2+ y2)
  }

  touch(pos){
    console.log("touched: ", pos)
  }
  
  drag(trans){
    console.log("dragged: ", trans)
  }
}