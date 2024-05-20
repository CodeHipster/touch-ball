import { setup_canvas } from "./modules/canvas.mjs";
import { new_circle } from "./modules/circle.mjs";
import { setup_gestures } from "./modules/gestures.mjs";
import { add_circle } from "./modules/circle_manager.mjs";
import { paint_circle } from "./modules/painter.mjs";
import { getController } from "./modules/core/screen/gestures.mjs";
import { setup } from "./modules/browser/setup.mjs";
import { Renderer } from "./modules/core/renderer.mjs";
import { Store } from "./modules/core/store.mjs";
import { Painter } from "./modules/browser/painter.mjs";
import { Ball } from "./modules/core/ball.mjs";
import { Xy } from "./modules/core/screen/location.mjs";
import { Canvaz } from "./modules/browser/canvas.mjs";

const gestureController = getController()
const canvas2 = document.getElementById("canvas")

setup(canvas2, gestureController)

const store = new Store()
const canvaz = new Canvaz("canvas", store);
const painter = new Painter(canvaz.getCtx())

const renderer = new Renderer(store, painter)
renderer.startRendering();

store.addBall(new Ball(new Xy(40, 40), 10))
