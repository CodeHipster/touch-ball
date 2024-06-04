import { BallList } from "./ball-list.mjs";

export class Store {

  balls
  constructor() {
    this.balls = new BallList()
  }

  addBall(ball){
    const id = this.balls.length
    ball.id = id
    this.balls.push(ball)
    return id;
  }

  getBalls(){
    return this.balls
  }

}