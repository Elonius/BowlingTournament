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

    public function getGameID() {
        return $this->gameID;
    }

    public function getMatchID() {
        return $this->matchID;
    }

    public function getGameNumber() {
        return $this->gameNumber;
    }

    public function getGameStatusID() {
        return $this->gameStatusID;
    }

    public function getScore() {
        return $this->score;
    }
    
    public function getBalls() {
        return $this->balls;
    }

    public function jsonSerialize() {
        return get_object_vars($this);
    }

}
