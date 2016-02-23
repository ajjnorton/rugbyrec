// JavaScript Document
var asInitVals = new Array();

$(document).ready(function(data) {
	
	
	$.getJSON('getFilePath.php', function(data) {
  		//$("table").append("<tbody>");
		//populate data
		var myArray = new Array()
		$.each(data, function(key, value){
				//$("#testarea").append("<p>"+value.filePath+"</p>");
				str = value.filePath;
				$("#testarea").append("<p>"+str.substring(34)+"</p>");
				//$("#testarea").append("<p>"+value.filePath+"</p>");
				$("#testarea").append("<img src="+"thumbs/"+escape(str.substring(34))+">");
				//myArray.push(value.player);
				
		});
		
		
		
				
				
	});
	
	
				
				

	
	
});