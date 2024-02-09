import { new_circle, draw_circle } from "./modules/circle.mjs";
import { setup_canvas } from "./modules/canvas.mjs";
import { setup_gestures } from "./modules/gestures.mjs";
import { add_circle } from "./modules/circle_manager.mjs";

console.log("test")

const canvas = setup_canvas();

const circle = new_circle(
  canvas.width / 2, canvas.height / 2,
  Math.min(canvas.width, canvas.height) / 4)

add_circle(circle)

setup_gestures(canvas)

const ctx = canvas.getContext("2d");
ctx.fillStyle = "white";
draw_circle(circle, ctx)

