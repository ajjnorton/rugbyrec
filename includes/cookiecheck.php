<?php
	
	if(isset($_COOKIE["known-visitor"]))
	{
		
		header("Location: gallery.php");
		
		exit;
	}else{
		
		//header("Location: index.php");
	}
?>
