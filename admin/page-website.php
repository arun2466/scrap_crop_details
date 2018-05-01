<?php
// print_r($_GET);
$website_id = $_GET['id'];

$data = VPS::getCompleteWebsiteData($website_id);

// echo '<pre>';
// print_r( $data );

// echo $website_id;
?>


<div class="parent_div">
<div class="main_div span12 row-fluid" style="border: 1px solid #e5e5e5;padding: 10px;margin-bottom: 2px;">
<div class="span4">
<h4>Website : <?php echo $data['website']; ?></h4>
<?php
echo "Total Plans:: " . $data['stats']['count_total_plans'] . '<br>';
?>
</div>
<div class="span5">

</div>
<div class="span2">

</div>
</div>

</div>


 <div class="parent_div">
    <div class="main_div span12 row-fluid" style="border: 1px solid #e5e5e5;padding: 10px;margin-bottom: 2px;">
        <div class="span12">
            <table class="table table-condensed">
                <thead>
                    <tr>
                        <td>#</td>
                        <td>Crop Name</td>
                        <td>Delivery Start</td>
                        <td>Delivery End</td>
                        <td>Basis Month </td>
                        <td>Future Price</td>
                        <td>Basis</td>
                        <td>Cash Price</td>
                        <td>Future Change</td>
                    </tr>
                </thead>
            <?php
$count = 0;
foreach ($data['plans'] as $plan) {
	$count++;
	// $website_link = "index.php?action=show_website&id=".$website['id'];
	// $time = $plan['time'];
	// $time_beauty = "";
	// if ($time != "") {
	// 	$time = $time / 1000;
	// 	$time_beauty = date('d-M-Y H:i:s', $time);
	// }

	?>
                    <tr>
                        <td>
                            <?php echo $count; ?>.)
                            <span style="font-size:12px">
                              <!-- Updated On : <?php echo $time_beauty; ?> -->
                              </span>
                        </td>
                        <td>
                            <?php echo $plan['crop_name']; ?>
                        </td>
                        <td>
                            <?php echo $plan['delivery_start']; ?>
                        </td>
                        <td>
                            <?php echo $plan['delivery_end']; ?>
                        </td>
                        <td>
                            <?php echo $plan['basis_month']; ?>
                        </td>
                        <td>
                            <?php echo $plan['future_price']; ?>
                        </td>
                        <td>
                            <?php echo $plan['basis']; ?>
                        </td>
                        <td>
                            <?php echo $plan['cash_price']; ?>
                        </td>
                        <td>
                            <?php echo $plan['future_change']; ?>
                        </td>

                    </tr>
                    <?php
}
?>
            </table>
        </div>
    </div>

</div>