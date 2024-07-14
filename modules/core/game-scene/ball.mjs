import { random_color } from "./colors.mjs";

export class Ball {
  constructor(pos, radius) {
    this.pos = pos
    this.velocity = 0
    this.radius = radius
    this.randomizeColor()
  }

  randomizeColor() {
    this.color = random_color()
  }

  move(pos) {
    this.pos.add(pos)
  }

  place(pos) {
    this.pos = pos
  }
}