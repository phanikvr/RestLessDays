var ChaseeCanvas = new Canvas("canvas_layer1");
var ChaserCanvas = new Canvas("canvas_layer1");
var BulletCanvas = new Canvas("canvas_layer1");
var bulletImageDir = "../images/bullets";
var shipImageDir = "../images/spaceships";

// for chase we dont need to set the speed, because it moved with key strokes.
var ChaseeShip = new Ship(new Shape(50, 0, 150, 150, shipImageDir, "ship_b", 360, 90,90), ''); 

// setting the chaser Ship at one conrner, we can change dynamically.
var ChaserShip = new Ship(new Shape(50, 2, 0, 0, shipImageDir, "ship_r", 360, 90,90), 'bullet'); 

function Canvas(id)
{
	this.Id = id;
	this.canvas = document.getElementById(id);
	this.ctx =  this.canvas.getContext('2d');
}

Canvas.prototype.clear = function() {
 this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.width);
}

function Shape(radius, speed, xPos, yPos, imageDir, imageName, angle, imageH, imageW) {
      this.radius = radius;
      this.speed = speed;
      this.xPos = xPos;
      this.yPos = yPos;
	  this.dx = 16;
	  this.dy = 16;	  
	  this.imageName = imageName;
	  this.imageDir = imageDir;
	  this.rotateAngle = angle;	  
	  this.height = imageH;
	  this.width = imageW;
      //this.opacity = 0.05 + Math.random() * 0.5;
      this.counter = 0; 
    }
	
Shape.prototype.Image = function()
{
	var image = new Image();
	image.src = this.imageDir + '/' + this.imageName + '_' + this.rotateAngle + '.jpg';
	return image;
}

function Ship(shape, bulletImageName)
{
	this.Shape = shape;
	this.xPos = shape.xPos;
	this.yPos = shape.yPos;
	this.speed = shape.speed;
	this.dx = shape.dx;
	this.dy = shape.dy;	
	this.rotateAngle =  function (angle) {
		this.Shape.rotateAngle = angle;
	}
	this.Bullet = null; // bullet loads only when user hits a spacebar key
}

Canvas.prototype.Setup = function(ship) {
	//this.clear();
	this.ctx.fillStyle = "white";
	this.ctx.strokeStyle = "black";
	ship.update(this);
}

Ship.prototype.update = function(canvas) {
	canvas.ctx.drawImage(this.Shape.Image(), this.xPos, this.yPos, this.Shape.height, this.Shape.width);
	//console.log('shipname: ' + this.Shape.imageName + ',  angle:' + this.Shape.rotateAngle);
	if (this.Bullet) // if bullet is loaded fire only then.
	{
		this.fireBullet(BulletCanvas, this.Bullet.isFired);
		if(this.Bullet.rotateAngle == 360 && (this.Bullet.xPos < ChaseeShip.xPos && this.Bullet.xPos < BulletCanvas.canvas.width))
		{			
			this.Bullet.xPos +=  this.Bullet.speed;	
			this.Bullet2.xPos +=  this.Bullet2.speed;
			this.Bullet2.yPos = this.Bullet.yPos + this.Shape.height - this.Bullet.height;
		}
		else if (this.Bullet.rotateAngle == 180 && this.Bullet.xPos > (ChaseeShip.xPos + ChaseeShip.Shape.width))
		{
			this.Bullet.xPos -=  this.Bullet.speed;	
			this.Bullet2.xPos -=  this.Bullet2.speed;	
			this.Bullet2.yPos = this.Bullet.yPos + this.Shape.height - this.Bullet.height;
		}
		else if (this.Bullet.rotateAngle == 90 && this.Bullet.yPos  >  -this.Bullet.height && this.Bullet.yPos  > ChaseeShip.yPos)
		{			
			this.Bullet.yPos -=  this.Bullet.speed;
			this.Bullet2.yPos -=  this.Bullet2.speed;
			this.Bullet2.xPos = this.Bullet.xPos + this.Shape.height - this.Bullet.height;
		}
		else if (this.Bullet.rotateAngle == 270 && (this.Bullet.yPos < ChaseeShip.yPos && this.Bullet.yPos <  BulletCanvas.canvas.height))	
		{
			this.Bullet.yPos +=  this.Bullet.speed;
			this.Bullet2.yPos +=  this.Bullet2.speed;
			this.Bullet2.xPos = this.Bullet.xPos + this.Shape.height - this.Bullet.height;
		}
		else 
		{
			this.isFired = false;
			this.Bullet.xPos = -100;
			this.Bullet.yPos = -100;
			this.Bullet2.xPos = -100;
			this.Bullet2.yPos = -100;
		}
	}
}

