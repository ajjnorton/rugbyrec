// JavaScript Document

var asInitVals = new Array();
var img_path_array=new Array();

var i=1;
function auto_advance(){
	//$('.test_area').append((-i % 6)*933);
	/**  animate the whole class my_photos (which in this ase contains 6 images) to the left (-i) **/
	$('.my_photos').animate({left: (-i % 20)*933, easing:'swing'}, 1000);
	i++;
	
	
}
$(document).ready(function(data) {
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
	});
	/**  end get twenty randon pictures for the front page slider**/
	

	 
	//$(".my_panels").hide();
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
	setInterval(auto_advance, 5000);

  
  
  
  
  
  
	var thumbArray = new Array();

  $("#jq").append("<p>jQuery : Active</p>"); 
    
	//$('myOjbect').css('background-image', 'url(' + imageUrl + ')');
	var imageUrl = 'title_pics/img6.jpg';
	
	
	$('#main_image').css({'background-image' : 'url(' + imageUrl + ')','background-repeat': 'no-repeat'});
	
	//$("#pic_container:nth-child(3n+3)").css("margin-right", 0);
	
	
	//alert(window.location.pathname);
	$("nav a").each(function() {
        if($(this).attr('href')==window.location.pathname){
			$(this).addClass("active");
			
			
		}
    });
	
	
	
	$("#s_title").click(function() {
		  //alert($("div #player",this).html());
		  //alert("player selected");
		  //var myDate=$("#dcell",this).html();
		  //$("#dateout").append('<br>'+myDate);
		 
		  	
			$("#player_list").slideToggle();
			//var index = $(this).index();
        	//$("#example_index").html("Index " + index + " was clicked");
  
		});
		
		
	/* get player data */
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
				
	});
	
	
	/* get match data */
	$.getJSON('getFilePath.php',{action:'find_matches'}, function(data) {
		
		$.each(data, function(key, value){
				$("#combo_match").append("<option value=\""+value.theMatch+"\">"+value.theMatch+"</option>");
		});
		
			doclick_player();
			doclick_match();		
				
	});
	
	/** get latest pictures **/
	$.getJSON('getFilePath.php',{action:'find_latest_pictures'}, function(data) {
		
		
		/** for each record returned from the getFilePath.php json call, add the player name and the caption  */
		$.each(data, function(key, value){
			$("#pic_container").append("<div class='latest_pictures_container'><figure><div class='latest_picture_img'></div></figure></figcaption><div class='latest_picture_title'>"+value.player+"</div><div class='latest_picture_caption'>"+value.caption+"</div></figcaption></div>");
				
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
		
			
	}); 
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
			alert($("#combo_player option:selected").val());
			
			window.location.href = "archive.php?id=player&title="+$("#combo_player option:selected").text();
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
		 
		  	alert($("#combo_match option:selected").text());
			window.location.href = "archive.php?id=match&title="+$("#combo_match option:selected").text();
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