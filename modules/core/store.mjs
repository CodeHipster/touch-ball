export class Store {

  balls
  constructor() {
    this.balls = []
  }

  addBall(ball){
    const id = this.balls.length
    this.balls.push(ball)
    return id;
  }

  getBalls(){
    return this.balls
  }

}