import { new_circle, draw_circle } from "./modules/circle.mjs";
import { setup_canvas } from "./modules/canvas.mjs";
import { setup_gestures } from "./modules/gestures.mjs";

console.log("test")

const canvas = setup_canvas();

const circle = new_circle(
  canvas.width / 2, canvas.height / 2,
  Math.min(canvas.width, canvas.height) / 4)

setup_gestures(canvas, circle)

const ctx = canvas.getContext("2d");
ctx.fillStyle = "white";
draw_circle(circle, ctx)

