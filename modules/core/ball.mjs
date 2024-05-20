import { random_color } from "../colors.mjs";

export class Ball{
  constructor(pos, radius){
    this.pos = pos
    this.radius = radius
    this.color = random_color();
  }
}