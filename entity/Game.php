<?php

class Game implements JsonSerializable {
    private $gameID;
    private $matchID;
    private $gameNumber;
    private $gameStatusID;
    private $score;
    private $balls;
    
    public function __construct($gameID, $matchID, $gameNumber, $gameStatusID, $score, $balls) {
        $this->gameID = $gameID;
        $this->matchID = $matchID;
        $this->gameNumber = $gameNumber;
        $this->gameStatusID= $gameStatusID;
        $this->score = $score;
        $this->balls = $balls;
    }

    //GameID
    public function getGameID(){
		return $this->gameID;
	}

	public function setGameID($gameID){
		$this->gameID = $gameID;
	}

    //matchID
	public function getMatchID(){
		return $this->matchID;
	}

	public function setMatchID($matchID){
		$this->matchID = $matchID;
	}

    //gameNum
	public function getGameNumber(){
		return $this->gameNumber;
	}

	public function setGameNumber($gameNumber){
		$this->gameNumber = $gameNumber;
	}

    //game status
	public function getGameStatusID(){
		return $this->gameStatusID;
	}

	public function setGameStatusID($gameStatusID){
		$this->gameStatusID = $gameStatusID;
	}

    //score
	public function getScore(){
		return $this->score;
	}

	public function setScore($score){
		$this->score = $score;
	}

    //balls
	public function getBalls(){
		return $this->balls;
	}

	public function setBalls($balls){
		$this->balls = $balls;
	}

    public function jsonSerialize() {
        return get_object_vars($this);
    }

}
