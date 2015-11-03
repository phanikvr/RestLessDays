<?php
/**
 * Game Home file.
 */
$app_title = "T H E &nbsp;R E S T L E S S &nbsp;D A Y S";
include("include/general.inc.php");
include("include/header_basic.php");
?>
<br /><br />
<h1 style="text-align: center">S I T E  &nbsp;U N D E R &nbsp;C O N S T R U C T I O N</h1>
<!--
./images/chars/phil/front-standing-mouth-closed.png
./images/chars/ledge/front-standing-mouth-closed.png
-->

  <canvas width="500" height="500" id="canvas_set"></canvas>
  <br />
  <div id="controls">
    <input id="record" type="button" value="RECORD" />
    <input id="play_back" type="button" value="PLAY" />
    <input id="zoom" type="button" value="ZOOM" />
    <input id="wide" type="button" value="WIDE" />
  </div>
  <br />
<?
include("include/footer_basic.php");
?>
