export const colors = [
  "black",
  "maroon",
  "red",
  "purple",
  "fuchsia",
  "green",
  "lime",
  "olive",
  "yellow",
  "navy",
  "blue",
  "teal",
  "aqua",
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