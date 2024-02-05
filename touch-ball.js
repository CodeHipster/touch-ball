console.log("test")

canvas = document.getElementById("canvas");

const ctx = canvas.getContext("2d");

circle = {
    x: ctx.canvas.width / 2, 
    y: ctx.canvas.height /2, 
    radius: Math.min(ctx.canvas.width, ctx.canvas.height) /4
}

onresize = (event) => {
    console.log("resizing")

    ctx.canvas.width = window.innerWidth;
    ctx.canvas.height = window.innerHeight;
        
    circle = {
        x: ctx.canvas.width / 2, 
        y: ctx.canvas.height /2, 
        radius: Math.min(ctx.canvas.width, ctx.canvas.height) /4
    }

    ctx.beginPath();
    ctx.arc(circle.x, circle.y, circle.radius, 0, 2 * Math.PI);
    ctx.stroke();
};
onresize()


colors = [
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

color_index = 0
random_color = ()=>{
    new_color = 0
    do {
        new_color = Math.floor(Math.random() * colors.length);
    } while (new_color == color_index)
    color_index = new_color
    return colors[color_index]
}

function inside(circle, x2, y2){
    return circle.radius >= Math.sqrt(Math.pow(x2 - circle.x,2) + Math.pow(y2 - circle.y,2))
}

touch = (event) =>{
    console.log("touch", event)
    // if inside the circle:
    x = event.changedTouches[0].clientX
    y = event.changedTouches[0].clientY
    if (inside(circle, x, y)){
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.beginPath();
        ctx.arc(circle.x, circle.y, circle.radius, 0, 2 * Math.PI);
        ctx.fillStyle = random_color();
        ctx.fill();
        ctx.stroke();
    }
};


function startup() {
    const el = document.getElementById("canvas");
    el.addEventListener("touchstart", touch);
    // el.addEventListener("touchend", handleEnd);
    // el.addEventListener("touchcancel", handleCancel);
    // el.addEventListener("touchmove", handleMove);
    }
    
document.addEventListener("DOMContentLoaded", startup);

// disable default gestures for touch screens
document.addEventListener('touchstart', function(event){
    event.preventDefault();
}, {passive: false});