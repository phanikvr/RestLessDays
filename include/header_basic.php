<?php
/**
 * The Header Basic Include File (a bare necessities header).
 */
?>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">
<html>
<head>
  <title>FT - <?php print $app_title;?></title>
  <meta name="description" content="Filmtronic: Short Films/Series & Digital Media Production">
  <link rel="stylesheet" type="text/css" href="./css/style.css" media="screen" />
  <script src="//ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min.js"></script>
  <script src="./js/core.js?<?=substr( md5(rand()), 0, 7);?>" type="text/javascript" charset="utf-8"></script>
  <script src="./js/buzz.min.js" type="text/javascript" charset="utf-8"></script>
  <script src="./js/game.js"></script>
</head>
<body>
<header style="background-color:#EAEAEA;padding: 4px; height: 50px">
  <a style="float: left" id="logo" href="http://www.filmtronic.com"><img width="50" src="./images/logo_small_green_navy_filmtronic.png" /></a>
  <div class="app_title">&nbsp;&nbsp;<?php print $app_title;?></div>
</header>