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

function changeImgSrc(char, command, delay) {	
  setTimeout(function () {
	char.src = dir_chars + char.id + '/' + command + '.png';
  }, delay);
}

//ALERT: You have to put global variables outside of Jquery Tags for them
//to work.
var canvas, ctx;
var keys_pressed = [];
var i = 0;
var global_time = 0;

var x = 75;
var y = 55;
var w = 35;
var h = 50;
var image_state = 'front-standing-mouth-closed';

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
  var str_loc = new String(window.location.href);
  
  charFrontTalking('phil');
  charFrontWalking('phil');
  //charRightWalking('phil');
  charFrontTalking('ledge');
  charFrontWalking('ledge');
  */
	
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
  
  characters['phil'] = new Image();
  characters['phil'].id = 'phil';
  characters['phil'].src = './images/chars/phil/' + image_state + '.png';
  characters['phil'].onload = function () {
	  ctx.drawImage(characters['phil'], x, y, w, h);  
  }
  
  //ctx.drawImage(img, x, y, w, h);
  
  //changeImgSrc(char1_img, 'front-standing-mouth-closed', 500);
  //changeImgSrc(char1_img, 'front-standing-mouth-open', 1000);
  
  //changeImgSrc(char1_img, 'front-standing-mouth-closed',2000);
  //changeImgSrc(char1_img, 'front-standing-mouth-open', 3000);
  
  //draw();
  /*
  move(1000);
  move(2000);
  move(3000);
  timeout = 4000;
  //Make Character Talks
  changeImgSrc(characters['phil'], 'front-standing-mouth-open', timeout += 100);
  changeImgSrc(characters['phil'], 'front-standing-mouth-closed', timeout += 100);
  changeImgSrc(characters['phil'], 'front-standing-mouth-open', timeout += 100);
  changeImgSrc(characters['phil'], 'front-standing-mouth-closed', timeout += 100);
  changeImgSrc(characters['phil'], 'front-standing-mouth-open', timeout += 100);
  changeImgSrc(characters['phil'], 'front-standing-mouth-closed', timeout += 100);
  changeImgSrc(characters['phil'], 'front-standing-mouth-open', timeout += 100);
  changeImgSrc(characters['phil'], 'front-standing-mouth-closed', timeout += 100);
  changeImgSrc(characters['phil'], 'front-standing-mouth-open', timeout += 100);
  changeImgSrc(characters['phil'], 'front-standing-mouth-closed', timeout += 100);
  changeImgSrc(characters['phil'], 'front-standing-mouth-open', timeout += 100);
  changeImgSrc(characters['phil'], 'front-standing-mouth-closed', timeout += 100);
  changeImgSrc(characters['phil'], 'front-standing-mouth-open', timeout += 100);
  changeImgSrc(characters['phil'], 'front-standing-mouth-closed', timeout += 2000);
  changeImgSrc(characters['phil'], 'front-standing-mouth-open', timeout += 100);
  changeImgSrc(characters['phil'], 'front-standing-mouth-closed', timeout += 100);
  changeImgSrc(characters['phil'], 'front-standing-mouth-open', timeout += 100);
  changeImgSrc(characters['phil'], 'front-standing-mouth-closed', timeout += 100);
  changeImgSrc(characters['phil'], 'front-standing-mouth-open', timeout += 100);
  changeImgSrc(characters['phil'], 'front-standing-mouth-closed', timeout += 100);
  changeImgSrc(characters['phil'], 'front-standing-mouth-open', timeout += 100);
  changeImgSrc(characters['phil'], 'front-standing-mouth-closed', timeout += 100);
  changeImgSrc(characters['phil'], 'front-standing-mouth-open', timeout += 100);
  changeImgSrc(characters['phil'], 'front-standing-mouth-closed', timeout += 100);
  changeImgSrc(characters['phil'], 'front-standing-mouth-open', timeout += 100);
  */

  /*
  // How to call a function from a string
  function command(test){
    alert(test);
  }
  target = 'command';
  eval("command('sdfsdfsdfsdffs');");
  */
  
  // Array Like Objects
  /*
  var commands = {'test':'direction', 'speed':'fast'};
  alert(commands.test);  
  $.each(commands, function( key, value ) {
    alert( key + ": " + value );
  });
  */
 
});

