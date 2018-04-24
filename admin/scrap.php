<?php

  $SHOW_ERROR = true;
  if( $SHOW_ERROR ){
      error_reporting(E_ALL);
      ini_set('display_errors', 1);
  } else{
      error_reporting(0);
      ini_set('display_errors', 0);
  }

  require_once('c-generic.php');
  require_once('c-database.php');
  require_once('phpQuery-onefile.php');
  // sites




  $cropsUrls = array();
  $cropsUrls['fceisabel'] = "http://www.fceisabel.com/pages/custom.php?id=26785";




  foreach ($cropsUrls as $website => $webUrl) {
    $html = GENERIC::getHtmlOfUrl( $webUrl );

    $site_filePath = "sites/$website.php";

    require_once($site_filePath);

    $obj = '';
    $obj = new $website();
    $scrapedCrops = $obj->getCropDetails( $html);


    echo $scrapedCrops;
  }


?>