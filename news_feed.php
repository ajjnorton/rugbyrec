<?php
		    $news = simplexml_load_file('http://www.bathrugby.com/rss/rss-all-news.rss');
		    
		    foreach($news->channel->item as $item) {
		    	
		    	echo "<article>";
                
                $date_to_unixtime = strtotime(strip_tags($item->pubDate));
                $unixtime_to_date = date('D jS F Y', $date_to_unixtime);
                
                $unixtime_to_day = date('D d M y', $date_to_unixtime);
                echo "<div id='day_date'>";
		          echo $unixtime_to_day."<br>";
                echo "</div>";
		        //echo "<div id='news_title'>".$item->title."</div>";
                echo "<div id='news_title'><a href='".strip_tags($item->link)."'>".$item->title."</a></div>";
		        echo strip_tags($item->description) ."<br>";
		        
                //echo "<a href=".strip_tags($item->link)."></a><br>";
                
                
		    	echo "</article>";
		    	
		    } 
	    ?>