import { random_color } from "./colors.mjs";
import { inside_circle, draw_circle } from "./circle.mjs";

// disable default gestures for touch screens
document.addEventListener('touchstart', function (event) {
  event.preventDefault();
}, { passive: false });

export function setup_gestures(canvas, circle) {
  canvas.addEventListener("touchstart", on_touch_start(canvas.getContext("2d"),circle));
  // el.addEventListener("touchend", handleEnd);
  // el.addEventListener("touchcancel", handleCancel);
  // el.addEventListener("touchmove", handleMove);
}

function on_touch_start(ctx, circle) {
  return (event)=>{
    console.log("touch", event)
    // if inside the circle:
    const x = event.changedTouches[0].clientX
    const y = event.changedTouches[0].clientY
    if (inside_circle(circle, x, y)) {
      ctx.fillStyle = random_color();
      draw_circle(circle, ctx)
    }
  }
}