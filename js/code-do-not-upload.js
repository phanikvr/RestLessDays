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

/* Cool Code to be tested */
/*
$('#canvas_set').fadeOut(2000);
*/

// The Main Canvas character and 2D Context variable
var canvas, ctx;
// Array that holds Every Key that has been pressed in the recording process.
var keys_pressed = [];
// Incrementer for the keys_pressed array.
var i = 0;
// Global Time to store the Time that goes by during the animation.
var global_time = 0;
// The "Cliff" character character.
var cliff;
// The "Mimi" character character.
var mimi;
// The "Roy" character character.
var roy;
// Directory that holds character graphics
var dir_chars = './images/chars/';
// Directory that holds scene props/characters (e.g. bed etc.)
var dir_props = './images/props/';
// The Sets/Backgrounds of the show.
var sets;
// The command Prompt
var commandPrompt;
// Maps talk command key and character name.
var talk_key_char_sb = [];
talk_key_char_sb[86] = [];
talk_key_char_sb[86]['roy'] = 2;
talk_key_char_sb[18] = [];
talk_key_char_sb[18]['cliff'] = 1;
talk_key_char_sb[9] = []
talk_key_char_sb[9]['mimi'] = 3;

function simulateKeyPress(vars) {

  if(talk_key_char_sb[vars['key']] != undefined) {
    alert(vars['key'])
  }

  /*
  //DEBUG - OFF
  if(vars['line'] != undefined) {
    $('#speech_bubble_' + vars['sb_no'] + 'a').html(vars['sb_html']);
    $("[id^='speech_bubble_" + vars['sb_no'] + "']").css('display','block');
  }
  */

  e = jQuery.Event("keydown");
  e.which = vars['key'];
  e.keyCode = vars['key'];
  // Canvas character
  $("#canvas_set").trigger(e);

  /* Dialogue Functionality has to be real time. */

}


/* OLD CODE: Channels Content */
/*
function channelOff() {
}
function channel1Content() {
}
function channel2Content() {
}
function channel3Content() {  
}
*/

function ucwords(str) {
    return (str + '').replace(/^([a-z])|\s+([a-z])/g, function ($1) {
        return $1.toUpperCase();
    });
}

/* CLASS: commandPrompt */
function commandPrompt() {
  // The allowed Commands of the Command Prompt
  this.commands = ['play the restless days 1','instructions','show statistics','add comment x'];
}
/* */
commandPrompt.prototype.start = function() { 
  //$('#power_button').val('Return to prompt>');
  $('#power_button').css('visibility','hidden');
  $('#channel_off').css('display','none');
  $('#command_prompt').css('display','block');
  $('#command_prompt div').css('display','block');
  $('#prompt').focus();
  return true;
}
commandPrompt.prototype.commandFound = function(command) { 
  if($.inArray(command.toLowerCase(), this.commands) == -1 ) {
    return false;
  }
  return true;
}

