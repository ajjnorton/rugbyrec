<?php

require_once("includes/class_Database.php");
require_once("includes/class_pics.php");

$database = new MySQLDatabase();


$object_array=array();
$object_array = Pics::find_captions();

echo json_encode($object_array);


?>