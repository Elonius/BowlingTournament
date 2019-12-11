
<?php

// class ConnectionManager {
//     public function connect_db() {
//         $db = new PDO("mysql:host=localhost;dbname=bowlingtournament", "root", "Jarrett");
//         $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
//         return $db;
//     }
// }

class ConnectionManager {

    public function connect_db() {
        $db = new PDO("mysql:host=localhost:3310;dbname=BOWLINGTOURNAMENT", "shawnmcc", "shawnmcc");
        $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION); // throw exceptions
        return $db;
    }

}
