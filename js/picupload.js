// JavaScript Document
var asInitVals = new Array();

$(document).ready(function(data) {
	
	
	$.getJSON('get_pics_for_uploader.php', function(data) {
  		//$("table").append("<tbody>");
		//populate data
		var myArray = new Array()
		$.each(data, function(key, value){
				//$("#testarea").append("<p>"+value.player+"</p>");
				myArray.push(value.player);
		});
		
		
		$(function() {
			var availableTags = myArray;
			$( "#tags" ).autocomplete({
				source: availableTags
			});
		});
				
				
	});
	
	$.getJSON('get_captions_for_uploader.php', function(data) {
  		//$("table").append("<tbody>");
		//populate data
		var myArray = new Array()
    
		$.each(data, function(key, value){
				//$("#testarea").append("<p>"+value.player+"</p>");
				myArray.push(value.caption);
            $
		});
		
		
		$(function() {
			var availableTags = myArray;
			$( "#captions" ).autocomplete({
				source: availableTags
			});
		});
				
        
	});
	
	
});