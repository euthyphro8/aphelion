// //Global fields
// let stars = [];
// let cx = 0;
// let cy = 1;
// let scale = 1;
// let bkgColor = '#151D29';
// let starColor = '#FFFFFF';
// /**
//  * By always scaling to the larger dimension, we get more perceived 
//  * variance since there, is usally a margin of stars off screen. 
//  * Also they both move at the larger dimensions speed, being faster,
//  * as it covers more ground in the same timespan.
//  * 
//  * @param {CanvasRenderingContext2D} ctx 
//  * @param {Number} time 
//  */
// function onDraw(ctx : CanvasRenderingContext2D, time : Number) {
//     ctx.fillStyle = bkgColor;
//     ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
//     ctx.fillStyle = starColor;
//     ctx.beginPath();
//     for(let star of stars) {
//         let x = star.x * scale;
//         let y = star.y * scale;
//         ctx.moveTo(x, y);
//         ctx.arc(x, y, 0.5 + (star.z / 0.2), 0, 2 * Math.PI);
//         star.x = (star.x + (star.z * cx)) % 1;
//         star.y = (star.y + (star.z * cy)) % 1;
//         if(star.x < 0) star.x += 1;
//         if(star.y < 0) star.y += 1;
//     }
//     ctx.fill();
//     requestAnimationFrame(onDraw.bind(this, ctx));
// }
// /**
//  * Here we simply calculate the angle between the center of the canvas, 
//  * and the new mouse position.
//  * Note: Definitly could use performance optimizations as this
//  * doesn't need to happen every mouse move event.
//  * @param {CanvasRenderingContext2D} ctx 
//  * @param {Event} event 
//  */
// function onMouseMove(ctx, event) {
//     let theta = Math.atan2(
//         -(ctx.canvas.height / 2) + event.clientY, 
//         -(ctx.canvas.width / 2) + event.clientX);
//     cx = Math.cos(theta);
//     cy = Math.sin(theta);
// }
// /**
//  * Whenever the document resizes we need to rescale the resolution of 
//  * the canvas to match. 
//  * Note: Definitly could use performance optimizations as this
//  * doesn't need to happen every resize event.
//  * @param {CanvasRenderingContext2D} ctx 
//  * @param {Event} event 
//  */
// function onResize(ctx, event) {
//     ctx.canvas.width = ctx.canvas.clientWidth;
//     ctx.canvas.height = ctx.canvas.clientHeight;
//     scale = ctx.canvas.width > ctx.canvas.height ? ctx.canvas.width : ctx.canvas.height;
// }
// /**
//  * This script simply binds to any canvas named parallax on the page.
//  * Setup context, initialize all the stars, and bind to all the events
//  * we need access to.
//  */
// function init() {
//     let canvas = document.getElementById('parallax');
//     let context = canvas.getContext('2d');
//     canvas.width = canvas.clientWidth;
//     canvas.height = canvas.clientHeight;
//     scale = canvas.width > canvas.height ? canvas.width : canvas.height;
//     let starCount = 350;
//     for(let i = 0; i < starCount; i++) {
//         stars[i] = { 
//             x: Math.random() * canvas.width,
//             y: Math.random() * canvas.height,
//             z: (Math.random() * 0.002) + 0.0001 
//         };
//     }
//     document.addEventListener('mousemove', onMouseMove.bind(this, context));
//     window.addEventListener('resize', onResize.bind(this, context));
//     requestAnimationFrame(onDraw.bind(this, context));
// }
// init();
//# sourceMappingURL=parallax.js.map