/* CLASS: character */
function character(name, type, x, y, w, h, image_state) {
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
character.prototype.move = function(ctx, direction){
  
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
character.prototype.talk = function(ctx) {
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
character.prototype.renderAttachedProps = function(ctx) {
  if(this.props.length) {
    $.each(this.props, function(index, prop) {
      // TEST IMG-OVER-IMG
      ctx.globalCompositeOperation = 'destination-over';
      ctx.clearRect(prop.x,prop.y,prop.w,prop.h);
      prop.drawImage();
    });
  }
  
}
character.prototype.draw = function(ctx) {
  this.changeImgSrc();
  ctx.drawImage(this.img, this.x, this.y, this.w, this.h);
} 
character.prototype.changeImgSrc = function() {
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
  
  mimi = new character('mimi', 'character', 308, -120, 80, 114, 'front-standing-mouth-closed');
  mimi.drawImage();
  
  roy = new character('roy', 'character', 308, -120, 80, 114, 'front-standing-mouth-closed');
  roy.drawImage();
  
  ctx.globalCompositeOperation = 'destination-over';
  
  bed = new character('bed', 'prop', 77, 349, 145, 112, 'hospital-bed-light-blue-blanket');
  bed.drawImage();
  
  cliff = new character('cliff', 'character', 75, 321, 80, 114, 'left-standing-mouth-closed');
  cliff.props.push(bed);
  cliff.drawImage();
 
}
$(document).ready(function() {

  //Create a Command Prompt
  commandPrompt = new commandPrompt();
  
  if(document.location == 'http://dev.filmtronic.com/the-restless-days/?payment=success' ||
    document.location == 'http://www.filmtronic.com/the-restless-days/?payment=success') {
    commandPrompt.start();
  } else if(document.location == 'http://dev.filmtronic.com/the-restless-days/?payment=cancelled' ||
    document.location == 'http://www.filmtronic.com/the-restless-days/?payment=cancelled') {
    $('#power_button').val('Try Again');
  }
  	
  // FORMAT is MP3 for now on.
  // Review Sound File Below (could be too funny with dialogue)
  // sound_file = './sounds/2009-dietmarhess-excl-show_beats_01_proud_music_preview';
  sound_file = './sounds/on_the_town_proud_music_preview';
  var episode1Sound = new buzz.sound( sound_file, {
    formats: [ "mp3" ],
    volume: 100
  });
    
  /* Create the Canvas character */
  canvas = document.getElementById('canvas_set');
  /* Set the 2D Context */
  ctx = canvas.getContext("2d");

  /* SCALE the Context 
  The 0.04 was added as they Eyes of the characters were too small with 
  scale(0.8,0.8);
  */
  ctx.scale(0.84,0.84);
  
  canvas.addEventListener("click", doMouseDown, false);
  
  /* Sets/Backgrounds of Show */
  sets = [];
  sets[0] = './images/sets/hospital-private-room.png';
  sets[1] = './images/sets/tv-coloured-lines.png';
  sets[2] = './images/sets/device-green-lines.png';
  
  /*
  *********
  ALERT!!!!!! > global_time affects Episode Sound File Timing with Animation!!!!
  *********
  $('#canvas_set').css('background-image', 'url("' + sets[1] + '")');
  global_time += 4000;
  setTimeout(function(){ $('#canvas_set').css('background-image', 'url("' + sets[0] + '")'); }, global_time);
  */


  //Zoom facility - Work in Progress
  //ctx.save();
  //ctx.translate(-300,-1500);
  //ctx.scale(5,5);
  //ctx.restore();

  /* TV Off Air Screen and Sound */
  $('#canvas_set').css('background-image', 'url("' + sets[1] + '")');

  // Width:420px was used because we had to cater for the 0.84 Scale on Context
  // due to Eye size of character.
  $('#canvas_set').css('background-size', '420px 400px');

  /* ALERT: Speech Bubble example - currently NOT WORKING */
  /*
  ctx.fillStyle = "white";
  ctx.fillRect(0,0, 200, 200);
  // draw font in red
  ctx.fillStyle = "red";
  ctx.font = "20pt sans-serif";
  ctx.fillText("Canvas Rocks!", 5, 100);
  ctx.strokeText("Canvas Rocks!", 5, 130);
  */
  
  global_time += 3000;
  setTimeout(function(){ 
    $('#canvas_set').css('background-image', 'url("' + sets[0] + '")');
    firstScene(); 
  }, global_time);

  /*
  global_time += 6000;
  setTimeout(function(){ 
    canvas.width = canvas.width;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    $('#canvas_set').hide();
    $('#canvas_set').show();
    $('#canvas_set').css('background-image', 'url("' + sets[2] + '")'); 
  }, global_time);
  */

  
  $('#record').click(function(){    
    if($(this).val() == 'RECORD') {
      keys_pressed = [];
      i = 0;
      firstScene();
      episode1Sound.load();
      setTimeout(function() { episode1Sound.play() }, global_time+9000);
      $(this).val('STOP RECORDING');
    } else {
      episode1Sound.pause();
      firstScene();
      $(this).val('RECORD');
      $('#play_back').css('display','inline-block');
      $('#play_back').val('PLAY');
      // Save the below to a js file.
      alert(JSON.stringify(keys_pressed));
    }
  });

  $('#channel_plus').click(function(){

    new_no = parseInt($('#channel_number').html()) + 1
    
    if(new_no < 4 && new_no > 0) {
      $('#channel_number').html(new_no);
    }

    if(new_no == 2) {
      canvas.width = canvas.width;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      $('#canvas_set').css('background', 'url("' + sets[2] + '") top left no-repeat');
      
      setTimeout(function(){  
        $('#channel_1').css('display','none');
        $('#channel_2').css('display','block');
      }, 2000);
    }

    if(new_no == 3) {
      canvas.width = canvas.width;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      $('#channel_2').css('display','none');
      $('#channel_1').css('display','none');
      $('#channel_3').css('display','block');
      $('#channel_3 div').css('display', 'none');
      $('#channel_3').css('background', 'url("' + sets[2] + '") top left no-repeat');

      setTimeout(function(){
        $('#channel_3').css('background-image', 'none'); 
        $('#channel_3 div').css('display', 'block');
      }, 2000);
    }


  });

  $('#channel_minus').click(function(){
    new_no = parseInt($('#channel_number').html()) - 1
    
    if(new_no < 4 && new_no > 0) {
      $('#channel_number').html(new_no);
    }
  });

  $('#power_button').click(function(){

    if($(this).val() == 'PayPal $1 to Play' ||
       $(this).val() == 'Try Again') {
      $(this).val('Going to PayPal');
      setTimeout(function(){ $('#power_button').val('Going to PayPal.'); }, 0);
      setTimeout(function(){ $('#power_button').val('Going to PayPal..'); }, 500);
      setTimeout(function(){ $('#power_button').val('Going to PayPal...'); }, 600);
      $('#paypal_form').submit();
      //$('#command_prompt').css('background', 'url("' + sets[2] + '") top left no-repeat');
      //setTimeout(function(){
      //$('#command_prompt').css('background','none');
      //$('#command_prompt').css('background-color','#11230E');
      //}, 1000);
      /*
      $('#channel_off').css('display','none');
      $('#gui').fadeIn(2000);
      $(this).val('OFF');
      */
    } else {
      $(this).css('visibility','hidden');
      //$(this).val('PayPal $1 to play');
      //episode1Sound.pause();
      //firstScene();
      //$('#channel_off').css('display','block');
      //$('#gui').css('display','none');
      //$('#command_prompt').css('display','none');      
    }

  });

  //$('#play_back').css('display','none');
  
  $('#play_back').click(function(){
    
    if($(this).val() == 'PLAY') {
      $(this).val('STOP');
      
      /* Initialise Show - InitConfig */
      // ALERT: This is problematic because coming from the "Comments" section
      // Creates a Scale problem.
      /*
      scaleWidth = canvas.width/100;
      scaleHeight = canvas.height/100;
      alert(scaleWidth);
      */
      //ctx.scale(0.84,0.84);
      
      $('#command_prompt').css('display','none');
      $('#gui').css('display','block');
      episode1Sound.load();
      $('#canvas_set').css('background-image', 'url("' + sets[0] + '")');
      firstScene();  
      
      //DEBUG
      //episode1Sound.play();

      //alert(JSON.stringify(keys_pressed));
      //SAVED FIRST EPISODE COMMANDS
      keys_pressed = [[1445148869395,72],[1445148869539,72],[1445148869683,72],[1445148869828,72],[1445148869963,72],[1445148870108,72],[1445148870258,72],[1445148870402,72],[1445148870538,72],[1445148870690,72],[1445148870835,72],[1445148870962,72],[1445148871098,72],[1445148871243,72],[1445148871386,72],[1445148871522,72],[1445148871759,72],[1445148871794,72],[1445148871938,72],[1445148872090,72],[1445148872234,72],[1445148872372,72],[1445148872522,72],[1445148872666,72],[1445148872810,72],[1445148872964,72],[1445148873108,72],[1445148873250,72],[1445148873402,72],[1445148873546,72],[1445148873698,72],[1445148873846,72],[1445148874002,72],[1445148874066,71],[1445148874194,71],[1445148874346,71],[1445148874490,71],[1445148874618,71],[1445148874794,72],[1445148874938,72],[1445148875058,72],[1445148875202,72],[1445148875346,72],[1445148875482,72],[1445148875642,72],[1445148875794,72],[1445148875938,72],[1445148876090,72],[1445148876234,72],[1445148876450,71],[1445148876626,71],[1445148876770,71],[1445148878338,86],[1445148878579,86],[1445148878879,86],[1445148879120,86],[1445148879202,86],[1445148879394,86],[1445148879602,86],[1445148879802,86],[1445148880002,86],[1445148880169,86],[1445148880362,86],[1445148880529,86],[1445148880994,86],[1445148881681,18],[1445148881865,18],[1445148882025,18],[1445148882201,18],[1445148882393,18],[1445148882777,18],[1445148883530,86],[1445148883841,86],[1445148884097,86],[1445148884313,86],[1445148884505,86],[1445148885017,86],[1445148885241,86],[1445148885457,86],[1445148885649,86],[1445148885818,86],[1445148886481,86],[1445148886713,86],[1445148886913,86],[1445148887297,86],[1445148888177,18],[1445148888393,18],[1445148888577,18],[1445148888969,18],[1445148890025,86],[1445148890297,86],[1445148890505,86],[1445148890713,86],[1445148890897,86],[1445148891113,86],[1445148891881,86],[1445148892137,86],[1445148892466,86],[1445148892985,86],[1445148893417,18],[1445148893593,18],[1445148893761,18],[1445148894105,18],[1445148894713,18],[1445148894881,18],[1445148896305,86],[1445148896545,86],[1445148896809,86],[1445148897057,86],[1445148897977,18],[1445148898160,18],[1445148898337,18],[1445148898504,18],[1445148898672,18],[1445148898840,18],[1445148899008,18],[1445148899176,18],[1445148899321,18],[1445148899752,18],[1445148900152,18],[1445148900336,18],[1445148900512,18],[1445148900680,18],[1445148900857,18],[1445148901040,18],[1445148901216,18],[1445148901408,18],[1445148901592,18],[1445148901760,18],[1445148901920,18],[1445148902120,18],[1445148902320,18],[1445148903112,18],[1445148903328,18],[1445148903504,18],[1445148903680,18],[1445148903832,18],[1445148904008,18],[1445148904200,18],[1445148904384,18],[1445148904824,18],[1445148905488,18],[1445148905680,18],[1445148905904,18],[1445148906120,18],[1445148906320,18],[1445148906520,18],[1445148906704,18],[1445148907112,18],[1445148907880,86],[1445148908144,86],[1445148908376,86],[1445148908584,86],[1445148908784,86],[1445148909304,86],[1445148910056,18],[1445148910240,18],[1445148910416,18],[1445148910856,18],[1445148911048,18],[1445148911232,18],[1445148911448,18],[1445148911632,18],[1445148911864,18],[1445148912032,18],[1445148912392,18],[1445148912584,18],[1445148912751,18],[1445148912912,18],[1445148913056,18],[1445148913240,18],[1445148913424,18],[1445148913856,18],[1445148914264,18],[1445148914448,18],[1445148914776,18],[1445148915024,18],[1445148915247,18],[1445148915415,18],[1445148915591,18],[1445148915799,18],[1445148915992,18],[1445148916199,18],[1445148916415,18],[1445148916615,18],[1445148916791,18],[1445148917047,18],[1445148917976,86],[1445148918215,86],[1445148918416,86],[1445148918624,86],[1445148918873,86],[1445148919320,86],[1445148919815,18],[1445148919983,18],[1445148920175,18],[1445148920343,18],[1445148922471,86],[1445148922743,86],[1445148923408,86],[1445148923616,86],[1445148923799,86],[1445148923975,86],[1445148924167,86],[1445148924351,86],[1445148924599,86],[1445148924991,86],[1445148925287,86],[1445148925535,86],[1445148925720,86],[1445148925903,86],[1445148926087,86],[1445148926287,86],[1445148926687,86],[1445148927407,86],[1445148927679,86],[1445148927896,86],[1445148928103,86],[1445148928295,86],[1445148928503,86],[1445148928703,86],[1445148928903,86],[1445148929111,86],[1445148929984,86],[1445148930287,86],[1445148930559,86],[1445148930783,86],[1445148931007,86],[1445148931231,86],[1445148931455,86],[1445148932087,86],[1445148932591,86],[1445148932927,86],[1445148933214,18],[1445148933519,18],[1445148933710,18],[1445148933926,18],[1445148935375,18],[1445148935567,86],[1445148935871,86],[1445148936071,86],[1445148936279,86],[1445148936503,86],[1445148936727,86],[1445148936943,86],[1445148937143,86],[1445148937351,86],[1445148937582,86],[1445148937807,86],[1445148938007,86],[1445148938199,86],[1445148938406,86],[1445148939758,18],[1445148939974,18],[1445148940190,18],[1445148940750,18],[1445148940974,18],[1445148941174,18],[1445148941374,18],[1445148941574,18],[1445148941774,18],[1445148941966,18],[1445148942174,18],[1445148942366,18],[1445148942982,18],[1445148943182,18],[1445148943374,18],[1445148943542,18],[1445148943734,18],[1445148943942,18],[1445148944150,18],[1445148944334,18],[1445148944526,18],[1445148944718,18],[1445148944918,18],[1445148945102,18],[1445148945294,18],[1445148945911,18],[1445148946110,18],[1445148946302,18],[1445148946454,18],[1445148946606,18],[1445148947174,18],[1445148947750,18],[1445148947942,18],[1445148948134,18],[1445148948310,18],[1445148948510,18],[1445148948710,18],[1445148949886,86],[1445148950302,86],[1445148950590,86],[1445148950870,86],[1445148951974,18],[1445148952309,18],[1445148952726,86],[1445148952990,86],[1445148953206,86],[1445148953414,86],[1445148953645,86],[1445148953830,86],[1445148954734,18],[1445148954949,18],[1445148955133,18],[1445148955309,18],[1445148955501,18],[1445148955701,18],[1445148955877,18],[1445148956021,18],[1445148957102,86],[1445148957366,86],[1445148957574,86],[1445148958206,86],[1445148958309,18],[1445148958485,18],[1445148958653,18],[1445148958829,18],[1445148958989,18],[1445148959149,18],[1445148959549,18],[1445148959781,18],[1445148959941,18],[1445148960093,18],[1445148960495,18],[1445148960693,18],[1445148960861,18],[1445148961029,18],[1445148961197,18],[1445148961349,18],[1445148962933,86],[1445148963189,86],[1445148963398,86],[1445148963581,86],[1445148963805,86],[1445148964021,86],[1445148964805,18],[1445148965237,18],[1445148965789,86],[1445148966029,86],[1445148966213,86],[1445148966461,86],[1445148966837,86],[1445148967085,86],[1445148967285,86],[1445148967525,86],[1445148967757,86],[1445148968037,86],[1445148968333,86],[1445148968565,86],[1445148968773,86],[1445148968957,86],[1445148969157,86],[1445148969557,86],[1445148969965,86],[1445148970173,86],[1445148971117,86],[1445148971381,86],[1445148971653,86],[1445148971877,86],[1445148972125,86],[1445148972645,86],[1445148972877,86],[1445148973085,86],[1445148973357,86],[1445148973741,86],[1445148974573,18],[1445148974837,18],[1445148975068,18],[1445148975292,18],[1445148975500,18],[1445148975708,18],[1445148975877,18],[1445148976076,18],[1445148976796,18],[1445148976996,18],[1445148977180,18],[1445148977364,18],[1445148977532,18],[1445148978308,18],[1445148978908,18],[1445148979108,18],[1445148979316,18],[1445148979516,18],[1445148979700,18],[1445148979908,18],[1445148980100,18],[1445148980308,18],[1445148980524,18],[1445148980788,18],[1445148981020,18],[1445148981196,18],[1445148981372,18],[1445148981548,18],[1445148982660,18],[1445148982868,18],[1445148983044,18],[1445148983204,18],[1445148985116,86],[1445148985380,86],[1445148985612,86],[1445148985852,86],[1445148988916,18],[1445148989163,18],[1445148989379,18],[1445148989972,18],[1445148990611,18],[1445148990795,18],[1445148990964,18],[1445148991139,18],[1445148991323,18],[1445148991524,18],[1445148991731,18],[1445148991923,18],[1445148992107,18],[1445148992915,18],[1445148993115,18],[1445148993283,18],[1445148993475,18],[1445148993651,18],[1445148993837,18],[1445148994307,18],[1445148994836,86],[1445148995212,86],[1445148995467,86],[1445148995723,86],[1445148995963,86],[1445148996267,86],[1445148997195,86],[1445148997459,86],[1445148997651,86],[1445148997835,86],[1445148998667,86],[1445148998875,86],[1445148999067,86],[1445148999259,86],[1445148999459,86],[1445148999675,86],[1445148999867,86],[1445149000083,86],[1445149000555,86],[1445149001164,86],[1445149001348,86],[1445149001563,86],[1445149001763,86],[1445149001955,86],[1445149003339,18],[1445149003547,18],[1445149003723,18],[1445149003891,18],[1445149004059,18],[1445149004275,18],[1445149004891,86],[1445149005427,86],[1445149005931,18],[1445149006130,18],[1445149006354,18],[1445149006971,86],[1445149007419,86],[1445149007875,18],[1445149008195,18],[1445149008443,18],[1445149008658,18],[1445149008811,86]];
      keys_pressed = JSON.stringify(keys_pressed);
      keys_pressed = JSON.parse(keys_pressed);

      sb_no = 0;
      sb_html = '';
      line = '';
      dg_no = 1;
      char_name = '';
      current_key = 0;
      for(index = 0; index < keys_pressed.length; index++) { 
 	  
    	  /* Initial Delay */
        delay = -2800;

    	  if(index > 0) {
    	    delay = keys_pressed[index][0] - keys_pressed[index-1][0];
    	  }
    	  global_time += delay;

        key = keys_pressed[index][1];

        /*
        // DEBUG - OFF
        if(talk_key_char_sb[key] != undefined) {

          char_name = Object.keys(talk_key_char_sb[key]);
          
          sb_no = talk_key_char_sb[key][char_name];

          line = dialogue[1][dg_no][char_name];

          sb_html = '<b>' + ucwords(char_name) + '</b>: ' + line;

          dg_no++;

        } else {
          $('.sb').css('display','nonoe');
        }
        */

        /* 
        This is the best way to pass a variable to a Timeout function.
        1st argument is the function name. 
        2nd argument is the time.
        3rd argument is the parameter 
        Notice how keys_pressed[index][1] needs to be converted to one variable 'key'
        It's neater and probably the only way it works.
        */
        vars = [];
        vars['key'] = key;
        vars['line'] = line;
        vars['sb_no'] = sb_no;
        vars['sb_html'] = sb_html;
    	  setTimeout(simulateKeyPress, global_time, vars);

    	}	

    }
    
  });

  /* Volume Control */
  $('#volume_plus').click(function(){
    // Make it gradual plus
    episode1Sound.setVolume(100);
  });

  $('#volume_minus').click(function(){
    // Make it gradual minus
    episode1Sound.setVolume(10);
  });
  
  var canvas_tmp;
  
  /*
  // Get below working perhaps for next version of RD
  // or any other cartoon show (i.e Food Police).
  $('#zoom').click(function(){
    ctx.save();
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.translate(-300,-1500);
    ctx.scale(5,5);
    ctx.drawImage(canvas, 0, 0);
  });
 
  $('#wide').click(function(){
    // ALERT: Still not going back to WID, images missing.
    ctx.restore();
    // Clear Canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    cliff.charCommands(ctx, {'talk':[]});
    roy.charCommands(ctx, {'talk':[]});
  });
  */
  
});

$(document).keydown(function(e) {
	
	var d = new Date();
	
	if($('#record').val() != 'record') {
	  keys_pressed[i] =  new Array(d.getTime(), e.which);
  }

	i++;

  //alert(e.which);

  if($('#command_prompt').css('display') == 'block') {
    if($('#prompt').val().toLowerCase() == 'play the restless days 1'
       && commandPrompt.commandFound('play the restless days 1') 
       && e.which == 13) {
      $('command_play').css('display','block');
      $('line_off').css('display','block');
      setTimeout(function() { $('#play_back').click() }, 1000);
    }
  }

  if($('#gui').css('display') == 'block') {
					
    switch(e.which) {
      case 27: // Escape key - Go back to Command Line
        $('#gui').css('display','none');
        $('#command_prompt').css('display','block');
        // ALERT: Sound BUGS WILL BE ANNOYING!!!! Watch out!!!!
        episode1Sound.pause();
        break;
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

      case 89: // y key - Char2 up
        roy.charCommands(ctx, {'move':["'up'"]});
        break;
      
      case 72: // h key - Char2 down
        roy.charCommands(ctx, {'move':["'down'"]});
        break;

      case 71: // g key - Char2 left
        roy.charCommands(ctx, {'move':["'left'"]});
        break;
      
      case 74: // j key - Char2 right
        roy.charCommands(ctx, {'move':["'right'"]});
        break;

      case 86: // v key - Char2 talk
        roy.charCommands(ctx, {'talk':[]});
        break;

      case 66: // b key - Char2 sit
        roy.charCommands(ctx, {'sit':[]});
        break;

      default: return; // exit this handler for other keys
    }
    e.preventDefault(); // prevent the default action (scroll / move caret)

  }
    
});

function doMouseDown(event){
  x = event.pageX - canvas.offsetLeft;
  y = event.pageY - canvas.offsetTop;
  alert(x + ':' + y);
  //ctx.translate(x,y);
}

/**
 * @author Joseph Lenton - PlayMyCode.com
 *
 * @param first An ImageData character from the first image we are colliding with.
 * @param x The x location of 'first'.
 * @param y The y location of 'first'.
 * @param other An ImageData character from the second image involved in the collision check.
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