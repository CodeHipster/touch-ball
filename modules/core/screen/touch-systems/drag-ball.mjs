export class DragBall{

  // references of balls being dragged.
  drags = []

  constructor(store, dragSound){
    this.store = store
    this.dragSound = dragSound
  }

  touchStart(pos, id, time){
    const ball = this.store.getBalls().find(pos)
    if (ball){
      const soundId = this.dragSound.play(0)
      this.drags[id] = {
        ballId: ball.id,
        pos: pos,
        time: time,
        soundId: soundId
      }
    }
  }

  touchEnd(pos, id, time){    
    const drag = this.drags[id]
    if(!drag){
      console.log(`No ball to stop dragging: ${id}`)
      return
    }
    console.log(`drags: ${this.drags}`, this.drags)
    this.dragSound.stop(this.drags[id].soundId)
    this.drags[id] = undefined
  }

  touchMove(pos, id, time){
    const drag = this.drags[id]
    if(!drag){
      console.log(`No ball to move for touch id: ${id}`)
      return
    }

    const translation = pos.subNew(drag.pos)
    const duration = time - drag.time
    let velocity = translation.length()/duration
    console.log(`velocity: ${velocity}`)
    // clamp velocity to 200
    velocity = Math.max(0, Math.min(velocity, 200));
    // then scale down to 0-1
    velocity /= 200
    this.dragSound.setVelocity(drag.soundId, velocity)
    
    drag.pos = pos
    drag.time = time
    this.store.getBalls()[drag.ballId].move(translation)
  }

  moveStop(pos, id, time){
    console.log("move stop")
  }
}