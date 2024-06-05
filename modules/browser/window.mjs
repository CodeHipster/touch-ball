// Abstraction for the browser window object.
export class Windowz {
  constructor(htmlCanvas, audioContext) {
    this.htmlCanvas = htmlCanvas
    this.audioContext = audioContext
  }

  setup() {
    this.#disableGestures()
    this.#disableNavigation()
    this.#setupPermissions()
  }

  // Some features, like audio streaming and fullscreen are only allowed after the user interacts with the page.
  #setupPermissions(){
    const onFirstTouch = ()=>{
      console.log("Registered first touch")
      document.removeEventListener("touchend", onFirstTouch)
      // TODO: enable audio
      this.#fullScreen(this.htmlCanvas)
      this.#setupAudioApi()
    }
    document.addEventListener("touchend", onFirstTouch)
  }

  // TODO: is this required when we have a start scene?
  #setupAudioApi(){
    if (this.audioContext.state === "suspended") {
      this.audioContext.resume();
      console.log("resuming audio context")
    }else{
      console.log("audio was not suspended?")
    }
  }

  #fullScreen(canvas) {
    console.log("Going fullscreen")
    canvas.requestFullscreen()
    screen.orientation.lock("landscape")
  }

  // disable default gestures for touch screens
  #disableGestures(){
    document.addEventListener('touchstart', function (event) {
      event.preventDefault();
    }, { passive: false });
  }

  // Disable back button
  #disableNavigation() {
    history.pushState(null, null, document.URL)
    window.addEventListener('popstate', function () {
      history.pushState(null, null, document.URL)
    });
  }
}