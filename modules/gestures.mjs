import { random_color } from "./colors.mjs";
import { inside_circle, draw_circle } from "./circle.mjs";
import { get_circle, get_circle_id, move_circle } from "./circle_manager.mjs";

// disable default gestures for touch screens
document.addEventListener('touchstart', function (event) {
  event.preventDefault();
}, { passive: false });

let circle_touch = null

export function setup_gestures(canvas, circle) {
  canvas.addEventListener("touchstart", on_touch_start(canvas.getContext("2d")));
  canvas.addEventListener("touchend", on_touch_end());
  // el.addEventListener("touchcancel", handleCancel);
  canvas.addEventListener("touchmove", on_touch_move(canvas.getContext("2d")));
}

function on_touch_move(ctx) {
  return (event) => {
    console.log("touch move", event)
    const touches = event.changedTouches
    for (let i = 0; i < touches.length; i++) {
      const touch = event.changedTouches.item(i)
      console.log("circle_touch & touch", circle_touch, touch)
      if (circle_touch && touch.identifier == circle_touch.touch_id) {
        const x = touch.clientX - circle_touch.x
        const y = touch.clientY - circle_touch.y
        circle_touch.x = touch.clientX
        circle_touch.y = touch.clientY
        move_circle(circle_touch.circle_id, x, y)

        const circle = get_circle(circle_touch.circle_id)
        draw_circle(circle, ctx)
      }
    }
  }
}

function on_touch_end() {
  return (event) => {
    console.log("touch end", event)
    const touches = event.changedTouches
    for (let i = 0; i < touches.length; i++) {
      const touch = event.changedTouches.item(i)
      if (touch.identifier == circle_touch) {
        circle_touch = null
      }
    }
  }
}

function on_touch_start(ctx) {
  return (event) => {
    console.log("touch start", event)
    // if inside the circle:
    const changedTouch = event.changedTouches[0]
    const x = changedTouch.clientX
    const y = changedTouch.clientY
    const touch_id = changedTouch.identifier
    const circle_id = get_circle_id(x, y)
    console.log("circle_id", circle_id)
    if (circle_id != null) {
      if (circle_touch == null) {
        circle_touch = { touch_id: touch_id, x: x, y: y, circle_id: circle_id }
        console.log("setting circle touch", circle_touch)
      }
      const circle = get_circle(circle_id)
      ctx.fillStyle = random_color();
      draw_circle(circle, ctx)
    }
  }
}