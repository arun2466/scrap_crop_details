<?php
require_once 'c-database.php';

class VPS extends DATABASE {

	public static function getWebsites() {
    $q="SELECT * FROM websites";
    $runQuery = self::DBrunQuery($q);
		$rows = self::DBfetchRows($runQuery);

    // echo '<pre>';
    // print_r($rows);
		return $rows;
	}

	public static function getCompleteWebsiteData($id) {
		$return = false;

    $q="SELECT * FROM websites WHERE id=$id";
    $runQuery = self::DBrunQuery($q);
    $return = self::DBfetchRow($runQuery);

  //   $row = $rows = DATABASE::getIdRecord('tewebsolutions', 'websites', $id);
		// $return = $row;



    $plans = self::getWebsitePlans($id);
		$return['plans'] = $plans;
		$return['stats']['count_total_plans'] = sizeof($plans);
		return $return;
	}

	public static function getWebsitePlans($website_id) {

    $q="SELECT * FROM crops WHERE website_id=$website_id";
    $runQuery = self::DBrunQuery($q);
    $rows = self::DBfetchRows($runQuery);

    //   $where = array('website_id' => $website_id);
  		// $rows = DATABASE::getData(false, 'tewebsolutions', 'plans', $where);
		return $rows;

  }

	public static function get_stats() {
		$total_website = 0;
		$total_plans = 0;
		$websites = self::getWebsites();
		foreach ($websites as $key => $website) {
			$web_id = $website['id'];
			$websites_plans = self::getWebsitePlans($web_id);
			$websites[$key]['plans'] = $websites_plans;
			$websites[$key]['stats']['total_plans'] = sizeof($websites_plans);
			$total_plans += sizeof($websites_plans);
		}
		$return = array();
		$return['total_websites'] = sizeof($websites);
		$return['total_plans'] = $total_plans;
		$return['data'] = $websites;
		return $return;
	}
}

new VPS();
?>