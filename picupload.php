<?php
	require_once("includes/class_Database.php");
	require_once("includes/class_pics.php");

	//create a new connection to the database using params in config.php
	$database = new MySQLDatabase();
	//$database->list_tables_fields();
	

    
	$players = Pics::find_players();
	
	if(isset($_POST['submit'])){
		//echo "<br>"."File name : ".$_FILES["file_upload"][name];
		//echo "<br>"."File type : ".$_FILES["file_upload"][type];
		//echo "<br>"."Size : ".$_FILES["file_upload"][size];
		//echo "<br>"."Temp locn : ".$_FILES["file_upload"][tmp_name];
		//echo "<br>"."Error : ".$_FILES["file_upload"][error];
		//echo $_POST['player'];
		$message="success";
        
		
        
		//get the name of the uploaded file
		$tmp_file = $_FILES["file_upload"][tmp_name];
		
		//give it a new name, we are adding a timestamp to the filename to make it unique.
        $date = new DateTime();
        $stamp =  $date->format('U');
		$target_file_name = $stamp.$_FILES["file_upload"][name];
		
		//set the name of the dir for uploading images
		$upload_dir = "uploads";
		
		//set the path name to the uploaded file
		$target_upload_path = $upload_dir."/".$target_file_name;
		
		
		
		if(move_uploaded_file($tmp_file, $target_upload_path)){
			
			Pics::create_thumb($target_upload_path);
			
			$message="File uploaded successfully";
			$pic = new Pics();
			
	 		$pic->player = $_POST['player'];
			$pic->match = $_POST['match'];
			$pic->caption = $_POST['caption'];
			$pic->comments = $_POST['comments'];
			$pic->server_file_path = $target_upload_path;
			$pic->create();
			
			
			
			
		}else{
			$message="File upload error";
		}
		
	}
	$database->closeConnection();
?>

<!doctype html>
<html lang="en">

<head>

	<meta charset=utf-8>
	<title>rugbyrec test</title>
    
    <link href="css/picupload.css" media="all" rel="stylesheet" type="text/css" />
    
    <title>jQuery UI Autocomplete - Default functionality</title>
	<link rel="stylesheet" href="themes/base/jquery.ui.all.css">
	<script src="js/jquery-1.8.0.js"></script>
	<script src="js/ui/jquery.ui.core.js"></script>
	<script src="js/ui/jquery.ui.widget.js"></script>
	<script src="js/ui/jquery.ui.position.js"></script>
	<script src="js/ui/jquery.ui.autocomplete.js"></script>
    
    <script language="javascript" type="text/javascript" src="js/picupload.js"></script>
    
    <link rel="stylesheet" type="text/css" href="css/home.css"/>
    <link rel="stylesheet" type="text/css" href="css/fonts.css" />
    
    
	<!--<link rel="stylesheet" href="css/demos.css">-->
	
    
</head>
<body>
 <div id="Content" class="cf">  
     
    <?php
	//include("includes/grid.php");
	include("includes/header.php");
	
    ?>
	<hr />
     <div class="myform">
    <h3>Image upload</h3>
	<p>1. Choose image file.</p>
	<form action="picupload.php" enctype="multipart/form-data" method="post">
   
    	
    <input type="file" name="file_upload" />
       <p>2. Add the information and then click upload.</p>
       
        <table>
        <tr>
    		<td><label>Player</label></td>
            <td><input class="myInputs" id="tags" name="player" type="text" value=""/></td>
        </tr>
        <tr>
        	<td><label>Match</label></td>
            <td><input class="myInputs" name="match" type="text" value=""/></td>
        </tr>
        <tr>
        	<td><label>Caption</label></td>
            <td><input class="myInputs" id="captions" name="caption" type="text" value=""/></td>
        </tr>
        <tr>
        	<td ><label>Comments</label></td>
            <td ><textarea name="comments"></textarea></td>
        </tr>
        <tr >
        	<td></td><td id="submit" ><input id="submit_button" type="submit" name="submit" value="upload"/></td>
        </tr>
       </table>
        <?php 
		if(!empty($message)){
			echo "<br><p>{$message} <a href='admin-10.php'>Return to admin page</a></p>";
		}
	?>
     </form>
     </div>
    
     
     
    
    
    
    </div>
</body>
</html>

