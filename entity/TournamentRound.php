<?php

class Game implements JsonSerializable {
    private $roundID;
    
    public function __construct($roundID) {
        $this->gameID = $roundID;
    }

    public function getRoundID() {
        return $this->roundID;
    }

    public function setRoundID($roundID) {
        $this->roundID = $roundID;
    }

    public function jsonSerialize() {
        return get_object_vars($this);
    }

}
