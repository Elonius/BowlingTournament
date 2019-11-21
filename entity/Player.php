<?php

class Player implements JsonSerializable {

    private $playerID;
    private $teamID;
    private $firstName;
    private $lastName;
    private $hometown;
    private $province;

    public function __construct($playerID, $teamID, $firstName, $lastName, $hometown, $province) {
        $this->playerID = $playerID;
        $this->teamID = $teamID;
        $this->firstName = $firstName;
        $this->lastName = $lastName;
        $this->hometown = $hometown;
        $this->province = $province;
    }

    public function getPlayerID(){
		return $this->playerID;
	}

	public function setPlayerID($playerID){
		$this->playerID = $playerID;
	}

	public function getTeamID(){
		return $this->teamID;
	}

	public function setTeamID($teamID){
		$this->teamID = $teamID;
	}

	public function getFirstName(){
		return $this->firstName;
	}

	public function setFirstName($firstName){
		$this->firstName = $firstName;
	}

	public function getLastName(){
		return $this->lastName;
	}

	public function setLastName($lastName){
		$this->lastName = $lastName;
	}

	public function getHometown(){
		return $this->hometown;
	}

	public function setHometown($hometown){
		$this->hometown = $hometown;
	}

	public function getProvince(){
		return $this->province;
	}

	public function setProvince($province){
		$this->province = $province;
	}

    public function jsonSerialize() {
        return get_object_vars($this);
    }

}
