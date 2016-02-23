<?php

require_once("config.php");
	

class User {
	
	public $id;
	public $username;
	public $password;
	public $first_name;
	public $last_name;
	
	public static function find_all(){
		global $database;
	}
	
	public static function find_by_id($id){
	}
}
?>