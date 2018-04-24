<?php
    class DATABASE
    {
        var $hostname;
        var $user;
        var $password;
        var $db_name;
        var $dbh;

        function __construct(){
            $localhost = false;
            if( $localhost == true ){
                $this->hostname='localhost';
                $this->user="root";
                $this->password="";
            }else{
                $this->hostname='';
                $this->user="";
                $this->password="";
            }
            $this->db_name="crops";
            $this->dbh=mysql_connect($this->hostname, $this->user, $this->password) or die("Unable to connect to MySQL");
            $this->conn = mysql_select_db($this->db_name, $this->dbh) or die("Could not select db");
        }
        function __destruct(){
            if( $this->dbh ){
                mysql_close($this->dbh);
            }
        }
        public static function runQuery($query){
            return mysql_query($query);
        }
        public static function numRows($result){  return mysql_num_rows($result); }
        public static function fetchRow($result){ return mysql_fetch_assoc($result);  }
        public static function fetchRows($result){    while($row=mysql_fetch_assoc($result)){ $row_s[]=$row;  }   return  $row_s; }
        public static function insertQuery( $tableName, $insertDataArray ){
            $return = false;
            $insertQuery = "INSERT INTO $tableName ";
            if( is_array($insertDataArray) && sizeof($insertDataArray) > 0 ){
                $fieldsString = '';
                $fieldsValString = '';
                foreach( $insertDataArray as $field => $fieldVal ){

                    if( $tableName == 'cache_data'){
                        $fieldVal =  mysql_real_escape_string( $fieldVal );
                    }else{
                        $fieldVal = strtolower( mysql_real_escape_string( $fieldVal ) );
                    }

                    if( $fieldsString == ''){
                        $fieldsString = $field;
                    }else{
                        $fieldsString = $fieldsString.','.$field;
                    }

                    if( $fieldsValString == ''){
                        $fieldsValString = "'$fieldVal'";
                    }else{
                        $fieldsValString = $fieldsValString.",'$fieldVal'";
                    }
                }
                $insertQuery = $insertQuery."($fieldsString) VALUES ($fieldsValString)";
                if( self::runQuery($insertQuery) ){
                    $return = true;
                }
            }
            return $return;
        }
        public static function updateBySingleWhere( $tableName, $whereField, $whereFieldVal, $updateData ){
            $return = false;
            $updateQuery = "UPDATE $tableName SET ";
            if( is_array($updateData) && sizeof($updateData) > 0 ){

                $updateFieldString = '';
                foreach( $updateData as $field => $fieldVal ){
                    $fieldVal = strtolower( mysql_real_escape_string($fieldVal) );
                    if( $updateFieldString == '' ){
                        $updateFieldString = $field."='$fieldVal'";
                    }else{
                        $updateFieldString = $updateFieldString.", $field='$fieldVal' ";
                    }
                }

                $updateQuery = $updateQuery."$updateFieldString WHERE $whereField='$whereFieldVal' ";
                if( self::runQuery($updateQuery) ){
                    $return = true;
                }
            }
            return $return;
        }

    }
    // $databaseObj = new DATABASE();
?>