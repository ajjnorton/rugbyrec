 // JavaScript Document




$(document).ready(function(data) {



	$("#dialog-modal").hide();
	$("#edit-dialog-modal").hide();
    
     

	start();	

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
						media : {}

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
				$(".player_name").append("Database - "+selectedPlayer);
				//alert(selectedPlayer);
				$(".image_container").remove();
				var width=0;
				var height=0;
				var img=0;

				/** get pictures for the selected player **/
					$.getJSON('getFilePath.php',{action:'find_players_pictures',player:selectedPlayer}, function(data) {
						/** for each   */
						
		                  /** INJECT **/
                        
                            /** for each   */
                            //$(".player_name").append("Database - All Pictures");
                            var qty=0;
                            $.each(data, function(key, value){
                                    var imageUrl_thumb = 'thumbs/'+encodeURIComponent(value.filePath);
                                    var imageUrl_pic = 'uploads/'+encodeURIComponent(value.filePath);
                                    //set the slider flag on each picture
                                    slider_flag=value.slider_flag;
                                    if(slider_flag=="1"){
                                        flag="&#9733";
                                    }else{
                                        flag="&#9734";
                                    }
                                    //$(".gallery_container").append("<a class='fancybox-buttons' data-fancybox-group='button' href="+imageUrl_pic+" ><img id='imageid' src="+imageUrl_thumb+" alt='Bath Rugby Club Photos - "+value.player+" "+value.caption+"'/></a>");
                                    //$(".gallery_container").append("<div class='image_container'><figcaption><b>"+value.player+"</b><br>"+value.caption+"</figcaption><div class='inner_img_container'><a class='fancybox-buttons' data-fancybox-group='button' href="+imageUrl_pic+" ><img id='imageid' src="+imageUrl_thumb+" alt='Bath Rugby Club Photos - "+value.player+" "+value.caption+"'/></a><input type='button' name='"+value.id+"' class='add_to_order' value='Delete' /><div class='img_id'>No : "+value.id+"</div></div></div>"); 
                                     $(".gallery_container").append("\
                                        <div class='image_container'><figure><figcaption><b>"+value.player+"</b><br>"+value.caption+"</figcaption>\
                                            <div class='inner_img_container'>\
                                                    <a class='fancybox-buttons' data-fancybox-group='button' href="+imageUrl_pic+" >\
                                                        <img id='imageid' src="+imageUrl_thumb+" alt='Bath Rugby Club Photos - "+value.player+" "+value.caption+"'/>\
                                                    </a></figure>\
                                                    <input type='button' name='"+value.id+"' class='delete' value='Delete' />\
                                                    <input type='button' name='"+value.id+"' class='edit' value='Edit' />\
                                                <div class='img_id'>No."+value.id+" "+flag+"</div>\
                                            </div>\
                                        </div>"); 
                                    qty++;
                                
                                 //$('.img_id').append(value.slider_flag); div class='img_id'>"+value.id+" : "+"{"+value.slider_flag+" }"+"</div>\
                                }); /** end for each*/
                                
						// delete a picture clicked
				 $(".delete").click(function() {
					 //alert("Delete");
						$(".delete_info").empty();

							$(".delete_info").append("Selected Photo : No."+$(this).attr("name"));
							var delete_pic=$(this).attr("name");
							$( "#dialog-modal" ).dialog({

								title:"Delete a picture",
								buttons:{
									Cancel:function(){
										$(this).dialog("close");
									},
									"Delete picture":function(){
										$(this).dialog("close");

										$.getJSON('getFilePath.php',{action:'delete_a_picture', id:delete_pic}, function(data) {



										}).complete(function(){start();});
										//alert("Image deleted "+ delete_pic);


									}

								},

							  height: 200,
							  width:400,
							  modal: true,

							 });

					});//end delete a picture

                /** Edit a picture button clicked **/
				 $(".edit").click(function() {
                     $(".edit_info").empty();
                     pic_id=$(this).attr("name");
                     //empty the fields
                     $('#input_player').val('');
                     $('#input_match').val('');
                     $('#input_caption').val('');
                     $('#input_comments').val('');
                     $('input[name=for_slider]').attr('checked', false);

                     
                     $(".edit_info").append("Selected Photo : No."+pic_id);
            
                     /** get details of the selected picture **/
                     

							$( "#edit-dialog-modal" ).dialog({
                            

								title:"Edit Picture Details",
								buttons:{
                                    /** CANCEL button clicked **/
									Cancel:function(){
										$(this).dialog("close");
									},
                                    
                                    /** SAVE button clicked**/
									"Save":function(){
										$(this).dialog("close");
										player = $('#input_player').val();
                                        caption= $('#input_caption').val();
                                        matches= $('#input_match').val();
                                        comments= $('#input_comments').val();
                                        //check to see if the checkbox is checked
                                        slider_flag = $('#slider_check').is(':checked');
                                        
                                        $.getJSON('getFilePath.php',{action:'update_picture_details', id:pic_id, player:player, caption:caption, matches:matches, comments:comments, slider_flag:slider_flag}, function(data) {
                                            // on complete run the function start()
                                        }).complete(function(){start();});

									}

								},

							  height: 500,
							  width:600,
							  modal: true,

							 });
                     
                     /** get picture information from database and populate fields when the edit dialog is opened**/
                     $.getJSON('getFilePath.php',{action:'get_picture_by_id', id:pic_id}, function(data) {
                            $.each(data, function(key, value){
                                //$(".input_player").append(value.player);
                                $('#input_player').val($('#input_player').val() + value.player);
                                $('#input_match').val($('#input_match').val() + value.theMatch);
                                $('#input_caption').val($('#input_caption').val() + value.caption);
                                $('#input_comments').val($('#input_comments').val() + value.comments);
                                checked_status=value.slider_flag;
                                if (checked_status==0){
                                    $('input[name=for_slider]').attr('checked', false);
                                }else{
                                    $('input[name=for_slider]').attr('checked', true);
                                    
                                }
                            });

				        });

				});//end edit a picture


					$(".player_name").append(" ("+qty+")");	
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
					$(".player_name").append("Database - "+selected_match);

					$.getJSON('getFilePath.php',{action:'find_match_pictures',matches:selected_match}, function(data) {
						/** for each   */
						 /** MATCH INJECT **/
                        
                                                    /** for each   */
                            //$(".player_name").append("Database - All Pictures");
                            var qty=0;
                            $.each(data, function(key, value){
                                    var imageUrl_thumb = 'thumbs/'+encodeURIComponent(value.filePath);
                                    var imageUrl_pic = 'uploads/'+encodeURIComponent(value.filePath);
                                    //set the slider flag on each picture
                                    slider_flag=value.slider_flag;
                                    if(slider_flag=="1"){
                                        flag="&#9733";
                                    }else{
                                        flag="&#9734";
                                    }
                                    //$(".gallery_container").append("<a class='fancybox-buttons' data-fancybox-group='button' href="+imageUrl_pic+" ><img id='imageid' src="+imageUrl_thumb+" alt='Bath Rugby Club Photos - "+value.player+" "+value.caption+"'/></a>");
                                    //$(".gallery_container").append("<div class='image_container'><figcaption><b>"+value.player+"</b><br>"+value.caption+"</figcaption><div class='inner_img_container'><a class='fancybox-buttons' data-fancybox-group='button' href="+imageUrl_pic+" ><img id='imageid' src="+imageUrl_thumb+" alt='Bath Rugby Club Photos - "+value.player+" "+value.caption+"'/></a><input type='button' name='"+value.id+"' class='add_to_order' value='Delete' /><div class='img_id'>No : "+value.id+"</div></div></div>"); 
                                     $(".gallery_container").append("\
                                        <div class='image_container'><figure><figcaption><b>"+value.player+"</b><br>"+value.caption+"</figcaption>\
                                            <div class='inner_img_container'>\
                                                    <a class='fancybox-buttons' data-fancybox-group='button' href="+imageUrl_pic+" >\
                                                        <img id='imageid' src="+imageUrl_thumb+" alt='Bath Rugby Club Photos - "+value.player+" "+value.caption+"'/>\
                                                    </a></figure>\
                                                    <input type='button' name='"+value.id+"' class='delete' value='Delete' />\
                                                    <input type='button' name='"+value.id+"' class='edit' value='Edit' />\
                                                <div class='img_id'>No."+value.id+" "+flag+"</div>\
                                            </div>\
                                        </div>"); 
                                    qty++;
                                
                                 //$('.img_id').append(value.slider_flag); div class='img_id'>"+value.id+" : "+"{"+value.slider_flag+" }"+"</div>\
                                }); /** end for each*/
                                
						// delete a picture clicked
				 $(".delete").click(function() {
					 //alert("Delete");
						$(".delete_info").empty();

							$(".delete_info").append("Selected Photo : No."+$(this).attr("name"));
							var delete_pic=$(this).attr("name");
							$( "#dialog-modal" ).dialog({

								title:"Delete a picture",
								buttons:{
									Cancel:function(){
										$(this).dialog("close");
									},
									"Delete picture":function(){
										$(this).dialog("close");

										$.getJSON('getFilePath.php',{action:'delete_a_picture', id:delete_pic}, function(data) {



										}).complete(function(){start();});
										//alert("Image deleted "+ delete_pic);


									}

								},

							  height: 200,
							  width:400,
							  modal: true,

							 });

					});//end delete a picture

                /** Edit a picture button clicked **/
				 $(".edit").click(function() {
                     $(".edit_info").empty();
                     pic_id=$(this).attr("name");
                     //empty the fields
                     $('#input_player').val('');
                     $('#input_match').val('');
                     $('#input_caption').val('');
                     $('#input_comments').val('');
                     $('input[name=for_slider]').attr('checked', false);

                     
                     $(".edit_info").append("Selected Photo : No."+pic_id);
            
                     /** get details of the selected picture **/
                     

							$( "#edit-dialog-modal" ).dialog({
                            

								title:"Edit Picture Details",
								buttons:{
                                    /** CANCEL button clicked **/
									Cancel:function(){
										$(this).dialog("close");
									},
                                    
                                    /** SAVE button clicked**/
									"Save":function(){
										$(this).dialog("close");
										player = $('#input_player').val();
                                        caption= $('#input_caption').val();
                                        matches= $('#input_match').val();
                                        comments= $('#input_comments').val();
                                        //check to see if the checkbox is checked
                                        slider_flag = $('#slider_check').is(':checked');
                                        
                                        $.getJSON('getFilePath.php',{action:'update_picture_details', id:pic_id, player:player, caption:caption, matches:matches, comments:comments, slider_flag:slider_flag}, function(data) {
                                            // on complete run the function start()
                                        }).complete(function(){start();});

									}

								},

							  height: 500,
							  width:600,
							  modal: true,

							 });
                     
                     /** get picture information from database and populate fields when the edit dialog is opened**/
                     $.getJSON('getFilePath.php',{action:'get_picture_by_id', id:pic_id}, function(data) {
                            $.each(data, function(key, value){
                                //$(".input_player").append(value.player);
                                $('#input_player').val($('#input_player').val() + value.player);
                                $('#input_match').val($('#input_match').val() + value.theMatch);
                                $('#input_caption').val($('#input_caption').val() + value.caption);
                                $('#input_comments').val($('#input_comments').val() + value.comments);
                                checked_status=value.slider_flag;
                                if (checked_status==0){
                                    $('input[name=for_slider]').attr('checked', false);
                                }else{
                                    $('input[name=for_slider]').attr('checked', true);
                                    
                                }
                            });

				        });

				});//end edit a picture


					$(".player_name").append(" ("+qty+")");	
						/** end for each*/

						//$('img').each(function() {
   				 //$(this).attr('height',$(this).height());
				//var w=$(this).width();
				//$('.test_area').append("<p>Width : "+$(this).width()+"</p>");
				//$('.test_area').append("<p>Height : "+$(this).height()+"</p>");
					//});
                        
                    });

				});
		}
	/* Handle match combo box click*/


function start(){
    $("#slider_qty").empty();
    $.getJSON('getFilePath.php',{action:'find_no_of_slider_pics'}, function(data) {
        $.each(data, function(key, value){
            $("#slider_qty").append("No of pictures tagged for slider (reccommend around 10) = "+value);
            qty=value;
        });
    });
    
		$(".player_name").empty();
		$(".image_container").remove();
		$.getJSON('getFilePath.php',{action:'find_all_pictures'}, function(data) {
			/** for each   */
			$(".player_name").append("Database - All Pictures");
			var qty=0;
			$.each(data, function(key, value){
					var imageUrl_thumb = 'thumbs/'+encodeURIComponent(value.filePath);
					var imageUrl_pic = 'uploads/'+encodeURIComponent(value.filePath);
                    //set the slider flag on each picture
					slider_flag=value.slider_flag;
                    if(slider_flag=="1"){
                        flag="&#9733";
                    }else{
                        flag="&#9734";
                    }
					//$(".gallery_container").append("<a class='fancybox-buttons' data-fancybox-group='button' href="+imageUrl_pic+" ><img id='imageid' src="+imageUrl_thumb+" alt='Bath Rugby Club Photos - "+value.player+" "+value.caption+"'/></a>");
					//$(".gallery_container").append("<div class='image_container'><figcaption><b>"+value.player+"</b><br>"+value.caption+"</figcaption><div class='inner_img_container'><a class='fancybox-buttons' data-fancybox-group='button' href="+imageUrl_pic+" ><img id='imageid' src="+imageUrl_thumb+" alt='Bath Rugby Club Photos - "+value.player+" "+value.caption+"'/></a><input type='button' name='"+value.id+"' class='add_to_order' value='Delete' /><div class='img_id'>No : "+value.id+"</div></div></div>"); 
					 $(".gallery_container").append("\
					 	<div class='image_container'><figure><figcaption><b>"+value.player+"</b><br>"+value.caption+"</figcaption>\
					 		<div class='inner_img_container'>\
									<a class='fancybox-buttons' data-fancybox-group='button' href="+imageUrl_pic+" >\
										<img id='imageid' src="+imageUrl_thumb+" alt='Bath Rugby Club Photos - "+value.player+" "+value.caption+"'/>\
									</a></figure>\
									<input type='button' name='"+value.id+"' class='delete' value='Delete' />\
									<input type='button' name='"+value.id+"' class='edit' value='Edit' />\
                                <div class='img_id'>No."+value.id+" "+flag+"</div>\
							</div>\
						</div>"); 
					qty++;
                
                 //$('.img_id').append(value.slider_flag); div class='img_id'>"+value.id+" : "+"{"+value.slider_flag+" }"+"</div>\
				}); /** end for each*/
            
                
                
                

				 // delete a picture clicked
				 $(".delete").click(function() {
					 //alert("Delete");
						$(".delete_info").empty();

							$(".delete_info").append("Selected Photo : No."+$(this).attr("name"));
							var delete_pic=$(this).attr("name");
							$( "#dialog-modal" ).dialog({

								title:"Delete a picture",
								buttons:{
									Cancel:function(){
										$(this).dialog("close");
									},
									"Delete picture":function(){
										$(this).dialog("close");

										$.getJSON('getFilePath.php',{action:'delete_a_picture', id:delete_pic}, function(data) {



										}).complete(function(){start();});
										//alert("Image deleted "+ delete_pic);


									}

								},

							  height: 200,
							  width:400,
							  modal: true,

							 });

					});//end delete a picture

                /** Edit a picture button clicked **/
				 $(".edit").click(function() {
                     $(".edit_info").empty();
                     pic_id=$(this).attr("name");
                     //empty the fields
                     $('#input_player').val('');
                     $('#input_match').val('');
                     $('#input_caption').val('');
                     $('#input_comments').val('');
                     $('input[name=for_slider]').attr('checked', false);

                     
                     $(".edit_info").append("Selected Photo : No."+pic_id);
            
                     /** get details of the selected picture **/
                     

							$( "#edit-dialog-modal" ).dialog({
                            

								title:"Edit Picture Details",
								buttons:{
                                    /** CANCEL button clicked **/
									Cancel:function(){
										$(this).dialog("close");
									},
                                    
                                    /** SAVE button clicked**/
									"Save":function(){
										$(this).dialog("close");
										player = $('#input_player').val();
                                        caption= $('#input_caption').val();
                                        matches= $('#input_match').val();
                                        comments= $('#input_comments').val();
                                        //check to see if the checkbox is checked
                                        slider_flag = $('#slider_check').is(':checked');
                                        
                                        $.getJSON('getFilePath.php',{action:'update_picture_details', id:pic_id, player:player, caption:caption, matches:matches, comments:comments, slider_flag:slider_flag}, function(data) {
                                            // on complete run the function start()
                                        }).complete(function(){start();});

									}

								},

							  height: 500,
							  width:600,
							  modal: true,

							 });
                     
                     /** get picture information from database and populate fields when the edit dialog is opened**/
                     $.getJSON('getFilePath.php',{action:'get_picture_by_id', id:pic_id}, function(data) {
                            $.each(data, function(key, value){
                                //$(".input_player").append(value.player);
                                $('#input_player').val($('#input_player').val() + value.player);
                                $('#input_match').val($('#input_match').val() + value.theMatch);
                                $('#input_caption').val($('#input_caption').val() + value.caption);
                                $('#input_comments').val($('#input_comments').val() + value.comments);
                                checked_status=value.slider_flag;
                                if (checked_status==0){
                                    $('input[name=for_slider]').attr('checked', false);
                                }else{
                                    $('input[name=for_slider]').attr('checked', true);
                                    
                                }
                            });

				        });

				});//end edit a picture


					$(".player_name").append(" ("+qty+")");	
			});
			/** end get data **/
    
		//alert("no params defined");
}//end function refresh




	$(function() {
    $( "button" ).button({
      icons: {
        primary: "ui-icon-circle-arrow-n"
      }
     
   
    
    }).click(function(){
        window.location.href = "picupload.php";
    })
        


  });



});