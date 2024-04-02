
import { mapTouches } from "./touch.mjs";

export function setup(canvas, gestureController) {
  mapTouches(canvas, gestureController)
  disableNavigation()
  document.addEventListener("touchstart", mapFirstTouch(canvas))
}

// Disable back button
function disableNavigation() {
  history.pushState(null, null, document.URL)
  window.addEventListener('popstate', function () {
    history.pushState(null, null, document.URL)
  });
}

function mapFirstTouch(canvas) {
  return () => {
    console.log("Registered first touch")
    document.removeEventListener("touchend", mapFirstTouch)
    // adding a timeout to give the browser time to register the first touch and allow features.
    setTimeout(() => {
      fullScreen(canvas)
      audio()
    }, 200)
  }
}

function fullScreen(canvas) {
  console.log("Going fullscreen")
  canvas.requestFullscreen()
  screen.orientation.lock("landscape")
}

function audio(){
  console.log("Enabling audio")
  // TODO: implement
}