function charCommands(config) {
	$.each(config, function( command, params ) {
	  eval(command + "(" + params.join(",") + ")");
    });
  }

function move(direction, delay){
  global_time += delay;

  setTimeout(function () {
    ctx.clearRect(x,y,w,h);
	if(['left','right'].indexOf(direction) != -1) {
	  op = "+";
	  if(direction == 'left') {
	    op = "-";
	  }
	  eval("x = x " + op + " 10");
	} else if(['up','down'].indexOf(direction) != -1) {
	  op = "+";
	  if(direction == 'up') {
	    op = "-";
	  }
	  eval("y = y " + op + " 10");
	}
	draw();
  }, global_time);
}

function draw() {
  //changeImgSrc('phil', 'front-standing-mouth-closed', 0);
  ctx.drawImage(characters['phil'], x, y, w, h);		
}

var characters = new Array();

$(document).keydown(function(e) {
	
	var d = new Date();
	
	keys_pressed[i] = [d.getTime(), e.which];
	
	i++;
	
    switch(e.which) {
        case 37: // left
        	charCommands({'move':["'left'",500]});
        break;

        case 38: // up
        	charCommands({'move':["'up'",500]});
        break;

        case 39: // right
        	charCommands({'move':["'right'",500]});
        break;

        case 40: // downs
        	charCommands({'move':["'down'",500]});
        break;
        
        case 32: // space
        	// charCommands({'move':["'left'",500]});
        break;

        default: return; // exit this handler for other keys
    }
    e.preventDefault(); // prevent the default action (scroll / move caret)
    
    //alert(keys_pressed);
    
});



function charFrontTalking(char_a) {

  // CHAR Talking
  changeImgSrc('char_'+char_a, './images/chars/' + char_a + '/front-standing-mouth-open.png', 100);
  changeImgSrc('char_'+char_a, './images/chars/' + char_a + '/front-standing-mouth-closed.png', 100);
  changeImgSrc('char_'+char_a, './images/chars/' + char_a + '/front-standing-mouth-open.png', 100);
  changeImgSrc('char_'+char_a, './images/chars/' + char_a + '/front-standing-mouth-closed.png', 100);
  changeImgSrc('char_'+char_a, './images/chars/' + char_a + '/front-standing-mouth-open.png', 100);
  changeImgSrc('char_'+char_a, './images/chars/' + char_a + '/front-standing-mouth-closed.png', 100);
  changeImgSrc('char_'+char_a, './images/chars/' + char_a + '/front-standing-mouth-open.png', 100);
  changeImgSrc('char_'+char_a, './images/chars/' + char_a + '/front-standing-mouth-closed.png', 100);
  changeImgSrc('char_'+char_a, './images/chars/' + char_a + '/front-standing-mouth-open.png', 100);
  changeImgSrc('char_'+char_a, './images/chars/' + char_a + '/front-standing-mouth-closed.png', 1000);
  changeImgSrc('char_'+char_a, './images/chars/' + char_a + '/front-standing-mouth-open.png', 100);
  changeImgSrc('char_'+char_a, './images/chars/' + char_a + '/front-standing-mouth-closed.png', 100);
  changeImgSrc('char_'+char_a, './images/chars/' + char_a + '/front-standing-mouth-open.png', 100);
  changeImgSrc('char_'+char_a, './images/chars/' + char_a + '/front-standing-mouth-closed.png', 100);
  changeImgSrc('char_'+char_a, './images/chars/' + char_a + '/front-standing-mouth-open.png', 100);
  changeImgSrc('char_'+char_a, './images/chars/' + char_a + '/front-standing-mouth-closed.png', 100);
  changeImgSrc('char_'+char_a, './images/chars/' + char_a + '/front-standing-mouth-open.png', 100);
  changeImgSrc('char_'+char_a, './images/chars/' + char_a + '/front-standing-mouth-closed.png', 100);
  changeImgSrc('char_'+char_a, './images/chars/' + char_a + '/front-standing-mouth-open.png', 1000);
  changeImgSrc('char_'+char_a, './images/chars/' + char_a + '/front-standing-mouth-closed.png', 100);
  changeImgSrc('char_'+char_a, './images/chars/' + char_a + '/front-standing-mouth-open.png', 100);
  changeImgSrc('char_'+char_a, './images/chars/' + char_a + '/front-standing-mouth-closed.png', 100);
  changeImgSrc('char_'+char_a, './images/chars/' + char_a + '/front-standing-mouth-open.png', 100);
  changeImgSrc('char_'+char_a, './images/chars/' + char_a + '/front-standing-mouth-closed.png', 100);
  changeImgSrc('char_'+char_a, './images/chars/' + char_a + '/front-standing-mouth-open.png', 100);
  changeImgSrc('char_'+char_a, './images/chars/' + char_a + '/front-standing-mouth-closed.png', 100);
  changeImgSrc('char_'+char_a, './images/chars/' + char_a + '/front-standing-mouth-open.png', 100);
  changeImgSrc('char_'+char_a, './images/chars/' + char_a + '/front-standing-mouth-closed.png', 1000);
  changeImgSrc('char_'+char_a, './images/chars/' + char_a + '/front-standing-mouth-open.png', 100);
  changeImgSrc('char_'+char_a, './images/chars/' + char_a + '/front-standing-mouth-closed.png', 100);
  changeImgSrc('char_'+char_a, './images/chars/' + char_a + '/front-standing-mouth-open.png', 100);
  changeImgSrc('char_'+char_a, './images/chars/' + char_a + '/front-standing-mouth-closed.png', 100);
  changeImgSrc('char_'+char_a, './images/chars/' + char_a + '/front-standing-mouth-open.png', 100);
  changeImgSrc('char_'+char_a, './images/chars/' + char_a + '/front-standing-mouth-closed.png', 100);
  changeImgSrc('char_'+char_a, './images/chars/' + char_a + '/front-standing-mouth-open.png', 100);
  changeImgSrc('char_'+char_a, './images/chars/' + char_a + '/front-standing-mouth-closed.png', 100);
  changeImgSrc('char_'+char_a, './images/chars/' + char_a + '/front-standing-mouth-open.png', 100);

}

