var canvas = document.getElementById("canvas_set");;
var ctx = canvas.getContext('2d');;
var ChaseeCircle;
var ChaserCircle;


function clear() {
ctx.clearRect(0, 0, canvas.width, canvas.width);
}

function Circle(radius, speed, xPos, yPos, fillStyle) {
      this.radius = radius;
      this.speed = speed;
      this.xPos = xPos;
      this.yPos = yPos;
	  this.dx = 16;
	  this.dy = 16;
	  this.fillStyle = fillStyle;
      //this.opacity = 0.05 + Math.random() * 0.5;
      this.counter = 0; 
    }


function drawInitialSetup() {
	clear();
	ctx.fillStyle = "white";
	ctx.strokeStyle = "black";
	var x = 150;
	var y = 100;
	var speed = 5;
	var radius = 15;
	ChaseeCircle = new Circle(radius, 0, x, y, "purple"); // for chase we dont need to set the speed, because it moved with key strokes.
	ChaserCircle = new Circle(radius, speed, 0, 0, "orange"); // setting the chaser circle at one conrner, we can change dynamically.
	//setInterval(draw, 30, ctx, x, y);
	ChaseeCircle.update();
	ChaserCircle.update();
}

Circle.prototype.update = function() {
	ctx.beginPath();
	ctx.arc(this.xPos, this.yPos, this.radius, 0, Math.PI*2, false);
	ctx.fillStyle = this.fillStyle;
	ctx.fill();
}

var self = this;
function doKeyDown(evt){
	switch (evt.keyCode) {
		case 38:  /* Up arrow was pressed */
			if (ChaseeCircle.yPos - ChaseeCircle.dy > 0){
			ChaseeCircle.yPos -= ChaseeCircle.dy;
			}
			break;
		case 40:  /* Down arrow was pressed */
			if (ChaseeCircle.yPos + ChaseeCircle.dy < canvas.width){
			ChaseeCircle.yPos += ChaseeCircle.dy;
			}
			break;
		case 37:  /* Left arrow was pressed */
			if (ChaseeCircle.xPos - ChaseeCircle.dx > 0){
			ChaseeCircle.xPos -= ChaseeCircle.dx;
			}
			break;
		case 39:  /* Right arrow was pressed */
			if (ChaseeCircle.xPos + ChaseeCircle.dx < canvas.width){
			ChaseeCircle.xPos += ChaseeCircle.dx;
			}
			break;
	}
	
}

function draw() {
	clear();	
	ChaseeCircle.update();	
	ChaserCircle.update();	
	if (ChaseeCircle.xPos > ChaserCircle.xPos && ChaseeCircle.yPos > ChaserCircle.yPos)
	{
		ChaserCircle.xPos += 2;
		ChaserCircle.yPos += 2;
	}
	else if (ChaseeCircle.xPos > ChaserCircle.xPos && ChaseeCircle.yPos <= ChaserCircle.yPos)
		ChaserCircle.xPos += 2;
	else if (ChaseeCircle.xPos <= ChaserCircle.xPos && ChaseeCircle.yPos > ChaserCircle.yPos)
		ChaserCircle.yPos += 2;	
	else if (ChaseeCircle.yPos < ChaserCircle.yPos)
		ChaserCircle.yPos -= 2;	
	else if (ChaseeCircle.xPos < ChaserCircle.xPos)
		ChaserCircle.xPos -= 2;	
	
    var step = requestAnimationFrame(() => {
			draw();
		}
	);
	// if (ChaserCircle.xPos == ChaseeCircle.xPos && ChaserCircle.yPos == ChaseeCircle.yPos) 
		// cancelAnimationFrame(step);
}
drawInitialSetup();
window.addEventListener('keydown',doKeyDown,true);
requestAnimationFrame(() => { draw();});