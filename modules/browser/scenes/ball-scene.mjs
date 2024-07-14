import { PaintBalls } from "../../core/game-scene/tick-systems/paint-balls.mjs";
import { Store } from "../../core/game-scene/store.mjs";
import { Ball } from "../../core/game-scene/ball.mjs";
import { Xy } from "../../core/common/location.mjs";
import { mapTouches } from "../../browser/touch.mjs";
import { GestureController } from "../../core/common/gestures.mjs";
import { TouchBall } from "../../core/game-scene/touch-systems/touch-ball.mjs";
import { DragBall } from "../../core/game-scene/touch-systems/drag-ball.mjs";
import { Looper } from "../../core/common/looper.mjs";
import { ClampBalls } from "../../core/game-scene/tick-systems/clamp-balls.mjs";
import { PaintBackground } from "../../core/game-scene/tick-systems/paint-background.mjs";

export class BallScene {
  constructor(platform, htmlCanvas) {

    const scheduler = platform.scheduler()
    this.canvas = htmlCanvas
    this.store = new Store()
    this.looper = new Looper(scheduler);

    const tapSound = platform.tapSound()
    const dragSound = platform.dragSound()
    this.canvaz = platform.canvas()
    const painter = platform.gameScenePainter()

    const gestures = new GestureController()
    gestures.addHandler(new TouchBall(this.store, tapSound))
    gestures.addHandler(new DragBall(this.store, dragSound, painter))
    mapTouches(htmlCanvas, gestures)

    const paintBackground = new PaintBackground(painter)
    this.looper.addSystem(paintBackground)
    const clamper = new ClampBalls(this.canvaz, this.store)
    this.looper.addSystem(clamper)
    const ballPainter = new PaintBalls(this.store, painter)
    this.looper.addSystem(ballPainter)
  }

  start() {
    console.log("Starting game.")

    const bounds = this.canvaz.getBounds()

    const x = bounds.x / 2
    const y = bounds.y / 2

    const radius = Math.min(bounds.x, bounds.y) / 7

    this.store.addBall(new Ball(new Xy(x, y), radius))
    this.looper.start();
  }

  stop() {
    throw Error("Not implemented yet.")
  }
}