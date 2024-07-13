export class Xy {
  constructor(x, y) {
    this.x = x, this.y = y
  }

  add(pos) {
    this.x += pos.x
    this.y += pos.y
  }

  sub(pos) {
    this.x -= pos.x
    this.y -= pos.y
  }

  subNew(pos) {
    return new Xy(this.x - pos.x, this.y - pos.y)
  }

  length() {
    return Math.sqrt(this.x * this.x + this.y * this.y)
  }
}