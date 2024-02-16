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
