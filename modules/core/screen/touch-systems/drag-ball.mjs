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
      return
    }
    this.dragSound.stop(this.drags[id].soundId)
    this.drags[id] = undefined
  }

  touchMove(pos, id, time){
    const drag = this.drags[id]
    if(!drag){
      return
    }

    // move ball
    const translation = pos.subNew(drag.pos)
    this.store.getBalls()[drag.ballId].move(translation)

    // play sound
    const duration = time - drag.time
    let velocity = translation.length()/duration
    // clamp velocity to 7, (max pixels/time one can reasonably reach)
    velocity = Math.max(0, Math.min(velocity, 7));
    // then scale down to 0-1, to match input for dragSound
    velocity /= 7
    this.dragSound.setVelocity(drag.soundId, velocity)
    
    // update previous values
    drag.pos = pos
    drag.time = time
  }

  moveStop(pos, id, time){
  }
}