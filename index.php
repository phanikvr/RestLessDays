<?php
/**
 * Game Home file.
 */
$app_title = "T H E &nbsp;R E S T L E S S &nbsp;D A Y S";
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
      <canvas width="400" height="400" id="canvas_set">dfsdjfj sdfsdf</canvas>  
    </div>

    <div id="command_prompt" class="channel">
        <div style="float: left;height:400px; width:400px;overflow-y:scroll">
            <div class="line">admin> Type "instructions" to see the game instructions or if you know them start typing your commands :)</div>
            <!-- id="prompt" is used because there will only ever be one current prompt. -->
            <div class="line">prompt> <input id="prompt" name="prompt" type="text" value="" /></div>
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
      <input id="power_button" type="button" value="ON" />
      <!--     
      CH<span id="channel_number">1</span>
      <input id="channel_plus" type="button" value="Ch +" />
      <input id="channel_minus" type="button" value="Ch -" />
      -->
      <input id="volume_plus" type="button" value="V +" />
      <input id="volume_minus" type="button" value="V -" />
      <div id="ft_player_logo"><div id="ft_player_logo_img"></div>Player</div>
    </div>
</div>

<br /><br />
<b>IMPORTANT NOTES/TASKS</b><br />
- Do a 'clear' command.<br />
- <b>Make money! even if it's one dollar $$$$</b><br />
- SOUND BUGS WILL BE ANNOYING > Watch out for them. TEST and RE-TEST Sound Usage!!!!!<br />
- Perhaps the game shuts down automatically after 5minutes of play with a msg like 
     "prompt>Rest and enjoy life! Shutting down..." [then it actutally goes black screen]
- .click() functionality isn't the same as a BUTTON PRESS. The Play button and it's onclick equivalent aren't producing
  the same action!!! (Cartoon movements are wrong)<br />
