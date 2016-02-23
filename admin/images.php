<?php



$images = glob('../uploads/*.{jpg,gif,png}', GLOB_BRACE);
ini_set('max_execution_time', 1800);
//print_r($images);
//$size = getimagesize('../uploads/'.$file);

foreach($images as $file) {
  $size = getimagesize('../uploads/'.$file);

  
  echo("XXX ".getcwd());
  echo("<br>");

    $width = $size[0];
    $height = $size[1];
    $imageType = $size['mime'];

  
  if($imageType == "image/jpeg"){
      echo("$file");
      echo("<br>");

      //Turn file into image resource
     

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
        

        //Turn file into image resource
        $image = imagecreatefromjpeg($file);

        // Create a blank holding image
        $thumbnail = imagecreatetruecolor($thumbWidth, $thumbHeight);

        //copy sampled image into thumbnail
        imagecopyresampled($thumbnail, $image, 0,0,0,0,$thumbWidth, $thumbHeight, $width, $height);

        //create the image
        imagejpeg($thumbnail, getcwd()."/imageTest/processed/".basename($file), 100);

        imagedestroy($image);




  }
}


?>