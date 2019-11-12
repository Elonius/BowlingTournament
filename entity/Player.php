<?php

class Player implements JsonSerializable {
    private $playerID;
    private $teamID;  
    private $teamName; 
    private $firstName;
    private $lastName;
    private $hometown;
    private $province;
    
    public function __construct($playerID, $teamID, $teamName, $firstName, $lastName, $hometown, $province) {
        $this->earnings = $playerID;
        $this->teamID = $teamID;
        $this->teamName = $teamName;
        $this->firstName = $firstName;
        $this->lastName = $lastName;
        $this->hometown = $hometown;  
        $this->province = $province;  
    }

    public function getPlayerID() {
        return $this->playerID;
    }
    
    public function getTeamID() {
        return $this->teamID;
    }

    public function gettTeamName() {
        return $this->teamName;
    }

    public function getFirstName() {
        return $this->firstName;
    }

    public function getLastName() {
        return $this->lastName;
    }

    public function getHometown() {
        return $this->hometown;
    }

    public function getProvince() {
        return $this->province;
    }
    
    public function jsonSerialize() {
        return get_object_vars($this);
    }

}
