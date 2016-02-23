// JavaScript Document test


$(document).ready(function(data) {
 
    $('#loading_text').bind('fade-cycle', function() {
        $(this).fadeOut('slow', function() {
            $(this).fadeIn('slow', function() {
                $(this).trigger('fade-cycle');
            });
        });
    });
    
    $('#loading_text').each(function(index, elem) {
        setTimeout(function() {
            $(elem).trigger('fade-cycle');
        }, index * 250);
    });
    
    
    $("#main_news").load("news_feed.php",function(){
        $("#loading_text").remove();
    });
   

  

});
