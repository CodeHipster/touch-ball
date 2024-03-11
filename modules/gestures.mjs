import { random_color } from "./colors.mjs";
import { paint_circle } from "./painter.mjs";
import { clamp_circle, get_circle, get_circle_by_coord, move_circle } from "./circle_manager.mjs";
import { drag, tap } from "./audio.mjs";

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

// TODO: detect stopping moving...

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
        const circle = get_circle(circle_touch.circle)
        const prevX = circle.x
        const prevy = circle.y
        move_circle(circle_touch.circle, x, y)
        drag(circle_touch.circle, calculate_speed(prevX, x, prevy, y, circle_touch.time, event.timeStamp ))
        circle_touch.time = event.timeStamp
        clamp_circle(circle, ctx.canvas.width, ctx.canvas.height)
        paint_circle(circle, ctx)
      }
    }
  }
}

// speed in pixels? / ms
function calculate_speed(x1, y1, x2, y2, timestamp1, timestamp2){
  // console.log(`x1:${x1},x2:${x2},y1:${y1},y2:${y2},t1:${timestamp1},t2:${timestamp2}`)
  const xDiff = x2-x1
  const yDiff = y2-y1
  const dist = Math.sqrt(xDiff*xDiff + yDiff*yDiff)
  return dist / (timestamp2 - timestamp1)
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
        circle_touches[touch_id] = { offset: { x: x_offset, y: y_offset }, circle: circle.id, time:event.timeStamp }
        // console.log("setting circle touch", circle_touches[touch_id])

        ctx.fillStyle = random_color();
        paint_circle(circle, ctx)
      }
    }
  }
}