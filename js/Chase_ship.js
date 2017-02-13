var ChaseeCanvas = new Canvas("canvas_layer1");
var ChaserCanvas = new Canvas("canvas_layer1");
var shipImageDir = "../images/spaceships";

// for chase we dont need to set the speed, because it moved with key strokes.
var ChaseeShip = new Ship(50, 0, 150, 150, "ship_b", 360, 90,90); 

// setting the chaser Ship at one conrner, we can change dynamically.
var ChaserShip = new Ship(50, 2, 0, 0, "ship_r", 360, 60,60); 

function Canvas(id)
{
	this.Id = id;
	this.canvas = document.getElementById(id);
	this.ctx =  this.canvas.getContext('2d');
}

Canvas.prototype.clear = function() {
 this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.width);
}

function Ship(radius, speed, xPos, yPos, shipImageName, angle, imageH, imageW) {
      this.radius = radius;
      this.speed = speed;
      this.xPos = xPos;
      this.yPos = yPos;
	  this.dx = 16;
	  this.dy = 16;	  
	  this.shipImageName = shipImageName;
	  this.rotateAngle = angle;	  
	  this.height = imageH;
	  this.width = imageW;
      //this.opacity = 0.05 + Math.random() * 0.5;
      this.counter = 0; 
    }
	
Ship.prototype.ShipImage = function()
{
	var image = new Image();
	image.src = shipImageDir + '/' + this.shipImageName + '_' + this.rotateAngle + '.jpg';
	return image;
}

Canvas.prototype.Setup = function(ship) {
	this.clear();
	this.ctx.fillStyle = "white";
	this.ctx.strokeStyle = "black";
	var x = 150;
	var y = 100;
	var speed = 2;  // we can use decimal numbers to look more robustic.
	var radius = 15;	
	ship.update(this);
}

Ship.prototype.update = function(canvas) {
	canvas.ctx.drawImage(this.ShipImage(), this.xPos, this.yPos, this.height, this.width);
}

// Ship.prototype.rotate = function(canvasContext, image, x, y, angle) { 

		// // save the current co-ordinate system 
		// // before we screw with it
		// canvasContext.save(); 

		// // move to the middle of where we want to draw our image
		// canvasContext.translate(x, y);

		// // rotate around that point, converting our 
		// // angle from degrees to radians 
		// canvasContext.rotate(angle * TO_RADIANS);

		// // draw it up and to the left by half the width
		// // and height of the image 
		// canvasContext.drawImage(image, -(image.width)/2, -(image.height)/2);

		// // and restore the co-ords to how they were when we began
		// canvasContext.restore(); 
	// }

var self = this;
function doKeyDown(evt){
	switch (evt.keyCode) {
		case 38:  /* Up arrow was pressed */
			if (ChaseeShip.yPos - ChaseeShip.dy > 0){
			ChaseeShip.yPos -= ChaseeShip.dy;			
			}
			ChaseeShip.rotateAngle = 90;
			break;
		case 40:  /* Down arrow was pressed */
			if (ChaseeShip.yPos + ChaseeShip.dy < ChaseeCanvas.canvas.width){
			ChaseeShip.yPos += ChaseeShip.dy; 
			}
			ChaseeShip.rotateAngle = 270;
			break;
		case 37:  /* Left arrow was pressed */
			if (ChaseeShip.xPos - ChaseeShip.dx > 0){
			ChaseeShip.xPos -= ChaseeShip.dx;
			}
			ChaseeShip.rotateAngle = 180;
			break;
		case 39:  /* Right arrow was pressed */
			if (ChaseeShip.xPos + ChaseeShip.dx < ChaseeCanvas.canvas.width){
			ChaseeShip.xPos += ChaseeShip.dx;
			}
			ChaseeShip.rotateAngle = 360;
			break;
	}	
}

function draw() {
	ChaseeCanvas.clear();
	ChaserCanvas.clear();
	ChaseeShip.update(ChaseeCanvas);	
	ChaserShip.update(ChaserCanvas);	
	if (ChaseeShip.xPos > ChaserShip.xPos && ChaseeShip.yPos > ChaserShip.yPos)
	{
		ChaserShip.xPos += ChaserShip.speed;
		ChaserShip.yPos += ChaserShip.speed;
		ChaserShip.rotateAngle = 315;
	}
	else if (ChaseeShip.xPos < ChaserShip.xPos && ChaseeShip.yPos < ChaserShip.yPos)
	{
		ChaserShip.xPos -= ChaserShip.speed;
		ChaserShip.yPos -= ChaserShip.speed;
		ChaserShip.rotateAngle = 135;
	}
	else if (ChaseeShip.yPos > ChaserShip.yPos && ChaseeShip.xPos == ChaserShip.xPos)
	{
		ChaserShip.yPos += ChaserShip.speed;
		ChaserShip.rotateAngle = 270;
	}
	else if (ChaseeShip.yPos < ChaserShip.yPos && ChaseeShip.xPos == ChaserShip.xPos)
	{
		ChaserShip.yPos -= ChaserShip.speed;	
		ChaserShip.rotateAngle = 90;
	}
	else if (ChaseeShip.xPos < ChaserShip.xPos && ChaseeShip.yPos == ChaserShip.yPos)
	{
		ChaserShip.xPos -= ChaserShip.speed;	
		ChaserShip.rotateAngle = 180;
	}
	else if (ChaseeShip.xPos > ChaserShip.xPos && ChaseeShip.yPos == ChaserShip.yPos)
	{
		ChaserShip.xPos += ChaserShip.speed;		
		ChaserShip.rotateAngle = 360;
	}
	else if (ChaseeShip.xPos > ChaserShip.xPos && ChaseeShip.yPos < ChaserShip.yPos)
	{
		ChaserShip.xPos += ChaserShip.speed;
		ChaserShip.yPos -= ChaserShip.speed;
		ChaserShip.rotateAngle = 45;
	}
	else if (ChaseeShip.xPos < ChaserShip.xPos && ChaseeShip.yPos > ChaserShip.yPos)
	{
		ChaserShip.xPos -= ChaserShip.speed;
		ChaserShip.yPos += ChaserShip.speed;
		ChaserShip.rotateAngle = 225;
	}
	
    var step = requestAnimationFrame(() => {
			draw();
		}
	);
	// if (ChaserShip.xPos == ChaseeShip.xPos && ChaserShip.yPos == ChaseeShip.yPos) 
		// cancelAnimationFrame(step);
}
ChaseeCanvas.Setup(ChaseeShip);
ChaserCanvas.Setup(ChaserShip);
window.addEventListener('keydown',doKeyDown,true);
requestAnimationFrame(() => { draw();});