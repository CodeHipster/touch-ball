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

export function draw_circle(circle, ctx){
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.beginPath();
  ctx.arc(circle.x, circle.y, circle.radius, 0, 2 * Math.PI);
  ctx.fill();
  ctx.stroke();
}