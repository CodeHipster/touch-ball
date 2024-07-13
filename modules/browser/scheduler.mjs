// Platform specific implementation for scheduling a function to run at the earliest convenience, around 60fps
export default class Scheduler{
  schedule(fn){
    window.requestAnimationFrame(fn)
  }
}