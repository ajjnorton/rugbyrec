<?php


$images = glob('*.{jpg,gif,png}', GLOB_BRACE);

//echo("<pre>");
    //print_r($images);
//echo("</pre>");

$files = scandir('/Users/anthonynorton/Desktop/rugbyrec/admin/imageTest/');
foreach($files as $file) {
  echo($file);
  echo("<br>");
  $size = getimagesize('/Users/anthonynorton/Desktop/rugbyrec/admin/imageTest/'.$file);
  echo("<pre>");
    print_r($size);
echo("</pre>");
}

/*$dir = new DirectoryIterator(dirname(__FILE__));
foreach ($dir as $fileinfo) {
    if (!$fileinfo->isDot()) {

        if(!is_dir($dir)){
          var_dump($fileinfo->getFilename());
          //print_r($fileinfo);
          echo("<pre>");
          print_r(__FILE__);
          echo("</pre>");
          $path_parts = pathinfo('/path/emptyextension.');
          $size = getimagesize($dir);
         // echo("<pre>");
          //print_r($size);
          //echo("</pre>");

        }

    }
}
*/
/*$files = scandir('../uploads');
foreach($files as $file) {
   
    $size = getimagesize('../uploads/'.$file);
  
  echo($file);
  echo("<br>");


	$width = $size[0];
  	$height = $size[1];
  	$fileType = $size[mime];
  	echo($fileType."<br>");

if($fileType = "image/jpeg"){
  
 
  // Turn file into image resouerce
  //$image = imagecreatefromjpeg($_FILES['image']['tmp_name']);
  $path = '../uploads/'.$file;
  //echo("<img src='".$path."' alt='...''>");

  		
  		echo($type."<br>");
  		// Set the max size of the image
        if($width>$height){
            //Landscape
            //Set the max with to crop to
            $maxsize = 1024;
            // Keep the original size if its < $maxsize
            if($width<$maxsize){
                $maxsize=$width;
            }
        }else{
            //portrait or square 
            //Set the max with to crop to
            $maxsize=800;
            if($height<800){
                $maxsize=$height;
            } 
        }




        $i = imagecreatefromjpeg($file);
        // Aspect ratio
        $widthRatio = $maxsize / $width;
        $heightRatio = $maxsize / $height;
                //set apsect ratios
        if (($widthRatio * $height) < $maxsize)
        {
            echo("image is Landscape<br>");
            //image is landscape

            $thumbHeight = ceil($widthRatio * $height);
            $thumbWidth = $maxsize;
        }else{
            echo("image is Portrait<br>");
            //image is vertical
            $thumbWidth = ceil($heightRatio * $width);
            $thumbHeight = $maxsize;
        }
        
        $thumbnail = imagecreatetruecolor($thumbWidth, $thumbHeight);

        //copy sampled image into thumbnail
        imagecopyresampled($thumbnail, $img, 0,0,0,0,$thumbWidth, $thumbHeight, $width, $height);

        if(!imagecopyresampled($thumbnail, $img,
            0, 0, //dest x, y (margins)
            0, 0, //src x, y (0,0 means top left)
            $thumbWidth, $thumbHeight,//dest w, h (resample to this size (computed above)
            $width, $height )//src w, h (the full size of the original)
         ){
            //copy failed
            imagedestroy($thumbnail);
            return null;
    	}

    	imagejpeg($thumbnail, "test/".$file, 100);
    	


      }else{
        echo("nos jpeg");
      }

}*/
?>