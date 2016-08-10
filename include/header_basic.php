<?php
/**
 * The Header Basic Include File (a bare necessities header).
 */
?>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">
<html>
<head>
  <title><?php print $app_title;?></title>
  <meta name="description" content="Film Reviews and Computer Games" />
  <link rel="stylesheet" type="text/css" href="./css/style.css" />
  <!--
  <script src="//ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min.js"></script>
  <script src="./js/core.js?<?=substr( md5(rand()), 0, 7);?>" type="text/javascript" charset="utf-8"></script>
  -->
  <script src="./js/jquery-2.1.1.min.js"></script>
  <script src="./js/code-do-not-upload.js?<?php print substr( md5(rand()), 0, 7); ?>" type="text/javascript" charset="utf-8"></script>
  <script src="./js/buzz.min.js" type="text/javascript" charset="utf-8"></script>
  <script src="./js/game.js"></script>
</head>
<body>
<!--
<header style="background-color:#EAEAEA;padding: 4px; height: 50px">
  <a style="float: left" id="logo" href="/"><img width="50" src="./images/logo_small_green_navy_filmtronic.png" /></a>
  <div class="app_title">&nbsp;&nbsp;<?php print $app_title;?></div>
--> 
  <!--
  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
  <input id="back" type="button" value="< B A C K" />
  &nbsp;&nbsp;
  <input id="instructions" type="button" value="I N S T R U C T I O N S" />
  &nbsp;&nbsp;
  -->
  <!--
  &nbsp;&nbsp;
  <input id="zoom" type="button" value="ZOOM" />
  &nbsp;&nbsp;
  <input id="wide" type="button" value="WIDE" />
  &nbsp;&nbsp;
  <input id="refresh" type="button" value="R E F R E S H" />
  &nbsp;&nbsp;
  -->
  <!-- <input id="record" type="button" value="RECORD" /> -->
    
</header>