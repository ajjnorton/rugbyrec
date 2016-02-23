<?php

require_once("includes/class_Database.php");
require_once("includes/class_pics.php");

$database = new MySQLDatabase();

	


		
$action = $_GET['action'];
$player = $_GET['player'];
$matches = $_GET['matches'];
$caption = $_GET['caption'];
$comments = $_GET['comments'];
$slider_flag = $_GET['slider_flag'];
$id = $_GET['id'];
//$qty = $_GET['qty'];

/** for testing **/
//$action ="find_no_of_slider_pics";

//$player = "Andrew Higgins 2";
//$caption = "Heinekin Cup 1998 2";
//$match = "test match 2";
//$comments = "some comments 2";
//$id=598;



if ($action==="delete_a_picture"){

	
	$player_array = Pics::delete_a_picture($id);
}



if ($action==="update_picture_details"){
	$player_array =Pics::update_picture_details($id, $player, $caption, $matches, $comments, $slider_flag);
}



if ($action==="find_all_pictures"){

	$player_array=array();
	$player_array = Pics::find_all_pictures();
	
		foreach($player_array as $key => $val){
		//echo basename($val['filePath']).'<br>';
		// replace the filePath values with only the base name
		$player_array[$key]['filePath']=basename($val['filePath']);
	}
	
	echo json_encode($player_array);
	
}


if ($action==="find_no_of_slider_pics"){
    
	$slider_qty = Pics::find_no_of_slider_pics();
    echo json_encode($slider_qty);
    
}



if ($action==="find_players_pictures"){

	$player_array=array();
	$player_array = Pics::find_players_pictures($player);
	
		foreach($player_array as $key => $val){
		//echo basename($val['filePath']).'<br>';
		// replace the filePath values with only the base name
		$player_array[$key]['filePath']=basename($val['filePath']);
	}
	
	echo json_encode($player_array);
	
}

if ($action==="get_picture_by_id"){

	$picture_array=array();
	$picture_array = Pics::get_picture_by_id($id);
	
		//foreach(picture_array as $key => $val){
		//echo basename($val['filePath']).'<br>';
		// replace the filePath values with only the base name
		//$player_array[$key]['filePath']=basename($val['filePath']);
	   //}
	
	echo json_encode($picture_array);
	
}



if ($action==="find_match_pictures"){

	$match_array=array();
	$match_array = Pics::find_match_pictures($matches);
		
		foreach($match_array as $key => $val){
		//echo basename($val['filePath']).'<br>';
		// replace the filePath values with only the base name
		$match_array[$key]['filePath']=basename($val['filePath']);
	}
	
	echo json_encode($match_array);
	
}

if ($action==="find_random_pictures"){
	$rnd_images_array=array();
	$rnd_images_array = Pics::find_randon_file_path();
	
	foreach($rnd_images_array as $key => $val){
		//echo basename($val['filePath']).'<br>';
		// replace the filePath values with only the base name
		$rnd_images_array[$key]['filePath']=basename($val['filePath']);
	}
	
	echo json_encode($rnd_images_array);
} /** end if **/


if ($action==="find_players"){
	$player_array=array();
	$player_array = Pics::find_players();
	echo json_encode($player_array);
}

if ($action==="find_matches"){
	$match_array=array();
	$match_array = Pics::find_matches();
	echo json_encode($match_array);
}

if ($action==="find_latest_pictures"){
	$base=array();
	
	$base = Pics::test_basename();
	
	foreach($base as $key => $val){
		$val['filePath']=basename($val['filePath']);
		$base[$key]['filePath']=basename($base[$key]['filePath']);
		//echo $base[$key]['filePath']."<br>";
	}
	
	echo json_encode($base);
}

if ($action==="find_latest_gallery_pictures"){
	$base=array();
	
	$base = Pics::find_latest_gallery_pictures();
	
	foreach($base as $key => $val){
		$val['filePath']=basename($val['filePath']);
		$base[$key]['filePath']=basename($base[$key]['filePath']);
		//echo $base[$key]['filePath']."<br>";
	}
	
	echo json_encode($base);
}



?>