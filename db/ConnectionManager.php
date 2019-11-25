<?php

class ConnectionManager {

    public function connect_db() {
        $db = new PDO("mysql:host=localhost;dbname=bowlingtournament", "root", "Jarrett");
        $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        return $db;
    }

}
