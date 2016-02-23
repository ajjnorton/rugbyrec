<?php 

require_once("class_Database.php");

class Pics {
	
	public $id;
	public $player;
	//public $match;
	public $caption;
	//public $comments;
	//public $server_file_path;
	
	
	public static function find_all_pictures_as_objects(){
		global $database;
		$object_array = new ArrayObject();
		$sql = "SELECT * FROM rugbyPhotos";
		$result = $database->query($sql);
	
		while($row = mysql_fetch_assoc($result)) {
    		//array_push($players_pictures_array, $row); 
			$object_array->append(self::instantiate($row));
		}
		
		//return json_encode($player_array);
		return $object_array;
	}
	
	private static function instantiate($record){
		$object = new self;
		$object->id = $record["id"];
		$object->player = $record["player"];
		$object->caption = $record["caption"];
		
		return $object;
	}
	
	public static function find_all_pictures(){
		global $database;
		$players_pictures_array = array();
		$sql = "SELECT * FROM rugbyPhotos ORDER BY id DESC";
		$result = $database->query($sql);
	
		while($row = mysql_fetch_assoc($result)) {
    		array_push($players_pictures_array, $row); 
		}
		
		//return json_encode($player_array);
		return $players_pictures_array;
	}
	
	public static function delete_a_picture($id){
		global $database;
		//$players_pictures_array = array();
		//echo "delete a pic ".$id;
		self::get_record_by_id($id);
		$sql = "DELETE FROM rugbyPhotos WHERE id = '$id'";
		$result = $database->query($sql);
		
		//while($row = mysql_fetch_assoc($result)) {
    		//array_push($players_pictures_array, $row); 
		//}
		
		//return json_encode($player_array);
		//return $players_pictures_array;
	}
	
	public static function get_record_by_id($id){
		global $database;
		//echo $id."<br/>";
		//echo "get_record_by_id ".$id;
		$sql = "SELECT * FROM rugbyPhotos WHERE id = '$id'";
		$result = $database->query($sql);
		while($row = mysql_fetch_assoc($result)) {
    		$file_name=basename($row["filePath"]);
			//echo $file_name;
		}
		$file_path="uploads/";
		$thumb_path="thumbs/";
		//echo $file_name."<br/>";
		//echo __DIR__."<br/>";
		if (file_exists($file_path.$file_name)){
			//echo "File exists"."<br/>";
		}else{
			//echo "File does not exists"."<br/>";
			
		}
		if(is_writable($file_path.$file_name)) {
			//echo "File writable"."<br/>";
  			unlink($file_path.$file_name);
			unlink($thumb_path.$file_name);
		} else {
			//echo " File Not writable"."<br/>";
  			// error handling. You can check which condition is failing here
		}
		
		
		//unlink("../uploads/".$file_name);
		//echo $delete;
	}
    
    
    public static function get_picture_by_id($id){
		global $database;
        $picture_array = array();
		$sql = "SELECT * FROM rugbyPhotos WHERE id = '$id'";
		$result = $database->query($sql);
        
		while($row = mysql_fetch_assoc($result)) {
    		array_push($picture_array, $row); 
		}
		
		//return json_encode($player_array);
		return $picture_array;
	
	}
    
     public static function update_picture_details($id, $player, $caption, $match, $comments, $slider_flag){
		global $database;
	
		$sql = "UPDATE rugbyPhotos SET player='$player', caption='$caption', theMatch='$match', comments='$comments', slider_flag=$slider_flag WHERE id = '$id'";
		$result = $database->query($sql);
	
	
	}
	
	public static function find_players_pictures($player_name){
		global $database;
		$players_pictures_array = array();
		$sql = "SELECT * FROM rugbyPhotos WHERE player = '$player_name' ORDER BY id DESC";
		$result = $database->query($sql);
	
		while($row = mysql_fetch_assoc($result)) {
    		array_push($players_pictures_array, $row); 
		}
		
		//return json_encode($player_array);
		return $players_pictures_array;
	}
	
	
	public static function find_match_pictures($match_name){
		global $database;
		
		$match_pictures_array = array();
		$sql = "SELECT * FROM rugbyPhotos WHERE theMatch = '$match_name'";
		$result = $database->query($sql);
	
		while($row = mysql_fetch_assoc($result)) {
    		array_push($match_pictures_array, $row); 
		}
		
		//return json_encode($player_array);
		return $match_pictures_array;
	}
	
	
	public static function select_all() {
    	global $database;
    	$result_set = $database->query("SELECT * FROM rugbyPhotos ORDER BY player");
		$rowArray = array();
		while($row = mysql_fetch_assoc($result_set)) {
    		array_push($rowArray, $row); 
		}
		return $rowArray;
 	}
	
	public static function num_active_pics() {
    	global $database;
    	$assoc_array = self::select_for_json();
		$num_pics = count($assoc_array);
		return $num_pics;
   
  	}
  
  	
	public function create(){
		global $database;
		$sql ="INSERT INTO rugbyPhotos (filePath, player, comments, caption, theMatch)";
		$sql.="VALUES ('$this->server_file_path','$this->player','$this->comments','$this->caption','$this->match')";
		$result = $database->query($sql);
		
		$this->id = $database->insert_id();
	}
  
  
  	public static function find_players(){
		global $database;
		$player_array = array();
		$sql = "SELECT player FROM rugbyPhotos GROUP BY player";
		$result = $database->query($sql);
	
		while($row = mysql_fetch_assoc($result)) {
    		array_push($player_array, $row); 
		}
		
		//return json_encode($player_array);
		return $player_array;
	}
	
