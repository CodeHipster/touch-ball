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
  #setupPermissions() {
    const onFirstTouch = () => {
      console.log("Registered first touch")
      document.removeEventListener("touchend", onFirstTouch)
      this.#fullScreen(this.htmlCanvas)
      this.#setupAudioApi()
    }
    document.addEventListener("touchend", onFirstTouch)
  }

  #fullScreen(canvas) {
    console.log("Going fullscreen")
    canvas.requestFullscreen()
    screen.orientation.lock("landscape")
  }

  #setupAudioApi() {
    if (this.audioContext.state === "suspended") {
      this.audioContext.resume();
      console.log("resuming audio context")
    } else {
      console.log("audio was not suspended?")
    }
  }

  // disable default gestures for touch screens
  #disableGestures() {
    document.addEventListener('touchstart', function (event) {
      event.preventDefault();
    }, { passive: false });
  }

  // Disable back button
  #disableNavigation() {
    history.pushState(null, null, location.href);
    history.back();
    history.forward();
    window.onpopstate = function () { history.go(1); };
  }
}