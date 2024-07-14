export class BallList extends Array {
  find(pos) {
    for (let i = 0; i < this.length; i++) {
      const b = this[i]
      if (this.#hit(b, pos)) {
        return b
      }
    }
    return null
  }

  #hit(ball, pos) {
    return ball.radius >= Math.sqrt(
      Math.pow(pos.x - ball.pos.x, 2) +
      Math.pow(pos.y - ball.pos.y, 2)
    )
  }
}