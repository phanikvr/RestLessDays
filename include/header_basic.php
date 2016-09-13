<?php
/**
 * The Header Basic Include File (a bare necessities header).
 */
$title = "FT - Film Reviews and Computer Games";
?>
<!DOCTYPE html>
<html>
<head>
  <title><?php print $title;?></title>
  <meta name="description" content="Film Reviews and Computer Games" />
  <link rel="stylesheet" type="text/css" href="./css/style.css" media="screen" />
  <script src="./js/jquery-2.1.1.min.js"></script>
  <!--
  <script src="./js/core.js?<?php// print substr( md5(rand()), 0, 7); ?>" type="text/javascript" charset="utf-8"></script>
  -->
  <script src="./js/dialogue.js?<?php print substr( md5(rand()), 0, 7); ?>" type="text/javascript" charset="utf-8"></script>  
  <script src="./js/code-do-not-upload.js?<?php print substr( md5(rand()), 0, 7); ?>" type="text/javascript" charset="utf-8"></script>
  <script src="./js/buzz.min.js" type="text/javascript" charset="utf-8"></script>
  <script src="./js/game.js"></script>
</head>
<body>
<header style="background-color:#EAEAEA;padding: 4px; height: 30px">
  <a name="top"></a>
  <a style="float: left" id="logo" href="/"><img width="30" src="./images/logo_small_green_navy_filmtronic.png" /></a>
  <a id="top_logo_text" href="/"><img border="0" width="150" style="float: left;vertical-align: top; margin-left: 10px;" src="/images/logo_text_navy_green_filmtronic.png" /></a>
      <div id="tm_header_symbol">&reg;</div>
  <div class="logo_small_text">&nbsp;&nbsp;Film Reviews and Computer Games</div>
  &nbsp;&nbsp;
  <div class="top_links">
    <?php if($_SERVER["PHP_SELF"] == "../about-us.php") { ?><b class="navy">About Us</b><?php } else {?><a href="../about-us.php">About Us</a><?php }?>
    &nbsp;&nbsp;
    <?php if($_SERVER["PHP_SELF"] == "../how-it-works.php") { ?><b class="navy">How it Works</b><?php } else {?><a href="../how-it-works.php">How it Works</a><?php }?>
  </div>
  <div class="app_title">&nbsp;&nbsp;<?php # print $title;?></div>
</header>
