export class DragBall{

  // references of balls being dragged.
  drags = []

  constructor(store){
    this.store = store
  }

  touchStart(pos, id, time){
    console.log("touch start")
    const ball = this.store.getBalls().find(pos)
    if (ball){
      this.drags[id] = {
        ballId: ball.id,
        pos: pos,
        time: time
      }
    }
  }

  // TODO: does touch end have different coordinates than last touchMove?
  touchEnd(pos, id, time){
    console.log("touch end", pos, id, time)
    this.drags[id] = undefined
  }

  touchMove(pos, id, time){
    console.log("touch move", pos, id, time)
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
}