// JavaScript Document test

var asInitVals = new Array();
var img_path_array=new Array();
var i=1;
var qty=0;
function auto_advance(){
	//$('.test_area').append((-i % 6)*933);
	/**  animate the whole class my_photos (which in this ase contains 6 images) to the left (-i) **/
    //qty=3;
	$('.my_photos').animate({left: (-i % qty)*933, easing:'swing'}, 1000);
	i++;
	
	
}
$(document).ready(function(data) {
    
    /* find the number of pictures tagged for the slider */
    $.getJSON('getFilePath.php',{action:'find_no_of_slider_pics'}, function(data) {
        $.each(data, function(key, value){
            
            qty=value;
        });
    });
    
    
    $('.loading_text').bind('fade-cycle', function() {
        $(this).fadeOut('slow', function() {
            $(this).fadeIn('slow', function() {
                $(this).trigger('fade-cycle');
            });
        });
    });

// This next block of code just sets all the triggers off at random times
// The point is to start them using .trigger('fade-cycle');
// All can be started simultaneously with $('.block').trigger('fade-cycle');

    $('.loading_text').each(function(index, elem) {
        setTimeout(function() {
            $(elem).trigger('fade-cycle');
        }, index * 250);
    });
    
  // Handler for .ready() called.
  	var imageUrl = 'title_pics/img6.jpg';
	
	/**  get twenty randon pictures for the front page slider**/
	$.getJSON('getFilePath.php',{action:'find_random_pictures'}, function(data) {
		$.each(data, function(key, value){
			var photoWidth = 933;
			var photoPosition = (key+1) * photoWidth;
			var imageUrl = 'uploads/'+encodeURIComponent(value.filePath);
			//$(".my_photos").append("<p>"+photoPosition+" "+value.filePath+"</p>");
			$('.my_photos').append('<div class="my_photo" style="background:url('+imageUrl+') no-repeat; background-size:100%; background-position:top"><div id="mybox"><div id="image_text_title">Bath Rugby Photos</div><div id="player">'+value.player+'</div><div id="caption">'+value.caption+'</div></div></div>');
			//$('.my_photos').append('<div class="caption">CAPTION</div>');
			//$('.my_photos').append('<div class="my_photo"><img src="uploads/'+value.filePath+'"></div>');
			$('.my_photos').css('width', photoPosition+photoWidth);
		});
	}).complete(function(){
        get_latest_pictures();
    });
	/**  end get twenty randon pictures for the front page slider**/
	

	/*  for each of image with thr class img.my_panel_photo, set them up in a row  */
	$('img.my_panel_photo').each(function(index){
		/* phtotWidth is required as a parameter for photoPosition. my_container is set in marquee_test.css, in this case its set to 933 */
		var photoWidth = $('.my_container').width();
		/* calculates the position of the next picture in the row */
		var photoPosition = index * photoWidth;
		
		/** Note : The line below is for positioning using img tag, I have chosen to position as background */
		//$('.my_photos').append('<img class="my_photo" style="left: '+photoPosition+'" src="'+$(this).attr('src')+'" alt="'+$(this).attr('alt')+'" width="933" align="top" />');
		
		/** append each image to the my_photos class as a background **/
		//$('.my_photos').append('<div class="my_photo" style="background:url('+$(this).attr('src')+') no-repeat; background-size:100%; background-position:center"></div>');
		/** position each image in a row in the .my_photos class which is inside the myContainer class **/
		//$('.my_photos').css('width', photoPosition+photoWidth);
		//$('.my_photos').append('<div class="my_photo"><img scr="title_pics/img6.jpg"/></div>');
		
	});
	
	/* Run the auto_advance function every 5 seconds */
    function slide(){    
    
	   setInterval(auto_advance, 5000);
    }

  
  
  // $.getJSON('getFilePath.php',{action:'delete_a_picture', id:delete_pic}, function(data) {
  // }).complete(function(){start();});
  
  
  
	var thumbArray = new Array();

  //$("#jq").append("<p>jQuery : Active</p>"); 
    
	//$('myOjbect').css('background-image', 'url(' + imageUrl + ')');
	//var imageUrl = 'title_pics/img6.jpg';
	
	
	//$('#main_image').css({'background-image' : 'url(' + imageUrl + ')','background-repeat': 'no-repeat'});
	
	//$("#pic_container:nth-child(3n+3)").css("margin-right", 0);
	
	
	//alert(window.location.pathname);
	$("nav a").each(function() {
        if($(this).attr('href')==window.location.pathname){
			$(this).addClass("active");
			
			
		}
    });
	
	
	
	//$("#s_title").click(function() {
		  //alert($("div #player",this).html());
		  //alert("player selected");
		  //var myDate=$("#dcell",this).html();
		  //$("#dateout").append('<br>'+myDate);
		 
		  	
			//$("#player_list").slideToggle();
			//var index = $(this).index();
        	//$("#example_index").html("Index " + index + " was clicked");
  
		//});
		
		
	/* get player data for combo box */
    function load_combo_boxes(){
        $.getJSON('getFilePath.php',{action:'find_players'}, function(data) {
            //$("table").append("<tbody>");
            //populate data
            var myArray = new Array()
            
            $.each(data, function(key, value){
                    //$("#testarea").append("<p>"+value.filePath+"</p>");
                    //str = value.filePath;
                    str = value.filePath;
                    //$("#testarea").append("<p>"+str.substring(34)+"</p>");
                    $("#combo_player").append("<option value=\""+value.player+"\">"+value.player+"</option>");
                    //$("#test_area").append("<br>");
                    //$("#testarea").append("<img src="+"thumbs/"+escape(str.substring(34))+">");
                    
                    //$(".table1 tbody").append("<tr><td><input type=\"checkbox\" name=\"test\" value=\"9\"></td><td>"+value.player+"</td><td>"+value.caption+"</td><td>"+value.theMatch+"</td><td><img src="+"thumbs/"+escape(str.substring(34))+"></td></tr>");
                    //myArray.push(value.player);
                    //$("tbody tr:even").css("background-color","#F5F5F5");
                    
                    
            });
            
                doclick_player();
                doclick_match();		
                    
        }).complete(function(){
            setTimeout(slide,5000)
        });
        
        
        /* get match data for combobox*/
        $.getJSON('getFilePath.php',{action:'find_matches'}, function(data) {
            
            $.each(data, function(key, value){
                    $("#combo_match").append("<option value=\""+value.theMatch+"\">"+value.theMatch+"</option>");
            });
            
                doclick_player();
                doclick_match();		
                    
        });
        $("#news_feed").load("feed.php");
    }
    /** end load combo boxes **/
    
    
    
	/** get latest pictures **/
    function get_latest_pictures(){
        $.getJSON('getFilePath.php',{action:'find_latest_pictures'}, function(data) {
            
            
            /** for each record returned from the getFilePath.php json call, add the player name and the caption  */
            $.each(data, function(key, value){
                $("#pic_container").append("<div class='latest_pictures_container'><figure><a href='bath-rugby-photos.php'><div class='latest_picture_img'></div></a></figure></figcaption><div class='latest_picture_title'>"+value.player+"</div><div class='latest_picture_caption'>"+value.caption+"</div></figcaption></div>");
                //class='fancybox-buttons' data-fancybox-group='button'
                //$('.latest_picture_img').css({'background-image' : 'url(thumbs/' + value.filePath + ')','background-repeat': 'no-repeat'});		
                img_path_array[key] = value.filePath;
                
                    /**  for each ..latest_picture_caption class trim the caption and append ... */
                    $(".latest_picture_caption").each(function(){
                        if ($(this).text().length > 10) {
                            $(this).text($(this).text().substr(0, 21));
                            $(this).append('...');
                        }
                    }); 
                    /** end trim caption*/
                
            }); 
            /** end add player name and caption*/
            
            
            /** for each  .latest_picture_img class add a picture as a background**/
            $(".latest_picture_img").each(function(value){
                //$(this).append(value);
                $(this).css({'background-image' : 'url(thumbs/'+encodeURIComponent(img_path_array[value])+')','background-repeat': 'no-repeat'});
            }); 
            /** add picture as background **/
            
                
        }).complete(function(){
            load_combo_boxes();
            
        }); 
    }
	/** End get latest pictures **/
	
	
	
	
	
	$("tbody tr:even").css("background-color","#F5F5F5");
  //$("tbody tr:odd").css("background-color", "#EFF1F1");





    
function doclick_player()
  {
    $("#button_p").click(function() {
		  //alert($("div #player",this).html());
		  //alert("player selected");
		  //var myDate=$("#dcell",this).html();
		  //$("#dateout").append('<br>'+myDate);
		 
		  	//alert($("#combo_player option:selected").text());
			//alert($("#combo_player option:selected").val());
			
			window.location.href = "bath-rugby-photos.php?id=player&title="+$("#combo_player option:selected").text();
			//var index = $(this).index();
        	//$("#example_index").html("Index " + index + " was clicked");
  
		});
  }
  
  function doclick_match()
  {
    $("#button_m").click(function() {
		  //alert($("div #player",this).html());
		  //alert("player selected");
		  //var myDate=$("#dcell",this).html();
		  //$("#dateout").append('<br>'+myDate);
		 
		  	//alert($("#combo_match option:selected").text());
			window.location.href = "bath-rugby-photos.php?id=match&title="+$("#combo_match option:selected").text();
			//var index = $(this).index();
        	//$("#example_index").html("Index " + index + " was clicked");
  
		});
  }
  


 
 
  

});

/*
function rotateImages() {
		  $("#image_cont").animate({left:"500"},1000,"linear", function() {
			
			$("#image_cont").animate({right:"500"},500,"linear");
	  });
}*/