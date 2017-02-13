var canvas;
var ctx;
var dx = 5;
var dy = 5;
var x = 150;
var y = 100;
var WIDTH = 300;
var HEIGHT = 200;
var interval = 10;

function circle(x,y,r) {
ctx.beginPath();
ctx.arc(x, y, r, 0, Math.PI*2, true);
ctx.fill();
}

function rect(x,y,w,h) {
ctx.beginPath();
ctx.rect(x,y,w,h);
ctx.closePath();
ctx.fill();
ctx.stroke();
}

function clear() {
ctx.clearRect(0, 0, WIDTH, HEIGHT);
}

function init() {
canvas = document.getElementById("canvas_set");
ctx = canvas.getContext("2d");
return setInterval(draw, interval);
}

function doKeyDown(evt){
	switch (evt.keyCode) {
		case 38:  /* Up arrow was pressed */
			if (y - dy > 0){
			y -= dy;
			}
			break;
		case 40:  /* Down arrow was pressed */
			if (y + dy < HEIGHT){
			y += dy;
			}
			break;
		case 37:  /* Left arrow was pressed */
			if (x - dx > 0){
			x -= dx;
			}
			break;
		case 39:  /* Right arrow was pressed */
			if (x + dx < WIDTH){
			x += dx;
			}
			break;
	}
}

function draw() {
clear();
ctx.fillStyle = "white";
ctx.strokeStyle = "black";
//rect(0,0,WIDTH,HEIGHT);
ctx.fillStyle = "purple";
circle(x, y, 10);
circle(x-20, y-20, 10);
}

init();
window.addEventListener('keydown',doKeyDown,true);