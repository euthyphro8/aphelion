

//Global fields
let stars = [];
let cx = 0;
let cy = 1;
let translateX = function(a, b) {return a + (b * cx);};
let translateY = function(a, b) {return a + (b * cy);};
let bkgColor = '#151D29';
let starColor = '#FFFFFF';

/**
 * 
 * @param {CanvasRenderingContext2D} ctx 
 * @param {Number} time 
 */
function onDraw(ctx, time) {

    ctx.fillStyle = bkgColor;
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    
    ctx.fillStyle = starColor;
    
    ctx.beginPath();
    for(let star of stars) {
        ctx.moveTo(star.x, star.y);
        ctx.arc(star.x * ctx.canvas.width, star.y * ctx.canvas.height, 0.5 + (star.z / 0.02), 0, 2 * Math.PI);
        star.x = translateX(star.x, star.z) % 1;
        star.y = translateY(star.y, star.z) % 1;
        if(star.x < 0) star.x += 1;
        if(star.y < 0) star.y += 1;
    }
    ctx.fill();
    requestAnimationFrame(onDraw.bind(this, ctx));
}

function onMouseMove(canvas, event) {
    let theta = Math.atan2(-(canvas.width / 2) + event.clientY, -(canvas.height / 2) + event.clientX);
    cx = Math.cos(theta);
    cy = Math.sin(theta);
}

function onResize(canvas, event) {
    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;
}

function init() {
    let canvas = document.getElementById('parallax');
    let context = canvas.getContext('2d');

    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;

    
    let starCount = 350;
    for(let i = 0; i < starCount; i++) {
        stars[i] = { 
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            z: (Math.random() * 0.002) + 0.0001 
        };
    }

    document.addEventListener('mousemove', onMouseMove.bind(this, canvas));
    window.addEventListener('resize', onResize.bind(this, canvas));

    requestAnimationFrame(onDraw.bind(this, context));
}

init();