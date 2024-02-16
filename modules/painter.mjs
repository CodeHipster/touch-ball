import { get_ctx } from "./canvas.mjs";

export function paint_circle(circle){
  const ctx = get_ctx()
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.beginPath();
  ctx.arc(circle.x, circle.y, circle.radius, 0, 2 * Math.PI);
  ctx.fill();
  ctx.stroke();
}