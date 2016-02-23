<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">

<head>

    
  <title>Bath Rugby Club Photos - Photo Gallery</title>

	<meta name="description" content="Bath Rugby Club photo gallery - Photos available to browse and purchase." />
	
    
    <link rel="stylesheet" type="text/css" href="css/fonts.css" />

    
    
    <script type="text/javascript" language="javascript" src="js/jquery-1.8.0.min.js"></script>
    <script type="text/javascript" language="javascript" src="js/admin.js"></script>
    
  	
	<link href="css/smoothness/jquery-ui-1.10.0.custom.css" rel="stylesheet">
	<script src="js/jquery-ui-1.10.0.custom.js"></script>
    <link rel="stylesheet" type="text/css" href="css/admin.css" />

	

  
    
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    
    
    <!-- FACNYBOX LIGHTBOX -->
    <!-- Add jQuery library -->
	

	<!-- Add mousewheel plugin (this is optional) -->
	<script type="text/javascript" src="fancy_box/lib/jquery.mousewheel-3.0.6.pack.js"></script>

	<!-- Add fancyBox main JS and CSS files -->
	<script type="text/javascript" src="fancy_box/source/jquery.fancybox.js?v=2.1.4"></script>
	<link rel="stylesheet" type="text/css" href="fancy_box/source/jquery.fancybox.css?v=2.1.4" media="screen" />

	<!-- Add Button helper (this is optional) -->
	<link rel="stylesheet" type="text/css" href="fancy_box/source/helpers/jquery.fancybox-buttons.css?v=1.0.5" />
	<script type="text/javascript" src="fancy_box/source/helpers/jquery.fancybox-buttons.js?v=1.0.5"></script>

	<!-- Add Thumbnail helper (this is optional) -->
	<link rel="stylesheet" type="text/css" href="fancy_box/source/helpers/jquery.fancybox-thumbs.css?v=1.0.7" />
	<script type="text/javascript" src="fancy_box/source/helpers/jquery.fancybox-thumbs.js?v=1.0.7"></script>

	<!-- Add Media helper (this is optional) -->
	<script type="text/javascript" src="fancy_box/source/helpers/jquery.fancybox-media.js?v=1.0.5"></script>
	
    <!-- END FACNYBOX LIGHTBOX -->

	<title>Bath Rubgy Club Photos - Gallery</title>
    
    



    
</head>

<body>

	<div id="Content" class="cf">
    
    <?php
		include("includes/header.php");
	
	?>
       <hr /> 
       <div class="gallery_page_intro"><p>Welcome to the admin page, it may take a few seconds to load all images. By default all pictures contained in the database are shown below. You can also filter by player or match using the combo boxes. You can also upload pictures via the upload button.</p></div>
       <button>Upload pictures</button>
        <div id="slider_qty"><p><br></p></div>
        <div class="combo_container">
        	<div class="player_set">
                <select id="combo_player">
                    
                    <option value="">Select a player...</option>
                
                </select>
                <input type="button" id="button_p" value="Go" />
                
            </div>
   
    	<div id="or">OR</div>
            <div class="match_set">
                <select id="combo_match">
                    <option value="">Select a match...</option>
                
                </select>
                <input type="button" id="button_m" value="Go" />
                
            </div>
        </div>
        
        
        
        <div class="player_name"></div>
        <div class="gallery_container"></div>
        

 		<div id="dialog-modal" title="Basic modal dialog">
        	<div class=delete_info></div>
        	<p> Are you sure you want to delete this picture !</p>
        </div>
        
        <div id="edit-dialog-modal" title="Basic modal dialog">
        	<p>Click save when done.</p>
            <div class=edit_info></div>
            <form>
                <table id="edit_table">
                    <tr>
                        <td class="edit_dialog_label">
                            <label>Player:</label>
                        </td >
                        <td>
                            <input id="input_player" type="text" name="player">
                        </td>
                    </tr>
                    <tr>
                        <td class="edit_dialog_label"><label >Match:</label></td>
                        <td><input  id="input_match" type="text" name="match"></td>
                    </tr>
                    <tr>
                        <td class="edit_dialog_label"><label>Caption:</label></td>
                        <td><input  id="input_caption" type="text" name="caption"></td>
                    </tr>
                    <tr>
                        <td class="edit_dialog_label"><label class="ta">Comments:</label></td>
                        <td><textarea id="input_comments" cols="40" rows="5" name="comments"></textarea></td>
                    </tr>
                    <tr>  
                        <td><label> Include picture in slider:</label></td>
                        <td class="edit_dialog_label"><input id="slider_check" name="for_slider" value="" type="checkbox"></td>
                        
                    </tr>
                </table>
            </form>
        </div>
    	
        
	</div><!--content-->
</body>
</html>