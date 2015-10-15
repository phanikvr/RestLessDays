// 
// Core Javascript File that Runs All Games.
//
// NOTE: The following Notation is needed in ALL Javascript files
//       that run Jquery commands:
//       $(function() {
//         ...
//       });
//

//ALERT: You have to put global variables outside of Jquery Tags for them to work.
var canvas, ctx;
var keys_pressed = [];
var i = 0;
var global_time = 0;
var cliff;
var mimi;
var roy;
var dir_chars = './images/chars/';
var dir_props = './images/props/';

function simulateKeyPress(char) {
  e = jQuery.Event("keydown");
  e.which = char;
  e.keyCode = char;
  // Canvas Object
  $("#canvas_set").trigger(e);
}

/* OBJECT CONSTRUCTION - Class Variables */
function object(name, type, x, y, w, h, image_state) {
  this.x = x;
  this.y = y;
  this.w = w;
  this.h = h;
  this.name = name;
  this.img = '';
  this.clothing = 'default';
  this.image_state = image_state;
  this.img = new Image();
  this.props = [];
  
  if(type == 'character') {
    this.img.src = dir_chars + this.name + '/' + this.clothing + '/' + this.image_state + '.png';
  }
  if(type == 'prop') {
    this.img.src = dir_props + '/' + this.image_state + '.png';
  }
}
object.prototype.drawImage = function() {
  ctx.drawImage(this.img, this.x, this.y, this.w, this.h);	
}
object.prototype.charCommands = function(ctx, config) {  
  
  $.each(config, function( command, params ) {
    str = "this."+ command + "(ctx";
    if(params.length) {
      str += "," + params.join(",");
    }
    str += ");";
  });
  eval(str);
}
object.prototype.move = function(ctx, direction){
  
  var stationary = 0;  
  ctx.clearRect(this.x,this.y,this.w,this.h);
  
  if(['left','right'].indexOf(direction) != -1) { 
			    
    if(direction == 'left') {		  
	    if(this.image_state.indexOf('right') == -1) {
	      this.image_state = 'right-standing-mouth-closed';
	      stationary = 1;
	    } else {
	      if(this.image_state.indexOf('right-walking-left-foot') == -1) {
	        this.image_state = 'right-walking-left-foot';
	      } else {
	        this.image_state = 'right-walking-right-foot';
	      }
	    }
	    op = "-";
	  }	  
    if(direction == 'right') {
      if(this.image_state.indexOf('left') == -1) {
        this.image_state = 'left-standing-mouth-closed';
        stationary = 1;
      } else {
        if(this.image_state.indexOf('left-walking-left-foot') == -1) {
          this.image_state = 'left-walking-left-foot';
        } else {
          this.image_state = 'left-walking-right-foot';
        }
      }
      op = "+";
    }
	  	   
    if (!stationary) {
      eval("this.x = this.x " + op + " 10");
    }
	
  } else if(['up','down'].indexOf(direction) != -1) {
    	  
    op = "+";
    if(direction == 'up') {
      if(this.image_state.indexOf('back') == -1) {
        this.image_state = 'back-standing';
        stationary = 1;
      } else {
        if(this.image_state.indexOf('back-walking-left-foot') == -1) {
          this.image_state = 'back-walking-left-foot';
        } else {
          this.image_state = 'back-walking-right-foot';
        }
      }
      op = "-";
    }
    if(direction == 'down') { 
      if(this.image_state.indexOf('front') == -1) {
        this.image_state = 'front-standing-mouth-closed';
        stationary = 1;
      } else {
        if(this.image_state.indexOf('front-walking-right-foot') == -1) {
          this.image_state = 'front-walking-right-foot';
        } else {
          this.image_state = 'front-walking-left-foot';
        }
      }
      op = "+";
    }
    
	  if (!stationary) {
	    eval("this.y = this.y " + op + " 10");
	  }
	}
 
	this.draw(ctx);
  
}
object.prototype.talk = function(ctx) {
  ctx.clearRect(this.x,this.y,this.w,this.h);
	
  pos1 = 'front';
  pos2 = 'standing';

  if(this.image_state.indexOf('front') != -1  ||
     this.image_state.indexOf('left') != -1  ||
	 this.image_state.indexOf('right') != -1) {	
    pos1 = this.image_state.split('-')[0];
    pos2 = this.image_state.split('-')[1];    
    if(pos2 != 'sitting') {
      pos2 = 'standing';
    }
  }
      
  if(this.image_state.indexOf('-mouth-closed') == -1) {
    this.image_state = pos1 + '-' + pos2 + '-mouth-closed';  
  } else {
    this.image_state = pos1 + '-' + pos2 + '-mouth-open';	  
  }
  
  this.renderAttachedProps(ctx);
  
  this.draw(ctx);
  
