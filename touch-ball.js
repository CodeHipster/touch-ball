import { PaintBalls } from "./modules/core/screen/tick-systems/paint-balls.mjs";
import { Store } from "./modules/core/store.mjs";
import { Painter } from "./modules/browser/painter.mjs";
import { Ball } from "./modules/core/ball.mjs";
import { Xy } from "./modules/core/screen/location.mjs";
import { Canvas } from "./modules/browser/canvas.mjs";
import { mapTouches } from "./modules/browser/touch.mjs";
import { GestureController } from "./modules/core/screen/gestures.mjs";
import { TouchBall } from "./modules/core/screen/touch-systems/touch-ball.mjs";
import { DragBall } from "./modules/core/screen/touch-systems/drag-ball.mjs";
import { Windowz } from "./modules/browser/window.mjs";
import { Looper } from "./modules/core/looper.mjs";
import { ClampBalls } from "./modules/core/screen/tick-systems/clamp-balls.mjs";

const store = new Store()
const htmlCanvas = document.getElementById("canvas")
const window = new Windowz(htmlCanvas)
window.setup()
const canvaz = new Canvas(htmlCanvas, store)
const painter = new Painter(canvaz.getCtx())

const gestures = new GestureController()
gestures.addHandler(new TouchBall(store))
gestures.addHandler(new DragBall(store))
mapTouches(htmlCanvas, gestures)

const looper = new Looper();
const clamper = new ClampBalls(canvaz, store)
looper.addSystem(clamper)
const ballPainter = new PaintBalls(store, painter)
looper.addSystem(ballPainter)

looper.start();

store.addBall(new Ball(new Xy(80, 80), 40))
