import { random_color } from "./colors.mjs";
import { paint_circle } from "./painter.mjs";
import { clamp_circle, get_circle, get_circle_by_coord, move_circle } from "./circle_manager.mjs";
import { tap } from "./audio.mjs";

// disable default gestures for touch screens
document.addEventListener('touchstart', function (event) {
  event.preventDefault();
}, { passive: false });

let circle_touches = {}

export function setup_gestures(canvas, circle) {
  canvas.addEventListener("touchstart", on_touch_start(canvas.getContext("2d")));
  canvas.addEventListener("touchend", on_touch_end());
  // el.addEventListener("touchcancel", handleCancel);
  canvas.addEventListener("touchmove", on_touch_move(canvas.getContext("2d")));
}

function on_touch_move(ctx) {
  return (event) => {
    // console.log("touch move", event)
    const touches = event.changedTouches
    for (let i = 0; i < touches.length; i++) {
      const touch = event.changedTouches.item(i)
      // console.log("circle_touch & touch", circle_touches, touch)
      const circle_touch = circle_touches[touch.identifier]
      if (circle_touch) {
        const x = touch.clientX + circle_touch.offset.x
        const y = touch.clientY + circle_touch.offset.y
        move_circle(circle_touch.circle, x, y)
        const circle = get_circle(circle_touch.circle)
        clamp_circle(circle, ctx.canvas.width, ctx.canvas.height)
        paint_circle(circle, ctx)
      }
    }
  }
}

function on_touch_end() {
  return (event) => {
    // console.log("touch end", event)
    const touches = event.changedTouches
    for (let i = 0; i < touches.length; i++) {
      const touch = event.changedTouches.item(i)
      circle_touches[touch.identifier] = null
    }
  }
}

// connect circles with touches.
function on_touch_start(ctx) {
  return (event) => {
    // console.log("touch start", event)
    const touches = event.changedTouches
    for (let i = 0; i < touches.length; i++) {
      const touch = event.changedTouches.item(i)
      const x = touch.clientX
      const y = touch.clientY
      const circle = get_circle_by_coord(x, y)
      if (circle != null) {
        tap()
        // console.log("circle_id", circle.id)
        const touch_id = touch.identifier
        if (circle_touches[touch_id]) {
          console.log("touch already connected to a circle, but overriding it.")
        }
        const x_offset = circle.x - x;
        const y_offset = circle.y - y;
        circle_touches[touch_id] = { offset: { x: x_offset, y: y_offset }, circle: circle.id }
        // console.log("setting circle touch", circle_touches[touch_id])

        ctx.fillStyle = random_color();
        paint_circle(circle, ctx)
      }
    }
  }
}