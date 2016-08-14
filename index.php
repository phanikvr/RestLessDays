<?php
/**
 * Game Home file.
 */
$app_title = "F T - P l a y e r";
#include("include/general.inc.php");
include("include/header_basic.php");
?>
<!--
<h1 style="text-align: center">S I T E  &nbsp;U N D E R &nbsp;C O N S T R U C T I O N</h1>
--
<!--
./images/chars/phil/front-standing-mouth-closed.png
./images/chars/ledge/front-standing-mouth-closed.png
-->
<div id="screen">
    
    <div id="channel_off" class="channel">
    </div>
    <div id="gui" class="channel">
      <!-- The Canvas width/height can shrink for external website integration -->
      <div style="margin-left:100px;margin-top:200px;border: 1px solid #000000;padding: 10px;position: absolute;z-index:2">Cliff, your back!</div>
      <canvas width="400" height="400" id="canvas_set"></canvas>  
      
    </div>

    <div id="command_prompt" class="channel">
        <div style="float: left;height:400px; width:400px;overflow-y:scroll">
            <div class="line">admin> To play "The Restless Days" game<br />
            type the following in the prompt:<br />
            play The Restless Days<br />
            type the following to play other games:<br />
            play [name-of-game]<br /></div>
            <!-- id="prompt" is used because there will only ever be one current prompt. -->
            <div class="line">prompt><input id="prompt" name="prompt" type="text" value="" /></div>
            <!--
            <div class="line">command not found</div>
            <div class="line">loading...</div>
            -->
        <!--
        <div class="line">admin> Did you think that Cliff was an interesting character? y/n</div>
        <div class="line">prompt> <input name="prompt" type="text" value="Y" /></div>
        <div class="line">admin><br />70% of the public are currently saying 'YES' to  'Do you think that Cliff was interesting?'</div>
        <div class="line">admin> Did you think that Cliff was an interesting character? y/n</div>
        <div class="line">prompt> <input name="prompt" type="text" value="show statistics" /></div>
        <div class="line">admin><br />
        70% of the public are currently saying 'YES' to  'Do you think that Cliff was interesting?'<br />
        20% of the public are currently saying 'YES' to  'Do you think that Roy was interesting?'</div>
        <div class="line">prompt> <input name="prompt" type="text" value="show comments all" /></div>
        <div class="line">admin><br />
        sydney | This is a crap game<br />
        melbourne | This is a crap game<br />
        sydney | This is a crap game<br />
        sydney | This is a crap game<br />
        New York | This is a crap game<br />
        New York | This is a crap game<br />
        Ontario | This is a crap game<br />
        </div>
        <div class="line">prompt> <input name="prompt" type="text" value="show comments sydney" /><br />
        sydney | This is a crap game<br />
        sydney | This is a crap game<br />
        sydney | This is a crap game<br />
        sydney | This is a crap game<br />
        sydney | This is a crap game<br />
        sydney | This is a crap game<br />
        sydney | This is a crap game<br />
        </div>
        sdfsfsdf<br />
        sdfsdf<br />
        -->
        </div>
    </div>

    <div id="channel_3" class="channel">
        <div style="float: left;height:400px; width:400px; overflow-y:scroll;overflow-x:hidden;">
            <div class="gossip">CH3 - Questions must have at least one question mark "?".</div>
            <div class="gossip"></div>
            <div class="gossip"><b>YOU ></b> Who is Cliff?</div>
            <div class="gossip"><b>PUBLIC ></b> <b>Who is Cliff? ></b> Cliff is the owner of Cliff Creations</div>
            <div class="gossip"><b>YOU ></b> Is he a designer?</div>
            <div class="gossip"><b>PUBLIC ></b> <b>Is he a designer? ></b> Yeah he is.</div>
            <div class="gossip"><b>YOU ></b> Who is Cliff?</div>
            <div class="gossip"><b>PUBLIC ></b> <b>Who is Cliff? ></b> Cliff is the owner of Cliff Creations</div>
            <div class="gossip"><b>YOU ></b> Is he a designer?</div>
            <div class="gossip"><b>PUBLIC ></b> <b>Is he a designer? ></b> Yeah he is.</div>
            <div class="gossip"><b>YOU ></b> Who is Cliff?</div>
            <div class="gossip"><b>PUBLIC ></b> <b>Who is Cliff? ></b> Cliff is the owner of Cliff Creations</div>
            <div class="gossip"><b>YOU ></b> Is he a designer?</div>
            <div class="gossip"><b>PUBLIC ></b> <b>Is he a designer? ></b> Yeah he is.</div>
            <div class="gossip"><b>YOU ></b> Who is Cliff?</div>
            <div class="gossip"><b>PUBLIC ></b> <b>Who is Cliff? ></b> Cliff is the owner of Cliff Creations</div>
            <div class="gossip"><b>YOU ></b> Is he a designer?</div>
            <div class="gossip"><b>PUBLIC ></b> <b>Is he a designer? ></b> Yeah he is.</div>
        </div>
    </div>

    <div class="ft_player_controls">
      <!-- <input type="button" value="ON" /> -->
      <!--     
      CH<span id="channel_number">1</span>
      <input id="channel_plus" type="button" value="Ch +" />
      <input id="channel_minus" type="button" value="Ch -" />
      -->
      <input id="power_button" type="button" value="PAYPAL $1 TO PLAY" />
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      <input id="volume_plus" type="button" value="V +" />
      <input id="volume_minus" type="button" value="V -" />
      <div id="ft_player_logo"><div id="ft_player_logo_img"></div> Player</div>
    </div>
</div>
<input id="play_back" type="button" value="PLAY" />
<?php
include("include/footer_basic.php");
?>
