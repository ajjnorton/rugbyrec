<?php

echo "Hello"."<br/>";
if (file_exists("test.jpg")){
			echo "true";
		}else{
			echo "false";
			
		}
unlink("test.jpg");

?>