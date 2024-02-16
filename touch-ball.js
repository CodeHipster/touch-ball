import { setup_canvas } from "./modules/canvas.mjs";
import { new_circle } from "./modules/circle.mjs";
import { setup_gestures } from "./modules/gestures.mjs";
import { add_circle } from "./modules/circle_manager.mjs";
import { paint_circle } from "./modules/painter.mjs";

console.log("test")

// Disable back button
history.pushState(null, null, document.URL);
window.addEventListener('popstate', function () {
    history.pushState(null, null, document.URL);
});

const canvas = setup_canvas();

const circle = new_circle(
  canvas.width / 2, canvas.height / 2,
  Math.min(canvas.width, canvas.height) / 4)

add_circle(circle)

setup_gestures(canvas)

const ctx = canvas.getContext("2d");
ctx.fillStyle = "white";
paint_circle(circle, ctx)

