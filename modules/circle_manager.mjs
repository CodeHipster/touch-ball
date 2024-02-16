import { inside_circle } from "./circle.mjs";

let circles = []

export function move_circle(id, x, y){
  if ( id >= circles.length){
    console.log("trying to move circle that does not exist.")
    return
  }
  let circle = circles[id];
  circle.x = x
  circle.y = y
}

export function clamp_circles(width, height){
  circles.forEach(circle=>{
    clamp_circle(circle, width, height)
  })
}

export function clamp_circle(circle, width, height){
  circle.x = Math.max(0, Math.min(circle.x, width));
  circle.y = Math.max(0, Math.min(circle.y, height));
}

export function add_circle(circle){
  circle.id = circles.length
  circles.push(circle)
}

export function get_circle_by_coord(x, y){
  for (let i = 0; i < circles.length; i++) {
    const circle = circles[i]
    if(inside_circle(circle, x, y)){
      return circle;
    }
  }
  return null
}

export function get_circle(id){
  return circles[id]
}

export function for_each(fn){
  circles.forEach(fn)
}