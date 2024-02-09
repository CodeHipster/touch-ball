import { inside_circle } from "./circle.mjs";

let circles = []

export function move_circle(id, x, y){
  if ( id >= circles.length){
    console.log("trying to move circle that does not exist.")
    return
  }
  let circle = circles[id];
  circle.x += x
  circle.y += y
}

export function add_circle(circle){
  circles.push(circle)
}

export function get_circle_id(x, y){
  for (let i = 0; i < circles.length; i++) {
    const circle = circles[i]
    if(inside_circle(circle, x, y)){
      return i;
    }
  }
  return null
}

export function get_circle(id){
  return circles[id]
}