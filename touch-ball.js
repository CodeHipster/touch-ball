import { Renderer } from "./modules/core/renderer.mjs";
import { Store } from "./modules/core/store.mjs";
import { Painter } from "./modules/browser/painter.mjs";
import { Ball } from "./modules/core/ball.mjs";
import { Xy } from "./modules/core/screen/location.mjs";
import { Canvas } from "./modules/browser/canvas.mjs";

const store = new Store()
const canvaz = new Canvas("canvas", store);
const painter = new Painter(canvaz.getCtx())

const renderer = new Renderer(store, painter)
renderer.startRendering();

store.addBall(new Ball(new Xy(40, 40), 10))
