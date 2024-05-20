import { setup_canvas } from "./modules/canvas.mjs";
import { new_circle } from "./modules/circle.mjs";
import { setup_gestures } from "./modules/gestures.mjs";
import { add_circle } from "./modules/circle_manager.mjs";
import { paint_circle } from "./modules/painter.mjs";


import { getController } from "./modules/core/screen/gestures.mjs";
import { getCanvas } from "./modules/browser/canvas.mjs";
import { setup } from "./modules/browser/setup.mjs";
import { Renderer } from "./modules/core/renderer.mjs";
import { Store } from "./modules/core/store.mjs";
import { Painter } from "./modules/browser/painter.mjs";
import { Ball } from "./modules/core/ball.mjs";
import { Xy } from "./modules/core/screen/location.mjs";

const gestureController = getController()
const canvas2 = getCanvas()

setup(canvas2, gestureController)

const canvas = setup_canvas();

const circle = new_circle(
  canvas.width / 2, canvas.height / 2,
  Math.min(canvas.width, canvas.height) / 4)

add_circle(circle)

setup_gestures(canvas)

const ctx = canvas.getContext("2d");
ctx.fillStyle = "white";
paint_circle(circle, ctx)

const store = new Store()
const painter = new Painter(ctx)

const renderer = new Renderer(store, painter)
renderer.startRendering();

store.addBall(new Ball(new Xy(40, 40), 10))
