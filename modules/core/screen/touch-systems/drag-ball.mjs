export class DragBall{

  // references of balls being dragged.
  drags = []

  constructor(store, dragSound, painter){
    this.store = store
    this.dragSound = dragSound
    this.painter = painter
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

  // The last location of touchMove equals the location of touchEnd. Though the event time might differ.
  touchMove(pos, id, time){
    const drag = this.drags[id]
    if(!drag){
      return
    }

    // move ball
    const translation = pos.subNew(drag.pos)
    const ball = this.store.getBalls()[drag.ballId]
    ball.move(translation)

    // spray color on canvas
    this.painter.spray(ball)

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