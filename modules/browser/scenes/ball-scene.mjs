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
import { Background } from "../background.mjs";
import { PaintBackground } from "../../core/screen/tick-systems/paint-background.mjs";
import { WipeCanvas } from "../../core/screen/tick-systems/wipe-canvas.mjs";

export class BallScene {
  constructor(audioContext, htmlCanvas) {

    this.canvas = htmlCanvas
    this.store = new Store()
    this.looper = new Looper();

    const tapSound = new TapSound(audioContext)
    const dragSound = new DragSound(audioContext)
    const canvaz = new Canvas(htmlCanvas)
    const background = new Background(htmlCanvas)
    const painter = new Painter(canvaz.getCtx(), background.getCtx())

    const gestures = new GestureController()
    gestures.addHandler(new TouchBall(this.store, tapSound))
    gestures.addHandler(new DragBall(this.store, dragSound, painter))
    mapTouches(htmlCanvas, gestures)

    const wipe = new WipeCanvas(painter)
    this.looper.addSystem(wipe)
    const paintBackground = new PaintBackground(background, canvaz.getCtx())
    this.looper.addSystem(paintBackground)
    const clamper = new ClampBalls(canvaz, this.store)
    this.looper.addSystem(clamper)
    const ballPainter = new PaintBalls(this.store, painter)
    this.looper.addSystem(ballPainter)
  }

  start() {
    console.log("Starting game.")

    const width = this.canvas.width
    const height = this.canvas.height

    const x = width / 2
    const y = height / 2

    const radius = Math.min(width, height) / 7

    this.store.addBall(new Ball(new Xy(x, y), radius))
    this.looper.start();
  }

  stop() {
    throw Error("TODO: implement")
  }
}