Ship.prototype.fireBullet = function(canvas, isFired) {
		canvas.ctx.drawImage(this.Bullet.Image(), this.Bullet.xPos, this.Bullet.yPos, this.Bullet.height, this.Bullet.width);
		canvas.ctx.drawImage(this.Bullet2.Image(), this.Bullet2.xPos, this.Bullet2.yPos, this.Bullet2.height, this.Bullet2.width);
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
			ChaseeShip.rotateAngle(90);
			break;
		case 40:  /* Down arrow was pressed */
			if (ChaseeShip.yPos + ChaseeShip.dy < ChaseeCanvas.canvas.width){
			ChaseeShip.yPos += ChaseeShip.dy; 
			}
			ChaseeShip.rotateAngle(270);
			break;
		case 37:  /* Left arrow was pressed */
			if (ChaseeShip.xPos - ChaseeShip.dx > 0){
			ChaseeShip.xPos -= ChaseeShip.dx;
			}
			ChaseeShip.rotateAngle(180);
			break;
		case 39:  /* Right arrow was pressed */
			if (ChaseeShip.xPos + ChaseeShip.dx < ChaseeCanvas.canvas.width){
			ChaseeShip.xPos += ChaseeShip.dx;
			}
			ChaseeShip.rotateAngle(360);
			break;
		case 32:
			ChaserShip.Bullet = new Shape(50, 5, ChaserShip.xPos, ChaserShip.yPos, bulletImageDir, 'bullet', ChaserShip.Shape.rotateAngle, 30,30);			
			ChaserShip.Bullet.isFired  = true;
			ChaserShip.Bullet2 = new Shape(50, 5, ChaserShip.xPos, ChaserShip.yPos, bulletImageDir, 'bullet', ChaserShip.Shape.rotateAngle, 30,30);
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
		ChaserShip.rotateAngle(315);		
	}
	else if (ChaseeShip.xPos < ChaserShip.xPos && ChaseeShip.yPos < ChaserShip.yPos)
	{
		ChaserShip.xPos -= ChaserShip.speed;
		ChaserShip.yPos -= ChaserShip.speed;
		ChaserShip.rotateAngle(135);
	}
	else if (ChaseeShip.yPos > ChaserShip.yPos && ChaseeShip.xPos == ChaserShip.xPos)
	{
		ChaserShip.yPos += ChaserShip.speed;
		ChaserShip.rotateAngle(270);
	}
	else if (ChaseeShip.yPos < ChaserShip.yPos && ChaseeShip.xPos == ChaserShip.xPos)
	{
		ChaserShip.yPos -= ChaserShip.speed;	
		ChaserShip.rotateAngle(90);
	}
	else if (ChaseeShip.xPos < ChaserShip.xPos && ChaseeShip.yPos == ChaserShip.yPos)
	{
		ChaserShip.xPos -= ChaserShip.speed;	
		ChaserShip.rotateAngle(180);
	}
	else if (ChaseeShip.xPos > ChaserShip.xPos && ChaseeShip.yPos == ChaserShip.yPos)
	{
		ChaserShip.xPos += ChaserShip.speed;		
		ChaserShip.rotateAngle(360);
	}
	else if (ChaseeShip.xPos > ChaserShip.xPos && ChaseeShip.yPos < ChaserShip.yPos)
	{
		ChaserShip.xPos += ChaserShip.speed;
		ChaserShip.yPos -= ChaserShip.speed;
		ChaserShip.rotateAngle(45);
	}
	else if (ChaseeShip.xPos < ChaserShip.xPos && ChaseeShip.yPos > ChaserShip.yPos)
	{
		ChaserShip.xPos -= ChaserShip.speed;
		ChaserShip.yPos += ChaserShip.speed;
		ChaserShip.rotateAngle(225);
	}
	
    var step = requestAnimationFrame(() => {
			draw();
		}
	);
	// if (ChaserShip.xPos == ChaseeShip.xPos && ChaserShip.yPos == ChaseeShip.yPos) 
		// cancelAnimationFrame(step);
}
window.addEventListener('keydown',doKeyDown,true);
requestAnimationFrame(() => { draw();});