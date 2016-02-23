<?php 

require_once("config.php");

class MySQLDatabase {
	
	
	private $connection;

	function __construct(){
		$this->openConnection();
	}
	
		//open database connection
	public function openConnection(){
		
		$this->connection = mysql_connect(DB_HOST, DB_USER, DB_PASS);
		if (!$this->connection){
			die("step 1 - database connection failed: ". mysql_error());
		}else{
			//if there is a connection, open the database
			$db_select=mysql_select_db(DB_NAME,$this->connection);
			if(!db_select){
				die("step 2 - database selection failed: ". mysql_error());
			}
		}
	}
	
	
	//run query and return result in $results
	public function query($sql){
		$result = mysql_query($sql,$this->connection);
		return $result;
	}
	
	
	
		//close database connection
	public function closeConnection(){
		if(isset($this->connection)){
			mysql_close($this->connection);
			unset($this->connection);
		}
	}
	
	
	
	//return the number of records returned
	public function num_rows($result_set)
	{
		return mysql_num_rows($result_set);
	}
	
	//returns associative array that corresponds to the row in $result_set
	public function fetch_array($result_set){
		return mysql_fetch_array($result_set);
	}
	
	
	//list tables and fields in a database
	public function list_tables_fields()
	{
		$tables=mysql_list_tables(DB_NAME);
		
		echo "<h1>" . "Database : " . DB_NAME . " Has " . $this->num_rows($tables) . " tables" ."<h1/>";
		
		for($index=0; $index < $this->num_rows($tables); $index++){
			echo "<h2>"."Table : " . $index ." - ". mysql_tablename($tables,$index)."</h2>";
			//get field names
			$fields = mysql_list_fields(DB_NAME, mysql_tablename($tables,$index));
			echo "<h3>"."Fieldnames"."</h3>";
			$columns = mysql_num_fields($fields);
			for ($i = 0; $i < $columns; $i++) {
				echo " [" . mysql_field_name($fields, $i) . "] "."\n";
			}	
		}
	}//list_tables_fields
	
	
	public function insert_id() {
    // get the last id inserted over the current db connection
    return mysql_insert_id($this->connection);
  }
	
	
	
	
	
	
}

?>