	 public static function find_matches(){
		global $database;
		$match_array = array();
		$sql = "SELECT theMatch FROM rugbyPhotos GROUP BY theMatch";
		$result = $database->query($sql);
	
		while($row = mysql_fetch_assoc($result)) {
    		array_push($match_array, $row); 
		}
		
		//return json_encode($player_array);
		return $match_array;
	}
	
	 public static function find_latest_pictures(){
		global $database;
		$latest_pictures_array = array();
		$sql = "SELECT id, filePath, player, caption FROM rugbyPhotos ORDER BY id DESC LIMIT 0,8";
		$result = $database->query($sql);
	
		while($row = mysql_fetch_assoc($result)) {
			
    		array_push($latest_pictures_array, $row); 
		}
		
		//return json_encode($player_array);
		return $latest_pictures_array;
	}
	
	
	/** get pictures for the gallery start up **/
	public static function find_latest_gallery_pictures(){
        
		global $database;
		$latest_pictures_array = array();
		$sql = "SELECT id, filePath, player, caption FROM rugbyPhotos ORDER BY id DESC LIMIT 40";
		$result = $database->query($sql);
	
		while($row = mysql_fetch_assoc($result)) {
			
    		array_push($latest_pictures_array, $row); 
		}
		
		//return json_encode($player_array);
		return $latest_pictures_array;
	}
	
    /** get pictures for the gallery start up **/
	public static function find_images_for_sitemap(){
        
		global $database;
		$latest_pictures_array = array();
		$sql = "SELECT id, filePath, player, caption FROM rugbyPhotos ORDER BY id DESC LIMIT 900";
		$result = $database->query($sql);
	
		while($row = mysql_fetch_assoc($result)) {
			
    		array_push($latest_pictures_array, $row); 
		}
		
		//return json_encode($player_array);
		return $latest_pictures_array;
	}
	
	/* TEST BASENAME */
	public static function test_basename(){
		global $database;
		
		$latest_pictures_array = array();
		$sql = "SELECT id, filePath, player, caption FROM rugbyPhotos ORDER BY id DESC LIMIT 12";
		$result = $database->query($sql);
	
		while($row = mysql_fetch_assoc($result)) {
			
    		array_push($latest_pictures_array, $row); 
		}
		
		//return json_encode($player_array);
		return $latest_pictures_array;
	}
	
	
	/* get random images for the slider */
	public static function find_randon_file_path(){
		global $database;
		$player_array = array();
		$sql = "SELECT filePath, player, caption FROM rugbyPhotos WHERE slider_flag=1 ORDER BY RAND() LIMIT 0,10";
		$result = $database->query($sql);
	
		while($row = mysql_fetch_assoc($result)) {
    		array_push($player_array, $row); 
		}
		
		//return json_encode($player_array);
		return $player_array;
	}
	
    
    /* 
     *  get no of images flagged as SLIDER */
	public static function find_no_of_slider_pics(){
		global $database;
		$slider_qty_array = array();
		$sql = "SELECT * FROM rugbyPhotos WHERE slider_flag=1";
		$result = $database->query($sql);
	    $slider_qty = $database->num_rows($result);
        
		array_push($slider_qty_array, $slider_qty); 
		//return json_encode($player_array);
		return $slider_qty_array;
	}
	
    
	public static function find_captions(){
		global $database;
		$caption_array = array();
		$sql = "SELECT caption FROM rugbyPhotos GROUP BY caption";
		$result = $database->query($sql);
	
		while($row = mysql_fetch_assoc($result)) {
    		array_push($caption_array, $row); 
		}
		
		//return json_encode($player_array);
		return $caption_array;
	}//find_captions
	
	
	
	public static function create_thumb($filePath){
		//echo $filePath."<br/>";
		//header("Content-type: image/png");
		$im = imagecreatefromstring(file_get_contents($filePath));
		
		// Pass getimagesize() a filename and it will return an array containing the image's width, height, what type of image it is, a text 				
		// value with the width and height which can be placed directly into an <img> tag.
		$fileInfo = getimagesize($filePath);

		$maxsize = 150;

		//get height and width of original image
		$width = $fileInfo[0];
		$height = $fileInfo[1];

		//calculate aspect ratios
		$widthRatio = $maxsize / $width;
		$heightRatio = $maxsize / $height;

		//set apsect ratios
		if (($widthRatio * $height) < $maxsize)
		{
			//image is horizontal
			$thumbHeight = ceil($widthRatio * $height);
			$thumbWidth = $maxsize;
		}else{
			//image is vertical
			$thumbWidth = ceil($heightRatio * $width);
			$thumbHeight = $maxsize;
		}

		// create holding image
		$thumbnail = imagecreatetruecolor($thumbWidth, $thumbHeight);
		
		//copy sampled image into thumbnail
		imagecopyresampled($thumbnail, $im, 0,0,0,0,$thumbWidth, $thumbHeight, $width, $height);

		//get the file extension
  		$ext = pathinfo($filePath, PATHINFO_EXTENSION);
 		$name = pathinfo($filePath, PATHINFO_FILENAME);
		$file_out_name = "thumbs/" . $name . "." . $ext;
		//echo "file out path : ".$file_out_name."<br/>";
		
  		switch ( $ext )
     		{
        		case 'gif':
                		imagegif($thumbnail, $file_out_name);
                		break;
				case 'jpg':
						imagejpeg($thumbnail, $file_out_name, 80);
						break;
				case 'jpeg':
						imagejpeg($thumbnail, $file_out_name, 80);
						break;
				case 'png':
						imagepng($thumbnail, $file_out_name);
						break;
				case 'bmp':
						imagewbmp($thumbnail, $file_out_name);
						break;
				 default:
      		}
				
		}//create_thumb
		
		
		public static function upload_file(){
		}
	
	

	
  
  
	
	
}
?>