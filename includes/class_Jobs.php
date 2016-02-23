<?php 

require_once("class_Database.php");

class Job {
	
	public $sid;
	public $user_id;
	public $active;
	public $job_reference;
	public $external_id;
	public $location;
	public $activation_date;
	public $expiration_date;
	public $sl_media_type;
	public $sl_media_path;
	public $sl_flag;
	public $title;
	public $country;
	public $salary;
	public $salaryType;
	public $jobDescription;
	public $recruitingFor;
	public $sector;
	public $jobRef;
	public $jobType;
	public $companyName;
	
	
	
	public static function num_active_jobs() {
    global $database;
    $object_array = self::select_all_active(1);
	$active_jobs = count($object_array);
	return $active_jobs;
   
  }
  
  public static function select_all_active($switch) {
    global $database;
    $result_set = $database->query("SELECT sid, location, external_id, activation_date FROM listings WHERE active={$switch} AND listing_type_sid=6 ORDER BY activation_Date DESC");
	$object_array = array();
	// go through each record in the rersult set by doing a fetch_array and assign each record to $row
	// fetch_array returns an associatve array that has eys and values.
	while ($row = $database->fetch_array($result_set)){
		//put the new object, created by the static instantiate metod, in the object array
		$object_array[] = self::instantiate($row);
	}
	//returns an array of "job" objects
	$object_array = self::select_listings_properties($object_array);
	return $object_array;
   
  }
  
 public static function select_for_json() {
    global $database;
    $result_set = $database->query("SELECT * FROM rugbyPhotos");
	
	$rowArray = array();
	while($row = mysql_fetch_assoc($result_set)) {
    	array_push($rowArray, $row); 
	}
	return $rowArray;
	

 }
 



	
  
  private static function instantiate($record){
	  //create a new job object
	  $object = new self;
	  //loop through each of the attributes (field names) in the fetched record
	  foreach($record as $attribute=>$value){
		  //does $object have an attribute the same as the current (field name) we are looking at
		  if($object->has_attribute($attribute)){
			  //if it does put the value in the record field in the objects attribute value
			  $object->$attribute = $value;
			  
		  }
	  }
	  
	  return $object;//run list properties?
  }
  
  
  private function has_attribute($attribute){
	  //Get all the object attributes into associateve array object_vars
	  $object_vars = get_object_vars($this);
	  //does the key attribute exist in the array object_vars if so return true
	  return array_key_exists($attribute, $object_vars);
  }
  
  
  public static function select_listings_properties($object_array){ //pass in an object array
  	global $database;
	//echo"<pre>" . print_r($object_array) . "</pre>";
	foreach($object_array as $job){
		$result_set = $database->query("SELECT * FROM listings_properties WHERE object_sid = {$job->sid}");
		while ($row = $database->fetch_array($result_set)){
			if($row["id"]=="Title"){
				$job->title = $row["value"];
			}
			if($row["id"]=="Salary"){
				$job->salary = $row["value"];
			}
			if($row["id"]=="SalaryType"){
				$job->salaryType = $row["value"];
			}
			if($row["id"]=="Sector"){
				$job->sector = $row["value"];
			}
			if($row["id"]=="JobType"){
				$job->jobType = $row["value"];
			}
			//if($row["id"]=="JobDescription"){
				//$job->jobDescription = substr($row["value"],0,100);
			//}
		}

	}
	return $object_array;
	
	
	
  }
  
  
	
	
}
?>