  ctx.globalCompositeOperation = 'source-over';
  
}
object.prototype.sit = function(ctx) {
  if(this.image_state.indexOf('left-standing') != -1  ||
	 this.image_state.indexOf('left-walking') != -1   ||
	 this.image_state.indexOf('right-standing') != -1 ||
	 this.image_state.indexOf('right-walking') != -1) {
	  
    ctx.clearRect(this.x,this.y,this.w,this.h);
        
    if(this.image_state.indexOf('left-standing') != -1 ||
      this.image_state.indexOf('left-walking') != -1) {
      this.image_state = 'left-sitting-mouth-closed';
    } else {
      this.image_state = 'right-sitting-mouth-closed';
    }
		
    this.draw(ctx);
  }
}
object.prototype.renderAttachedProps = function(ctx) {
  if(this.props.length) {
    $.each(this.props, function(index, prop) {
      // TEST IMG-OVER-IMG
      ctx.globalCompositeOperation = 'destination-over';
      ctx.clearRect(prop.x,prop.y,prop.w,prop.h);
      prop.drawImage();
    });
  }
  
}
object.prototype.draw = function(ctx) {
  this.changeImgSrc();
  ctx.drawImage(this.img, this.x, this.y, this.w, this.h);
} 
object.prototype.changeImgSrc = function() {
  //global_time += delay;	
  //setTimeout(function () {  
  this.img.src = dir_chars + this.name + '/' + this.clothing + '/' + this.image_state + '.png';
  //}, global_time);
}

function firstScene() {
  //Calling this first before drawing characters solves the 
  //"[refresh] dissapearing canvas" problem.
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  // SMOOTH LINES - ON/OFF
  ctx.mozImageSmoothingEnabled = false;
  
  mimi = new object('Mimi', 'character', 308, -60, 80, 114, 'front-standing-mouth-closed');
  mimi.drawImage();
  
  // roy = new object('Roy', 'character', 308, 0, 80, 114, 'front-standing-mouth-closed');
  // roy.drawImage();
  
  ctx.globalCompositeOperation = 'destination-over';
  
  bed = new object('bed', 'prop', 77, 349, 145, 112, 'hospital-bed-light-blue-blanket');
  bed.drawImage();
  
  cliff = new object('Cliff', 'character', 75, 321, 80, 114, 'left-standing-mouth-closed');
  cliff.props.push(bed);
  cliff.drawImage();
 
}

$(document).ready(function() {
  	
  sound_file = './sounds/episode_01';
    var mySound = new buzz.sound( sound_file, {
    formats: [ "mp3" ]
  });
    
  /* Create the Canvas Object */
  canvas = document.getElementById('canvas_set');
  /* Set the 2D Context */
  ctx = canvas.getContext("2d");
  
  //$('#canvas_set').css('background-color', 'green');
  sets = [];
  sets[0] = './images/sets/hospital-private-room.png';
  $('#canvas_set').css('background-image', 'url("' + sets[0] + '")');
  
  firstScene();
  
  $('#record').click(function(){    
    if($(this).val() == 'RECORD') {
      keys_pressed = [];
      i = 0;
      firstScene();
      alert('Move Characters and Key Strokes will be recorded.');
      mySound.load();
      mySound.play();
      $(this).val('STOP RECORDING');
    } else {
      mySound.pause();
      firstScene();
      $(this).val('RECORD');
      $('#play_back').css('display','inline-block');
      $('#play_back').val('PLAY');
    }
  });
  
  $('#play_back').css('display','none');
  
  $('#play_back').click(function(){
    
    if($(this).val() == 'PLAY') {
      $(this).val('STOP');
      mySound.load();
      mySound.play();
      firstScene();  
    	for(index = 0; index < keys_pressed.length; index++) {  	  
    	  delay = 1500;
    	  if(index > 0) {
    	    delay = keys_pressed[index][0] - keys_pressed[index-1][0];
    	  }
    	  global_time += delay;
    	  (function(index) {
    	    setTimeout(function(){ simulateKeyPress(keys_pressed[index][1]); }, global_time);
    	  })(index)
    	}	
    } else {
      mySound.pause();
      firstScene();
      $(this).val('PLAY');
    }
    
  });
  
  
});

