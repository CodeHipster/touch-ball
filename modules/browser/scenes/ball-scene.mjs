import { PaintBalls } from "../../core/screen/tick-systems/paint-balls.mjs";
import { Store } from "../../core/store.mjs";
import { Painter } from "../../browser/painter.mjs";
import { Ball } from "../../core/ball.mjs";
import { Xy } from "../../core/screen/location.mjs";
import { Canvas } from "../../browser/canvas.mjs";
import { mapTouches } from "../../browser/touch.mjs";
import { GestureController } from "../../core/screen/gestures.mjs";
import { TouchBall } from "../../core/screen/touch-systems/touch-ball.mjs";
import { DragBall } from "../../core/screen/touch-systems/drag-ball.mjs";
import { Looper } from "../../core/looper.mjs";
import { ClampBalls } from "../../core/screen/tick-systems/clamp-balls.mjs";
import { TapSound } from "../../browser/sound/tap.mjs";
import { DragSound } from "../../browser/sound/drag.mjs";

export class BallScene {
  constructor(audioContext, htmlCanvas) {

    this.store = new Store()
    this.looper = new Looper();

    const tapSound = new TapSound(audioContext)
    const dragSound = new DragSound(audioContext)
    const canvaz = new Canvas(htmlCanvas)
    const painter = new Painter(canvaz.getCtx())

    const gestures = new GestureController()
    gestures.addHandler(new TouchBall(this.store, tapSound))
    gestures.addHandler(new DragBall(this.store, dragSound))
    mapTouches(htmlCanvas, gestures)

    const clamper = new ClampBalls(canvaz, this.store)
    this.looper.addSystem(clamper)
    const ballPainter = new PaintBalls(this.store, painter)
    this.looper.addSystem(ballPainter)
  }

  start() {
    console.log("Starting game.")
    
    // place ball and start rendering
    this.store.addBall(new Ball(new Xy(80, 80), 40))
    this.looper.start();
  }

  stop() {
    throw Error("TODO: implement")
  }
}