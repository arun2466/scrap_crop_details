<?php
$stats = VPS::get_stats();
?>


             <div class="parent_div">
                <div class="main_div span12 row-fluid" style="border: 1px solid #e5e5e5;padding: 10px;margin-bottom: 2px;">
                    <div class="span4">
                        <h4>Stats</h4>
                        <?php
echo "Total Websites :: " . $stats['total_websites'] . '<br>';
echo "Total Plans:: " . $stats['total_plans'] . '<br>';
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
                                    <td>Name</td>
                                    <td>Url</td>
                                    <td>Url Plans</td>
                                    <td>Total Plans</td>
                                    <td>Actions</td>
                                </tr>
                            </thead>
                        <?php
$count = 0;
foreach ($stats['data'] as $website) {
	$count++;
	// print_r($website);
	$website_page = "index.php?action=show_website&id=" . $website['id'];

	$website_url = $website['website_url'];
	$website_url_plans = $website['crops_url'];

	?>
                                <tr>
                                    <td>
                                        <?php echo $count; ?>
                                    </td>
                                    <td>
                                        <?php echo $website['website']; ?>
                                    </td>
                                    <td>
                                        <a href="<?php echo $website_url; ?>" target="_BLANK"><?php echo $website_url; ?></a>
                                    </td>
                                    <td>
                                        <a href="<?php echo $website_url_plans; ?>" target="_BLANK"><?php echo $website_url_plans; ?></a>
                                    </td>
                                    <td>
                                        <?php echo $website['stats']['total_plans']; ?>
                                    </td>
                                    <td>
                                        <a href="<?php echo $website_page; ?>">View</a>
                                    </td>
                                </tr>
                                <?php
}
?>
                        </table>
                    </div>
                </div>

            </div>