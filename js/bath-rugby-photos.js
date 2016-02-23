// JavaScript Document

var i=1;
function auto_advance(){
	//$('.test_area').append((-i % 6)*933);
	/**  animate the whole class my_photos (which in this ase contains 6 images) to the left (-i) **/
	$('.my_photos').animate({left: (-i % 3)*900, easing:'swing'}, 1000);
	i++;
	
	
}

var total_images=0;

$(document).ready(function(data) {
	
	
	$("#dialog-modal").hide();	
				
	
	/** FACNY BOX**/
			/*
			 *  Simple image gallery. Uses default settings
			 */

			$('.fancybox').fancybox();

			/*
			 *  Different effects
			 */

			// Change title type, overlay closing speed
			$(".fancybox-effects-a").fancybox({
				helpers: {
					title : {
						type : 'outside'
					},
					overlay : {
						speedOut : 0
					}
				}
			});

			// Disable opening and closing animations, change title type
			$(".fancybox-effects-b").fancybox({
				openEffect  : 'none',
				closeEffect	: 'none',

				helpers : {
					title : {
						type : 'over'
					}
				}
			});

			// Set custom style, close if clicked, change title type and overlay color
			$(".fancybox-effects-c").fancybox({
				wrapCSS    : 'fancybox-custom',
				closeClick : true,

				openEffect : 'none',

				helpers : {
					title : {
						type : 'inside'
					},
					overlay : {
						css : {
							'background' : 'rgba(238,238,238,0.85)'
						}
					}
				}
			});

			// Remove padding, set opening and closing animations, close if clicked and disable overlay
			$(".fancybox-effects-d").fancybox({
				padding: 0,

				openEffect : 'elastic',
				openSpeed  : 150,

				closeEffect : 'elastic',
				closeSpeed  : 150,

				closeClick : true,

				helpers : {
					overlay : null
				}
			});

			/*
			 *  Button helper. Disable animations, hide close button, change title type and content
			 */

			$('.fancybox-buttons').fancybox({
				openEffect  : 'none',
				closeEffect : 'none',

				prevEffect : 'none',
				nextEffect : 'none',

				closeBtn  : true,

				helpers : {
					title : {
						type : 'inside'
					},
					
				},

				afterLoad : function() {
					this.title = 'Image ' + (this.index + 1) + ' of ' + this.group.length + this.title;
				}
			});


			/*
			 *  Thumbnail helper. Disable animations, hide close button, arrows and slide to next gallery item if clicked
			 */

			$('.fancybox-thumbs').fancybox({
				prevEffect : 'none',
				nextEffect : 'none',

				closeBtn  : false,
				arrows    : false,
				nextClick : true,

				helpers : {
					thumbs : {
						width  : 50,
						height : 50
					}
				}
			});

			/*
			 *  Media helper. Group items, disable animations, hide arrows, enable media and button helpers.
			*/
			$('.fancybox-media')
				.attr('rel', 'media-gallery')
				.fancybox({
					openEffect : 'none',
					closeEffect : 'none',
					prevEffect : 'none',
					nextEffect : 'none',

					arrows : false,
					helpers : {
						media : {},
						buttons : {}
					}
				});

			/*
			 *  Open manually
			 */

			$("#fancybox-manual-a").click(function() {
				$.fancybox.open('1_b.jpg');
			});

			$("#fancybox-manual-b").click(function() {
				$.fancybox.open({
					href : 'iframe.html',
					type : 'iframe',
					padding : 5
				});
			});

			$("#fancybox-manual-c").click(function() {
				$.fancybox.open([
					{
						href : '1_b.jpg',
						title : 'My title'
					}, {
						href : '2_b.jpg',
						title : '2nd title'
					}, {
						href : '3_b.jpg'
					}
				], {
					helpers : {
						thumbs : {
							width: 75,
							height: 50
						}
					}
				});
			});
			
	

	
	
	
	
	//alert(window.location.pathname);
	$("nav a").each(function() {
        if($(this).attr('href')==window.location.pathname){
			$(this).addClass("active");
			
			
		}
    });
	


	/** get player data for combo box*/
	$.getJSON('getFilePath.php',{action:'find_players'}, function(data) {
		
		var myArray = new Array()
		
		$.each(data, function(key, value){
				str = value.filePath;
				$("#combo_player").append("<option value=\""+value.player+"\">"+value.player+"</option>");
		});
		
			doclick_player();
				
				
	});
	/* End get player data for combo box*/
	
	
	
	
	/** get match data for combo box*/
		$.getJSON('getFilePath.php',{action:'find_matches'}, function(data) {
			
			$.each(data, function(key, value){
					$("#combo_match").append("<option value=\""+value.theMatch+"\">"+value.theMatch+"</option>");
			});
			
				
				doclick_match();		
		});
	/* End get match data for combo*/
	
	
	/** Handle player combo box click*/
		function doclick_player()
		{
		$("#button_p").click(function() {
				$(".player_name").empty();
				$(".test_area").empty();
				var selectedPlayer = $("#combo_player option:selected").text();
				$(".player_name").append(selectedPlayer);
				//alert(selectedPlayer);
				$(".image_container").remove();
				var width=0;
				var height=0;
				var img=0;
				
				/** get pictures for the selected player **/
					$.getJSON('getFilePath.php',{action:'find_players_pictures',player:selectedPlayer}, function(data) {
						/** for each   */
						$.each(data, function(key, value){
							var imageUrl_thumb = 'thumbs/'+encodeURIComponent(value.filePath);
							var imageUrl_pic = 'uploads/'+encodeURIComponent(value.filePath);
							//$('.my_photos').append('<div class="my_photo" style="background:url('+imageUrl+') no-repeat; background-size:contain; background-position:center;"></div>');
							
							//$(".gallery_container").append("<div class='image_container'><figure><figcaption>"+value.caption+"</figcaption><div class='inner_img_container'><a class='fancybox-buttons' data-fancybox-group='button' title=' : "+value.player+" - "+value.caption+"' href="+imageUrl_pic+"><img id='imageid' src="+imageUrl_thumb+" alt='Bath Rugby Club Photos - "+value.player+" "+value.caption+"'/></figure></a><input type='button' id='"+value.player+"' name='"+value.id+"' class='add_to_order' value='Order' /><div class='img_id'>No : "+value.id+"</div></div></div>");
							$(".gallery_container").append("\
					 	<div class='image_container'><figure><figcaption><b>"+value.player+"</b><br>"+value.caption+"</figcaption>\
					 		<div class='inner_img_container'>\
									<a class='fancybox-buttons' data-fancybox-group='button' title=' : "+value.player+" - "+value.caption+"' href="+imageUrl_pic+" >\
										<img id='imageid' src="+imageUrl_thumb+" alt='Bath Rugby Club Photos - "+value.player+" "+value.caption+"'/>\
									</a></figure>\
									<input type='button' name='"+value.id+"' id='"+value.player+"' id='"+value.player+"' class='add_to_order' value='Order' />\
								<div class='img_id'>No : "+value.id+"</div>\
							</div>\
						</div>"); 
							
							//<p><a href="#kitchen-sink" class="modal-toggle-1">Open</a></p>
							//total_images=key+1;
							//$('.test_area').append("<p>"+total_images+"</p>");
						
		
							
						}); 
						$(".add_to_order").click(function() {
							//could prove useful
							//sessionStorage.lastname=$(this).attr("name");
							$(".order_info").empty();
							$(".order_info").append("Selected Photo : No."+$(this).attr("name")+" "+$(this).attr("id"));
							$( "#dialog-modal" ).dialog({
								
								title:"How to order",
								buttons: [ { text: "Ok", click: function() { $( this ).dialog( "close" ); } } ],
							  height: 750,
							  width:800,
							  modal: true,
							  
							 });
							 //alert(sessionStorage.lastname);
		  
						});
						/** end for each*/
						
						//$('img').each(function() {
   				 //$(this).attr('height',$(this).height());
				//var w=$(this).width();
				//$('.test_area').append("<p>Width : "+$(this).width()+"</p>");
				//$('.test_area').append("<p>Height : "+$(this).height()+"</p>");
					//});
						
					});
				/** end get pictures for the selected player*/
				//setInterval(auto_advance, 5000);
				
				
						

				
			});
			
			
			/* end click */
			
			
		}
	/* End Handle player combo box click*/
   

  
  
	/** Handle match combo box click*/
		function doclick_match()
		{	
			$("#button_m").click(function() {
					$(".player_name").empty();
					
					 $(".image_container").remove();
					 
					//alert($("#combo_match option:selected").text());
					var selected_match = $("#combo_match option:selected").text();
					$(".player_name").append(selected_match);
					
					$.getJSON('getFilePath.php',{action:'find_match_pictures',matches:selected_match}, function(data) {
						/** for each   */
						$.each(data, function(key, value){
							var imageUrl_thumb = 'thumbs/'+encodeURIComponent(value.filePath);
							var imageUrl_pic = 'uploads/'+encodeURIComponent(value.filePath);
							
							
							$(".gallery_container").append("\
					 	<div class='image_container'><figure><figcaption><b>"+value.caption+"</figcaption>\
					 		<div class='inner_img_container'>\
									<a class='fancybox-buttons' data-fancybox-group='button' title=' : "+value.player+" - "+value.caption+"' href="+imageUrl_pic+" >\
										<img id='imageid' src="+imageUrl_thumb+" alt='Bath Rugby Club Photos - "+value.theMatch+" "+value.caption+"'/>\
									</a></figure>\
									<input type='button' name='"+value.id+"' id='"+value.theMatch+"' class='add_to_order' value='Order' />\
								<div class='img_id'>No : "+value.id+"</div>\
							</div>\
						</div>"); 
	
						}); 
							$(".add_to_order").click(function() {
								$(".order_info").empty();
							$(".order_info").append("Selected Photo : No."+$(this).attr("name")+" "+$(this).attr("id"));
							$( "#dialog-modal" ).dialog({
								
								title:"How to order",
								buttons: [ { text: "Ok", click: function() { $( this ).dialog( "close" ); } } ],
							  height: 750,
							  width:800,
							  modal: true,
							  
							 });
							});
						/** end for each*/
						
						
					});
		  
				});
		}
	/* Handle match combo box click*/
	  
  
  
	
	
// example.com?param1=name&param2=&id=6
// handle the input from the home page
	$.urlParam = function(name){
	var results = new RegExp('[\\?&]' + name + '=([^&#]*)').exec(window.location.href);
	if (!results) { return 0; }
		return results[1] || 0;
	}
		
	
	var param_one=$.urlParam('id');
	var param_two=$.urlParam('title'); 
	
	//if there is a param from the home page
	if ($.urlParam('id') !=0)
	{
		//alert(param_one);
		//alert(param_two);
		//if the player combo box was activated on the home page
		if (param_one="player"){
			var param_two = decodeURIComponent(param_two);
			//$(".test_area").append("<p>Player : "+param_two+"</p>");
			$(".player_name").append(param_two);
			/** get pictures for the selected player **/
				$.getJSON('getFilePath.php',{action:'find_players_pictures',player:param_two}, function(data) {
						/** for each   */
						$.each(data, function(key, value){
								var imageUrl_thumb = 'thumbs/'+encodeURIComponent(value.filePath);
								var imageUrl_pic = 'uploads/'+encodeURIComponent(value.filePath);
								//$('.my_photos').append('<div class="my_photo" style="background:url('+imageUrl+') no-repeat; background-size:contain; background-position:center;"></div>');
								
								$(".gallery_container").append("\
					 	<div class='image_container'><figure><figcaption><b>"+value.player+"</b><br>"+value.caption+"</figcaption>\
					 		<div class='inner_img_container'>\
									<a class='fancybox-buttons' data-fancybox-group='button' title=' : "+value.player+" - "+value.caption+"' href="+imageUrl_pic+" >\
										<img id='imageid' src="+imageUrl_thumb+" alt='Bath Rugby Club Photos - "+value.player+" "+value.caption+"'/>\
									</a></figure>\
									<input type='button' name='"+value.id+"' id='"+value.player+"' class='add_to_order' value='Order' />\
								<div class='img_id'>No : "+value.id+"</div>\
							</div>\
						</div>"); 
								
							}); 
								$(".add_to_order").click(function() {
									//alert($(this).attr("name"));
									$(".order_info").empty();
							$(".order_info").append("Selected Photo : No."+$(this).attr("name")+" "+$(this).attr("id"));
							$( "#dialog-modal" ).dialog({
								
								title:"How to order",
								buttons: [ { text: "Ok", click: function() { $( this ).dialog( "close" ); } } ],
							  height: 750,
							  width:800,
							  modal: true,
							  
							 });
			  
								});
							/** end for each*/
							
				});
			/** end get pictures for the selected player*/
		}
		if (param_one="match"){
			//alert(param_one);
			var param_two = decodeURIComponent(param_two);
			//alert(param_two);
							
					$.getJSON('getFilePath.php',{action:'find_match_pictures',matches:param_two}, function(data) {
						/** for each   */
						$.each(data, function(key, value){
							var imageUrl_thumb = 'thumbs/'+encodeURIComponent(value.filePath);
							var imageUrl_pic = 'uploads/'+encodeURIComponent(value.filePath);
							
							
							$(".gallery_container").append("\
					 	<div class='image_container'><figure><figcaption><b>"+value.caption+"</figcaption>\
					 		<div class='inner_img_container'>\
									<a class='fancybox-buttons' data-fancybox-group='button' title=' : "+value.player+" - "+value.caption+"' href="+imageUrl_pic+" >\
										<img id='imageid' src="+imageUrl_thumb+" alt='Bath Rugby Club Photos - "+value.player+" "+value.caption+"'/>\
									</a></figure>\
									<input type='button' name='"+value.id+"' id='"+value.theMatch+"' class='add_to_order' value='Order' />\
								<div class='img_id'>No : "+value.id+"</div>\
							</div>\
						</div>"); 
						}); 
							$(".add_to_order").click(function() {
								$(".order_info").empty();
							$(".order_info").append("Selected Photo : No."+$(this).attr("name")+" "+$(this).attr("id"));
							$( "#dialog-modal" ).dialog({
								
								title:"How to order",
								buttons: [ { text: "Ok", click: function() { $( this ).dialog( "close" ); } } ],
							  height: 750,
							  width:800,
							  modal: true,
							  
							 });
		  
							});
						/** end for each*/
						
						
					});
			
			
		}
		
	}else{
		$.getJSON('getFilePath.php',{action:'find_latest_gallery_pictures'}, function(data) {
			/** for each   */
			$(".player_name").append("Latest Pictures");
			$.each(data, function(key, value){
					var imageUrl_thumb = 'thumbs/'+encodeURIComponent(value.filePath);
					var imageUrl_pic = 'uploads/'+encodeURIComponent(value.filePath);
					
					//$(".gallery_container").append("<div class='image_container'><figure><figcaption><b>"+value.player+"</b><br>"+value.caption+"</figcaption><div class='inner_img_container'><a class='fancybox-buttons' data-fancybox-group='button' href="+imageUrl_pic+" ><img id='imageid' src="+imageUrl_thumb+" alt='Bath Rugby Club Photos - "+value.player+" "+value.caption+"'/></figure></a><input type='button' name='"+value.id+"' class='add_to_order' value='Order' /><div class='img_id'>No : "+value.id+"</div></div></div>");
					
					$(".gallery_container").append("\
					 	<div class='image_container'><figure><figcaption><b>"+value.player+"</b><br>"+value.caption+"</figcaption>\
					 		<div class='inner_img_container'>\
									<a class='fancybox-buttons' data-fancybox-group='button' href="+imageUrl_pic+" >\
										<img id='imageid' src="+imageUrl_thumb+" alt='Bath Rugby Club Photos - "+value.player+" "+value.caption+"'/>\
									</a></figure>\
									<input type='button' name='"+value.id+"' id='"+value.player+"' class='add_to_order' value='Order' />\
								<div class='img_id'>No : "+value.id+"</div>\
							</div>\
						</div>"); 
					
				}); 
					$(".add_to_order").click(function() {
						$(".order_info").empty();
							$(".order_info").append("Selected Photo : No."+$(this).attr("name")+" "+$(this).attr("id"));
							$( "#dialog-modal" ).dialog({
								
								title:"How to order",
								buttons: [ { text: "Ok", click: function() { $( this ).dialog( "close" ); } } ],
							  height: 750,
							  width:800,
							  modal: true,
							  
							 });
	
					});
				/** end for each*/
						
			});
			/** end get data **/
		//alert("no params defined");
	}


	/** get latest pictures **/
	$.getJSON('getFilePath.php',{action:'find_latest_pictures'}, function(data) {
		
		
		/** for each record returned from the getFilePath.php json call, add the player name and the caption  */
		$.each(data, function(key, value){
			
		}); 
		/** end add player name and caption*/

	}); 
	/** End get latest pictures **/
	

	

});