export class DragBall{

  // references of balls being dragged.
  drags = []

  constructor(store){
    this.store = store
  }

  touchStart(pos, id, time){
    const ball = this.store.getBalls().find(pos)
    if (ball){
      this.drags[id] = {
        ballId: ball.id,
        pos: pos,
        time: time
      }
    }
  }

  touchEnd(pos, id, time){
    this.drags[id] = undefined
  }

  touchMove(pos, id, time){
    const drag = this.drags[id]
    if(!drag){
      console.log(`No ball to move for touch id: ${id}`)
      return
    }

    const translation = pos.subNew(drag.pos)
    drag.pos = pos
    drag.time = time
    this.store.getBalls()[drag.ballId].move(translation)
  }

  moveStop(pos, id, time){
    console.log("move stop")
  }
}