- Do MINUS -channel functionality.<br />
- Put "TV Coloured Lines" Init in the Channel 1 content.<br />
- Get local version of Javascript Library<br/ >
- Put a new Channel DIV "channel_3" > Hey YOU (with add comment input)<br />
- Work on the Channel "+ -" functionality.<br />
- Finish the "CHx" channel number functionality.<br />
- Finish Volume "+ -"<br />
- Each Game can scale from w:500px h:500px to smaller. So you can create a mini-app for other websites.<br />
- Soundtrack - Dreammaker with Intro OR On the town<br />
- GET RID Of STOP button and makes PLAY Turn into REFRESH perhaps.<br />
- 2nd Show: Cliff has arisen from his bed. Mimi meets him. They leave together. He stares
at his room one last time "One year. Good bye Room!"<br />
- ALERT!!! You might put a message on the Computer Games that have sound, that sound is 
used (High Volume may be annoying).<br />
- ALERT!!! Sound may be an issue. Sound bugs can be annoying.<br />

  <br />
  <div id="controls">
    <input id="record" type="button" value="RECORD" />
    <input id="play_back" type="button" value="PLAY" />
    <input id="zoom" type="button" value="ZOOM" />
    <input id="wide" type="button" value="WIDE" />
  </div>
  <br />

  <div class="gossip_section">
    <h2>DEMO GAME</h2>
    The Restless Days is an Interactive Soap Opera Game.<br />
    Help create the next show. Questions and Statements are welcome :)<br />
    Great Gossip will be highlighted <span class="great_question">green</span> by our administrators.
    If you submit an entry that becomes highlighted, we will let you know by email too (if you leave your email).
    Highlighted Comments will always appear at the top of the pile.
    Please note that for now there is no user account on this website (i.e. you don't have to log in etc.).
    <br />
    PRESS <b>PLAY</b><br />
    Help fund the next show.<br />
    <h3>Public Individuals</h3>
    <input type="submit" value="Pay $1" onclick="javascript: alert('Coming Soon!');" />
    You can enter comments (until 12am that day for three days) and a random selection of 100 people will have and their name & city scroll on the credits of the next show.
    Users that Pay $1 don't have to see the Ad (they have the option to turn it on/off).
    <br />
    <b class="great_question">OR $10 per one month (PAYPAL).</b>
    <br />
    <h3>For Companies</h3>
    <input type="submit" value="Pay $50 + Company Logo" onclick="javascript: alert('Coming Soon!');" />
    And the logo will be shown randomnly to the whole world on the TV monitor that appears in most scenes!
    (e.g. the monitor in the hospital room). It will be a link that opens a new tab to your desired company URL.<br />
    <br />
    Email (optional): <input type="text" value="Your Email" /><input type="submit" value="Generate Code" /><br />
    Nick Name: <input type="text" name="nick_name" value="" size="10" /><br />
    Comment (Max 120chars): <input type="text" name="comment" size="60" maxlength="120" /><br />
    Code: <input type="text" name="code" value="Enter Code in Email" /><br />
    <input type="submit" value="submit" /><br />
    <input type="submit" value="Renew another Day! (2 days left)" /><br />
    (If you don't renew, your usage will end at 12am tonight).<br/ ><br />
    <b class="great_question">Comments Section like Twitch TV >> Views - Commenters etc.
    Copy the feed on the right hand side:
    <ul>
      <li>[some-nic]: comment // scrolling upwards</li>
      <li>Send a Message Prompt // At the bottom with [submit] button.</li>
      <li>You can choose the colour of your text perhaps</li>
      <li>If your comment is good, it gets highlighted by the administrator.</li>
    </ul>
    </b><br />
    <br /><br />
    POTENTIAL FUTURE FUNCTIONALITY: Typing things like "Move left and say 'Hello'" in text prompt and the character does it.
    It might be too much functionality but it could be for advanced users.

<br />
    <input type="button" value="INSERT COIN $1" /><br />
    Every time you go to Comments OR Hey YOU Tabs DO "BLURRED LINES" Intro like JOBS movie then cut to green text below.<br />
    Do Automatic Scroll below.<br />
    <b>IMPORTANT NOTE: No Numbers allowed in the comments and NO unknown words << For Security reasons.</b>
    <br />   
    <div style="background-color: #000000; width: 400px"> 
        <br />
        &nbsp;&nbsp;<input id="comment" name="comment" type="text" value="" size="30" /> <input type="submit" value="C" />
        <br/ >
        <div style="float: left;height:200px; width: 200px; overflow-y:scroll;overflow-x:hidden;">
        <div class="gossip">Questions must have at least one question mark "?".</div>
        <div class="gossip"></div>
        <div class="gossip"><b>YOU ></b> Who is Cliff?</div>
        <div class="gossip"><b>PUBLIC ></b> <b>Who is Cliff? ></b> Cliff is the owner of Cliff Creations</div>
        <div class="gossip"><b>YOU ></b> Is he a designer?</div>
        <div class="gossip"><b>PUBLIC ></b> <b>Is he a designer? ></b> Yeah he is.</div>
        <div class="gossip"><b>YOU ></b> <b>Replied ></b> He slipped on a peanut <b>> TO > SomeNic2 ></b> Why is he in hospital?</div>
        <div class="gossip"></div>
        </div>
        <div style="float: left;height:200px; width: 200px; overflow-y:scroll;overflow-x:hidden;">
        <div class="gossip"><b>PUBLIC ></b> <b>Who is Cliff? ></b> Cliff is the owner of Cliff Creations</div>
        <div class="gossip"><b>YOU ></b> Is he a designer? <input type="button" name="c" value="A" onclick="javascript: $('#comment').val('Is he a designer? ');" /></div>
        <div class="gossip"><b>PUBLIC ></b> <b>Is he a designer? ></b> Yeah he is.</div>
        <div class="gossip"><b>YOU ></b> <b>Replied ></b> He slipped on a peanut <b>> TO > SomeNic2 ></b> Why is he in hospital?</div>
        <div class="gossip"></div>
        </div>
    </div>
    <br style="clear:both" />
 </div>
  <input id="play_back" type="button" value="PLAY" />


<?php
include("include/footer_basic.php");
?>
