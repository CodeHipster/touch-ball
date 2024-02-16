import { clamp_circles } from "./circle_manager.mjs";
import { for_each } from "./circle_manager.mjs";
import { paint_circle } from "./painter.mjs";

// screen.orientation.lock("landscape") // doesn't seem to work...
const canvas = document.getElementById("canvas")
const ctx = canvas.getContext("2d")

const listeners = [];

listeners.push(resize_canvas)

export function setup_canvas() {
  window.addEventListener("resize", resize)
  resize()
  return canvas
}

function resize() {
  const width = window.innerWidth
  const height = window.innerHeight
  listeners.forEach(listener => {
    listener(width, height)
  })
}

function resize_canvas(width, height) {
  console.log("resizing")

  ctx.canvas.width = width
  ctx.canvas.height = height

  clamp_circles(width, height)
  for_each((circle)=>{
    paint_circle(circle)
  })
};

export function add_listener(listener) {
  listeners.push(listener)
}

export function get_ctx(){
  return ctx
}