$(document).keydown(function(e) {
	
	var d = new Date();
	
	if($('#record').val() != 'record') {
	  keys_pressed[i] =  new Array(d.getTime(), e.which);
  }

	i++;
					
  switch(e.which) {
    case 37: // left arrow - Char1 left
    	//alert('left');
    	cliff.charCommands(ctx, {'move':["'left'"]});
        break;

    case 38: // up arrow - Char1 up
    	// if(!isPixelCollision(phil.img, phil.x + 20, phil.y + 20, mimi.img, mimi.x, mimi.y, false)) {
      cliff.charCommands(ctx, {'move':["'up'"]});
    	// }
    	break;

    case 39: // right arrow - Char1 right
    	// Collision Detection
    	// if(!isPixelCollision(phil.img, phil.x + 20, phil.y + 20, mimi.img, mimi.x, mimi.y, false)) {
      cliff.charCommands(ctx, {'move':["'right'"]});	
    	// }
    	break;

    case 40: // down arrow - Char1 down
      cliff.charCommands(ctx, {'move':["'down'"]});
    	break;
    
    case 18: // space key - Char1 talk
      cliff.charCommands(ctx, {'talk':[]});
        break;
    
    case 191: // / ? key - Char1s sit
      cliff.charCommands(ctx, {'sit':[]});
    	break;
    
    case 9: // TAB key - Char2 talk
    	mimi.charCommands(ctx, {'talk':[]});
    	break;
    
    case 87: // w key - Char2 up
    	mimi.charCommands(ctx, {'move':["'up'"]});
    	break;
    
    case 83: // s key - Char2 down
    	mimi.charCommands(ctx, {'move':["'down'"]});
      break;
    
    case 65: // a key - Char2 left
    	mimi.charCommands(ctx, {'move':["'left'"]});
      break;
    
    case 68: // d key - Char2 right
    	mimi.charCommands(ctx, {'move':["'right'"]});
      break;
    
    case 20: // Caps Lock key - Char2 sit
    	mimi.charCommands(ctx, {'sit':[]});
      break;

    default: return; // exit this handler for other keys
  }
  e.preventDefault(); // prevent the default action (scroll / move caret)
    
});

/**
 * @author Joseph Lenton - PlayMyCode.com
 *
 * @param first An ImageData object from the first image we are colliding with.
 * @param x The x location of 'first'.
 * @param y The y location of 'first'.
 * @param other An ImageData object from the second image involved in the collision check.
 * @param x2 The x location of 'other'.
 * @param y2 The y location of 'other'.
 * @param isCentred True if the locations refer to the centre of 'first' and 'other', false to specify the top left corner.
 */
function isPixelCollision( first, x, y, other, x2, y2, isCentred )
{
    // we need to avoid using floats, as were doing array lookups
    x  = Math.round( x );
    y  = Math.round( y );
    x2 = Math.round( x2 );
    y2 = Math.round( y2 );

    var w  = first.width,
        h  = first.height,
        w2 = other.width,
        h2 = other.height ;

    // deal with the image being centred
    if ( isCentred ) {
        // fast rounding, but positive only
        x  -= ( w/2 + 0.5) << 0
        y  -= ( h/2 + 0.5) << 0
        x2 -= (w2/2 + 0.5) << 0
        y2 -= (h2/2 + 0.5) << 0
    }

    // find the top left and bottom right corners of overlapping area
    var xMin = Math.max( x, x2 ),
        yMin = Math.max( y, y2 ),
        xMax = Math.min( x+w, x2+w2 ),
        yMax = Math.min( y+h, y2+h2 );

    // Sanity collision check, we ensure that the top-left corner is both
    // above and to the left of the bottom-right corner.
    if ( xMin >= xMax || yMin >= yMax ) {
        return false;
    }

    var xDiff = xMax - xMin,
        yDiff = yMax - yMin;

    // get the pixels out from the images
    var pixels  = first.data,
        pixels2 = other.data;

    // if the area is really small,
    // then just perform a normal image collision check
    if ( xDiff < 4 && yDiff < 4 ) {    	
        for ( var pixelX = xMin; pixelX < xMax; pixelX++ ) {
            for ( var pixelY = yMin; pixelY < yMax; pixelY++ ) {
                if (
                        ( pixels [ ((pixelX-x ) + (pixelY-y )*w )*4 + 3 ] !== 0 ) &&
                        ( pixels2[ ((pixelX-x2) + (pixelY-y2)*w2)*4 + 3 ] !== 0 )
                ) {
                	alert('true');
                    return 'true';
                }
            }
        }
    } else {
        /* What is this doing?
         * It is iterating over the overlapping area,
         * across the x then y the,
         * checking if the pixels are on top of this.
         *
         * What is special is that it increments by incX or incY,
         * allowing it to quickly jump across the image in large increments
         * rather then slowly going pixel by pixel.
         *
         * This makes it more likely to find a colliding pixel early.
         */

        // Work out the increments,
        // it's a third, but ensure we don't get a tiny
        // slither of an area for the last iteration (using fast ceil).
        var incX = xDiff / 3.0,
            incY = yDiff / 3.0;
        incX = (~~incX === incX) ? incX : (incX+1 | 0);
        incY = (~~incY === incY) ? incY : (incY+1 | 0);
        
        for ( var offsetY = 0; offsetY < incY; offsetY++ ) {
            for ( var offsetX = 0; offsetX < incX; offsetX++ ) {
                for ( var pixelY = yMin+offsetY; pixelY < yMax; pixelY += incY ) {
                    for ( var pixelX = xMin+offsetX; pixelX < xMax; pixelX += incX ) {
                    	return true;
                    	/*
                    	if (
                                ( pixels [ ((pixelX-x ) + (pixelY-y )*w )*4 + 3 ] !== 0 ) &&
                                ( pixels2[ ((pixelX-x2) + (pixelY-y2)*w2)*4 + 3 ] !== 0 )
                        ) {
                        	return 'true';
                        }
                        */
                    }
                }
            }
        }
        
    }

    return false;
}