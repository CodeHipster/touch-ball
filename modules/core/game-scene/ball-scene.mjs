import { PaintBalls } from "./tick-systems/paint-balls.mjs";
import { Store } from "./store.mjs";
import { Ball } from "./ball.mjs";
import { Xy } from "../common/location.mjs";
import { GestureController } from "../common/gestures.mjs";
import { TouchBall } from "./touch-systems/touch-ball.mjs";
import { DragBall } from "./touch-systems/drag-ball.mjs";
import { Looper } from "../common/looper.mjs";
import { ClampBalls } from "./tick-systems/clamp-balls.mjs";
import { PaintBackground } from "./tick-systems/paint-background.mjs";

export class BallScene {

  constructor(platform) {
    const scheduler = platform.scheduler()
    this.store = new Store()
    this.looper = new Looper(scheduler);

    const tapSound = platform.tapSound()
    const dragSound = platform.dragSound()
    this.canvas = platform.canvas()
    const painter = platform.gameScenePainter()

    const gestures = new GestureController()
    gestures.addHandler(new TouchBall(this.store, tapSound))
    gestures.addHandler(new DragBall(this.store, dragSound, painter))
    this.touches = platform.touches()

    this.#mapTouches(gestures, this.touches)

    const paintBackground = new PaintBackground(painter)
    this.looper.addSystem(paintBackground)
    const clamper = new ClampBalls(this.canvas, this.store)
    this.looper.addSystem(clamper)
    const ballPainter = new PaintBalls(this.store, painter)
    this.looper.addSystem(ballPainter)
  }

  #mapTouches(gesturesController, touches) {
    touches.registerTouchStart((pos, id, time) => gesturesController.touchStart(pos, id, time))
    touches.registerTouchEnd((pos, id, time) => gesturesController.touchEnd(pos, id, time))
    touches.registerTouchMove((pos, id, time) => gesturesController.touchMove(pos, id, time))
  }

  start() {
    console.log("Starting game.")

    const bounds = this.canvas.getBounds()

    const x = bounds.x / 2
    const y = bounds.y / 2

    const radius = Math.min(bounds.x, bounds.y) / 7

    this.store.addBall(new Ball(new Xy(x, y), radius))
    this.looper.start();
  }

  stop() {
    this.canvas.clearTouches()
    this.touches.clearListeners()
    this.looper.stop()
  }
}