const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d"); 

export function setup_canvas() {
  window.addEventListener("resize", resize_canvas);
  resize_canvas()
  return canvas
}

function resize_canvas() {
  console.log("resizing")

  ctx.canvas.width = window.innerWidth;
  ctx.canvas.height = window.innerHeight;
};