function charFrontWalking(char_a) {
  
  //Char Walking
  changeImgSrc('char_'+char_a, './images/chars/' + char_a + '/front-walking-left-foot.png', 500);
  changeImgSrc('char_'+char_a, './images/chars/' + char_a + '/front-walking-right-foot.png', 500);
  $('#char_'+char_a).css('margin-top', '30px');
  changeImgSrc('char_'+char_a, './images/chars/' + char_a + '/front-walking-left-foot.png', 500);
  changeImgSrc('char_'+char_a, './images/chars/' + char_a + '/front-walking-right-foot.png', 500);
  changeImgSrc('char_'+char_a, './images/chars/' + char_a + '/front-walking-left-foot.png', 500);
  changeImgSrc('char_'+char_a, './images/chars/' + char_a + '/front-walking-right-foot.png', 500);
  changeImgSrc('char_'+char_a, './images/chars/' + char_a + '/front-walking-left-foot.png', 500);
  changeImgSrc('char_'+char_a, './images/chars/' + char_a + '/front-walking-right-foot.png', 500);
  changeImgSrc('char_'+char_a, './images/chars/' + char_a + '/front-walking-left-foot.png', 500);
  changeImgSrc('char_'+char_a, './images/chars/' + char_a + '/front-walking-right-foot.png', 500);
  changeImgSrc('char_'+char_a, './images/chars/' + char_a + '/front-walking-left-foot.png', 500);
  changeImgSrc('char_'+char_a, './images/chars/' + char_a + '/front-walking-right-foot.png', 500);
  changeImgSrc('char_'+char_a, './images/chars/' + char_a + '/front-walking-left-foot.png', 500);
  changeImgSrc('char_'+char_a, './images/chars/' + char_a + '/front-walking-right-foot.png', 500);
  changeImgSrc('char_'+char_a, './images/chars/' + char_a + '/front-walking-left-foot.png', 500);
  changeImgSrc('char_'+char_a, './images/chars/' + char_a + '/front-walking-right-foot.png', 500);
  changeImgSrc('char_'+char_a, './images/chars/' + char_a + '/front-walking-left-foot.png', 500);
  changeImgSrc('char_'+char_a, './images/chars/' + char_a + '/front-walking-right-foot.png', 500);

}