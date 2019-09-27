//Global fields
var stars = [];
var cx = 0;
var cy = 1;
var scale = 1;
var bkgColor = '#151D29';
var starColor = '#FFFFFF';
/**
 * By always scaling to the larger dimension, we get more perceived
 * variance since there, is usally a margin of stars off screen.
 * Also they both move at the larger dimensions speed, being faster,
 * as it covers more ground in the same timespan.
 *
 * @param {CanvasRenderingContext2D} ctx
 * @param {Number} time
 */
function onDraw(ctx, time) {
    ctx.fillStyle = bkgColor;
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.fillStyle = starColor;
    ctx.beginPath();
    for (var _i = 0, stars_1 = stars; _i < stars_1.length; _i++) {
        var star = stars_1[_i];
        var x = star.x * scale;
        var y = star.y * scale;
        ctx.moveTo(x, y);
        ctx.arc(x, y, 0.5 + (star.z / 0.2), 0, 2 * Math.PI);
        star.x = (star.x + (star.z * cx)) % 1;
        star.y = (star.y + (star.z * cy)) % 1;
        if (star.x < 0)
            star.x += 1;
        if (star.y < 0)
            star.y += 1;
    }
    ctx.fill();
    requestAnimationFrame(onDraw.bind(this, ctx));
}
/**
 * Here we simply calculate the angle between the center of the canvas,
 * and the new mouse position.
 * Note: Definitly could use performance optimizations as this
 * doesn't need to happen every mouse move event.
 * @param {CanvasRenderingContext2D} ctx
 * @param {Event} event
 */
function onMouseMove(ctx, event) {
    var theta = Math.atan2(-(ctx.canvas.height / 2) + event.clientY, -(ctx.canvas.width / 2) + event.clientX);
    cx = Math.cos(theta);
    cy = Math.sin(theta);
}
/**
 * Whenever the document resizes we need to rescale the resolution of
 * the canvas to match.
 * Note: Definitly could use performance optimizations as this
 * doesn't need to happen every resize event.
 * @param {CanvasRenderingContext2D} ctx
 * @param {Event} event
 */
function onResize(ctx, event) {
    ctx.canvas.width = ctx.canvas.clientWidth;
    ctx.canvas.height = ctx.canvas.clientHeight;
    scale = ctx.canvas.width > ctx.canvas.height ? ctx.canvas.width : ctx.canvas.height;
}
/**
 * This script simply binds to any canvas named parallax on the page.
 * Setup context, initialize all the stars, and bind to all the events
 * we need access to.
 */
function init() {
    var canvas = document.getElementById('parallax');
    var context = canvas.getContext('2d');
    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;
    scale = canvas.width > canvas.height ? canvas.width : canvas.height;
    var starCount = 350;
    for (var i = 0; i < starCount; i++) {
        stars[i] = {
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            z: (Math.random() * 0.002) + 0.0001
        };
    }
    document.addEventListener('mousemove', onMouseMove.bind(this, context));
    window.addEventListener('resize', onResize.bind(this, context));
    requestAnimationFrame(onDraw.bind(this, context));
}
init();
//# sourceMappingURL=parallax.js.map