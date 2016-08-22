<?php
/**
 * Game Home file.
 */
$app_title = "F T - P l a y e r";
#include("include/general.inc.php");
include("include/header_basic.php");

echo "http referer:" . $_SERVER["HTTP_REFERER"] . "<br />";
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
      <div style="height: 2px;width: 10px;font-size: 14px;margin-left:212px;margin-top:249px;border-bottom-style:none;border: 1px solid #86826C;border-width: 0px 1px 1px 1px;padding: 5px;position: absolute;z-index:2;color:#86826C;"></div>
      <div style="height: 2px;width: 131px;font-size: 14px;margin-left:233px;margin-top:249px;border-bottom-style:none;border: 1px solid #86826C;border-width: 1px 0px 0px 0px;padding: 5px;position: absolute;z-index:2;color:#86826C;"></div>
      <div style="height: 120px;width: 150px;font-size: 14px;margin-left:212px;margin-top:118px;border: 1px solid #86826C;border-bottom-width: 0px;padding: 5px;position: absolute;z-index:2;color:#86826C;">Roy: <b>Cliff, your back! Text text text text text text.</b></div>
      
      <div style="height: 2px;width: 10px;font-size: 14px;margin-left:24px;margin-top:249px;border-bottom-style:none;border: 1px solid #86826C;border-width: 0px 1px 1px 1px;padding: 5px;position: absolute;z-index:2;color:#86826C;"></div>
      <div style="height: 2px;width: 131px;font-size: 14px;margin-left:46px;margin-top:249px;border-bottom-style:none;border: 1px solid #86826C;border-width: 1px 0px 0px 0px;padding: 5px;position: absolute;z-index:2;color:#86826C;"></div>
      <div style="height: 120px;font-size: 14px;margin-left:24px;margin-top:118px;border: 1px solid #86826C;border-bottom-width: 0px;padding: 5px;position: absolute;z-index:2;color:#86826C;">Cliff: <b>What about it.</b></div>

      <!-- <div style="height: 4px;font-size: 14px;width: 10px;margin-left:10px;margin-top:240px;border: 1px solid #86826C;padding: 5px;position: absolute;z-index:2;color:#86826C;"></div>-->
      <canvas width="400" height="400" id="canvas_set"></canvas>  
      
    </div>

    <div id="command_prompt" class="channel">
        <div style="float: left;height:400px; width:400px;overflow-y:scroll">
            <div class="line">admin> Thank you for purchasing access to this game.
            You can keep playing as long as you keep this Browser Tab open.<br />
            The command to play the first episode of the restless days is:<br />
            play the restless days 1<br />
            type the following to play other games:<br />
            play [name-of-game] [episode-number]<br /></div>
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
      <input id="power_button" type="button" value="PayPal $1 to Play" />
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      <input id="volume_plus" type="button" value="V +" />
      <input id="volume_minus" type="button" value="V -" />
      <div id="ft_player_logo"><div id="ft_player_logo_img"></div> Player</div>
      <form id="paypal_form" action="https://www.paypal.com/cgi-bin/webscr" method="post" target="_top">
        <input type="hidden" name="cmd" value="_s-xclick">
        <input type="hidden" name="hosted_button_id" value="LJX3TBDZP83HU">
        <input type="image" src="https://www.paypalobjects.com/en_AU/i/btn/btn_buynowCC_LG.gif" border="0" name="submit" alt="PayPal – The safer, easier way to pay online!">
        <img alt="" border="0" src="https://www.paypalobjects.com/en_AU/i/scr/pixel.gif" width="1" height="1">
      </form>
    </div>



</div>
<input id="play_back" type="button" value="PLAY" />
<?php
include("include/footer_basic.php");
?>
