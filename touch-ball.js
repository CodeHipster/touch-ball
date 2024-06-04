import { Renderer } from "./modules/core/renderer.mjs";
import { Store } from "./modules/core/store.mjs";
import { Painter } from "./modules/browser/painter.mjs";
import { Ball } from "./modules/core/ball.mjs";
import { Xy } from "./modules/core/screen/location.mjs";
import { Canvas } from "./modules/browser/canvas.mjs";
import { mapTouches } from "./modules/browser/touch.mjs";
import { GestureController } from "./modules/core/screen/gestures.mjs";
import { PaintOnTouch } from "./modules/core/screen/gestures/paint-on-touch.mjs";

const store = new Store()
const canvaz = new Canvas("canvas", store);
const painter = new Painter(canvaz.getCtx())

const gestures = new GestureController()
gestures.addHandler(new PaintOnTouch(store))
const renderer = new Renderer(store, painter)
renderer.startRendering();

store.addBall(new Ball(new Xy(40, 40), 10))

mapTouches(canvaz, gestures)