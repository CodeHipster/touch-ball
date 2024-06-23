export const colors = [
  [0, 0, 0], //"black",
  [128, 0, 0], //"maroon",
  [255, 0, 0], //"red",
  [128, 0, 128], //"purple",
  [255, 0, 255], //"fuchsia",
  [0, 128, 0], //"green",
  [0, 255, 0], //"lime",
  [128, 128, 0], //"olive",
  [255, 255, 0], //"yellow",
  [0, 0, 128], //"navy",
  [0, 0, 255], //"blue",
  [0, 128, 128], //"teal",
  [0, 255, 255], //"aqua",
]

let color_index = 0
export function random_color() {
  let new_color = 0
  do {
    new_color = Math.floor(Math.random() * colors.length);
  } while (new_color == color_index)
  color_index = new_color
  return colors[color_index]
}

// Get css color from named color.
// const div = document.createElement("div")
// document.body.append(div)
// for (const c of colors){
//   div.style.backgroundColor = c
//   console.log(getComputedStyle(div).backgroundColor)
// }