<?php
set_time_limit(0);
ini_set('max_execution_time', 300);
ini_set('memory_limit', -1);
ini_set('display_errors', 1);
error_reporting(E_ALL);

$ACTION = false;
if (isset($_GET['action'])) {
	$ACTION = $_GET['action'];
}

require_once './c-vps.php';

?>


<html>
    <head>
        <link href='http://fonts.googleapis.com/css?family=Salsa' rel='stylesheet' type='text/css'>
        <style>
            *{
                //font-family: Verdana, Geneva, sans-serif;
                //font-family: Comic sans ms;
                font-family: 'Salsa', cursive;
                font-size:14px;
            }
        </style>
        <link href="bootstrap.css" rel="stylesheet" >
        <link href="style.css" rel="stylesheet" >

    </head>
    <body>
        <div class="container">
        <div class="span12 row-fluid" style="border: 1px solid #e5e5e5;padding: 10px;margin-bottom: 2px;background: cornsilk;">
  <div class="span12">
    <a href="index.php">
    <h2>Scraped Crops</h2>
    </a>
  </div>
</div>
            <?php
if ($ACTION === false) {
	require_once "page-index.php";
} else if ($ACTION === 'show_website') {
	require_once "page-website.php";
}
?>
        </div>
    </body>
</html>

