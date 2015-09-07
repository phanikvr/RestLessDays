// 
// Core Javascript File that Runs All Games.
//
// NOTE: The following Notation is needed in ALL Javascript files
//       that run Jquery commands:
//       $(function() {
//         ...
//       });
//

var dir_chars = './images/chars/';

//ALERT: You have to put global variables outside of Jquery Tags for them
//to work.
var canvas, ctx;
var keys_pressed = [];
var i = 0;
var global_time = 0;
var phil;

//var image_state = 'left-facing-standing-mouth-closed';

/* OBJECT CONSTRUCTION */
function character(name, x, y, w, h) {
  this.x = x;
  this.y = y;
  this.w = w;
  this.h = h;
  this.name = name;
  this.img = '';
  this.image_state = 'front-standing-mouth-closed';
 
  this.img = new Image();
  this.img.src = dir_chars + this.name + '/' + this.image_state + '.png';
}

character.prototype.drawImage = function() {
  ctx.drawImage(this.img, this.x, this.y, this.w, this.h);	
}
character.prototype.charCommands = function(ctx, config) {  
  
  $.each(config, function( command, params ) {
    str = "this."+ command + "(ctx";
    if(params.length) {
      str += "," + params.join(",");
    }
    str += ");";
  });
  eval(str);
}
character.prototype.move = function(ctx, direction, delay){

  global_time += delay;  
  stationary = 0;
  
  var char = this;
  
  var callMethod = function () {
    ctx.clearRect(char.x,char.y,char.w,char.h);

	if(['left','right'].indexOf(direction) != -1) { 
			    
	  if(direction == 'left') {		  
	    if(char.image_state.indexOf('right') == -1) {
		  char.image_state = 'right-standing-mouth-closed';
		  stationary = 1;
		  
		} else {
			
		  if(char.image_state.indexOf('right-walking-left-foot') == -1) {
		    char.image_state = 'right-walking-left-foot';
		  } else {
		    char.image_state = 'right-walking-right-foot';
		  }
		}
		op = "-";
	  }
	  
	  if(direction == 'right') {
	    if(char.image_state.indexOf('left') == -1) {
		  char.image_state = 'left-standing-mouth-closed';
		  stationary = 1;
		} else {
		  if(char.image_state.indexOf('left-walking-left-foot') == -1) {
		    char.image_state = 'left-walking-left-foot';
		  } else {
			char.image_state = 'left-walking-right-foot';
		  }
		}
		op = "+";
	  }
	   
	  if (!stationary) {
	    eval("char.x = char.x " + op + " 10");
	  }
	} else if(['up','down'].indexOf(direction) != -1) {
	  
	  op = "+";
	  if(direction == 'up') {
	    if(char.image_state.indexOf('back') == -1) {
		  char.image_state = 'back-standing';
		  stationary = 1;
		} else {
		  if(char.image_state.indexOf('back-walking-left-foot') == -1) {
		    char.image_state = 'back-walking-left-foot';
		  } else {
			char.image_state = 'back-walking-right-foot';
		  }
		}
		op = "-";
	  }
	  if(direction == 'down') {
	    if(char.image_state.indexOf('front') == -1) {
		  char.image_state = 'front-standing-mouth-closed';
		  stationary = 1;
		} else {
		  if(char.image_state.indexOf('front-walking-right-foot') == -1) {
		    char.image_state = 'front-walking-right-foot';
		  } else {
			char.image_state = 'front-walking-left-foot';
		  }
		}
		op = "+";
	  }
	  if (!stationary) {
	    eval("char.y = char.y " + op + " 10");
	  }
	}

	char.draw(ctx);
	
  };
  
  setTimeout(callMethod, global_time);
  
}

character.prototype.talk = function(ctx) {

  ctx.clearRect(this.x,this.y,this.w,this.h);
	
  pos1 = 'front';
  pos2 = 'standing';

  if(this.image_state.indexOf('front') != -1  ||
     this.image_state.indexOf('left') != -1  ||
	 this.image_state.indexOf('right') != -1) {	
    pos1 = this.image_state.split('-')[0];
  }
    
  if(this.image_state.indexOf('-mouth-closed') == -1) {
    this.image_state = pos1 + '-' + pos2 + '-mouth-closed';  
  } else {
    this.image_state = pos1 + '-' + pos2 + '-mouth-open';	  
  }
      
  this.draw(ctx);
  
}
character.prototype.sit = function(ctx) {
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
character.prototype.draw = function(ctx) {
  this.changeImgSrc();
  ctx.drawImage(this.img, this.x, this.y, this.w, this.h);
} 
character.prototype.changeImgSrc = function() {
  //global_time += delay;	
  //setTimeout(function () {  
  this.img.src = dir_chars + this.name + '/' + this.image_state + '.png';
  //}, global_time);
}

$(document).ready(function() {
	
  /*
  //sound_file = './sounds/careless_whisper';
  sound_file = './sounds/char_cliff_test_vocals_02';
  var mySound = new buzz.sound( sound_file, {
    formats: [ "mp3" ]
  });
  // Play sound file in a loop
  // .loop();
  mySound.play();
  
  // Useful Vars
  // var str_loc = new String(window.location.href);
	
  /* MUSIC Config */
  /*
  var sound_file = '';
  game_title = str_loc.replace(/.*\/poster\/(.*)\/game\//,'$1');
  if(game_title.length) {
    sound_file = './sounds/bg';
  }
  */
  canvas = document.getElementById('canvas_set');
  ctx = canvas.getContext("2d");
  
  phil = new character('Phil', 75, 55, 35, 50);
  phil.drawImage();
  
  mimi = new character('Mimi', 150, 55, 35, 50);
  mimi.drawImage();
 
});

$(document).keydown(function(e) {
	
	var d = new Date();
	
	keys_pressed[i] = [d.getTime(), e.which];
	
	i++;
			
    switch(e.which) {
        case 37: // left arrow - Char1 left
        	phil.charCommands(ctx, {'move':["'left'",10]});
        break;

        case 38: // up arrow - Char1 up
        	phil.charCommands(ctx, {'move':["'up'",10]});
        break;

        case 39: // right arrow - Char1 right
        	phil.charCommands(ctx, {'move':["'right'",10]});
        break;

        case 40: // down arrow - Char1 down
        	phil.charCommands(ctx, {'move':["'down'",10]});
        break;
        
        case 32: // space key - Char1 talk
        	phil.charCommands(ctx, {'talk':[]});
        break;
        
        case 18: // ALT key - Char1 sit
        	phil.charCommands(ctx, {'sit':[]});
        break;
        
        case 9: // TAB key - Char2 talk
        	mimi.charCommands(ctx, {'talk':[]});
        break;
        
        case 87: // w key - Char2 up
        	mimi.charCommands(ctx, {'move':["'up'",10]});
        break;
        
        case 83: // s key - Char2 down
        	mimi.charCommands(ctx, {'move':["'down'",10]});
        break;
        
        case 65: // a key - Char2 left
        	mimi.charCommands(ctx, {'move':["'left'",10]});
        break;
        
        case 68: // d key - Char2 right
        	mimi.charCommands(ctx, {'move':["'right'",10]});
        break;

        default: return; // exit this handler for other keys
    }
    e.preventDefault(); // prevent the default action (scroll / move caret)
    
    //alert(keys_pressed);
    
});