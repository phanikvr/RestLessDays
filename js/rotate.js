
	var counter = 0,
		logoImage = new Image(),
		TO_RADIANS = Math.PI/180; 
	logoImage.src = '../images/spaceships/ship_r.jpg';
	logoImage.height = 60;
	logoImage.width = 60;
	var canvas = document.getElementById('canvas_layer1'); 
	canvas.width = 600; 
	canvas.height = 600; 
	
	var context = canvas.getContext('2d'); 


	function init(){
		//setInterval(loop, 1000/30); 		
	}

	function loop() { 
		context.clearRect(0,0,canvas.width, canvas.height); 
		drawRotatedImage(logoImage,100,100,counter); 
		// drawRotatedImage(logoImage,300,100,counter+90); 
		// drawRotatedImage(logoImage,500,100,counter+180); 
		counter+=2; 
	
	}
	
	function doKeyDown(evt){
		context.clearRect(0,0,canvas.width, canvas.height); 
	switch (evt.keyCode) {
		case 38:  /* Up arrow was pressed */
			drawRotatedImage(logoImage,100,100,3); 			
			break;
		case 40:  /* Down arrow was pressed */
			drawRotatedImage(logoImage,100,100,2); 
			break;
		case 37:  /* Left arrow was pressed */
			drawRotatedImage(logoImage,100,100,14); 
			break;
		case 39:  /* Right arrow was pressed */
			drawRotatedImage(logoImage,100,100,15); 
			break;
	}	
}

function move(x1, y1)
{
	context.beginPath();
	context.drawImage(image, x1, y1);
	context.fill();
}
	
	
	function drawRotatedImage(image, x, y, angle) { 

		// save the current co-ordinate system 
		// before we screw with it
		context.save(); 

		// move to the middle of where we want to draw our image
		//context.translate(image.width, image.height);

		// rotate around that point, converting our 
		// angle from degrees to radians 
		context.rotate(angle * TO_RADIANS);

		// draw it up and to the left by half the width
		// and height of the image 
		context.drawImage(image, image.width, image.height);

		// and restore the co-ords to how they were when we began
		context.restore(); 
	}

	init();
	window.addEventListener('keydown',doKeyDown,true);
	