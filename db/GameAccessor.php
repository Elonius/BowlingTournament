<?php

$projectRoot = filter_input(INPUT_SERVER, "DOCUMENT_ROOT") . '/shawnmcc/BowlingTournament1';

require_once 'ConnectionManager.php';
require_once ($projectRoot . '/entity/Game.php');
require_once ($projectRoot . '/utils/ChromePhp.php');

class GameAccessor {

    private $getByIDStatementString = "select * from game where gameID = :gameID";
    private $deleteStatementString = "delete from game where gameID = :gameID";
    private $insertStatementString = "insert into game values (:gameID, :matchID, :gameNumber, :gameStatusID, :score, :balls)";
    private $updateStatementString = "update game set gameID = :gameID, matchID = :matchID, gameNumber = :gameNumber, gameStatusID = :gameStatusID, score = :score, balls = :balls where gameID = :gameID";
//    private $updateScoreStatementString = "update game set score = :score, balls = :balls where gameID = :gameID";
    private $updateScoreStatementString = "update game set score = :score where gameID = :gameID";
    private $conn = NULL;
    private $getByIDStatement = NULL;
    private $deleteStatement = NULL;
    private $insertStatement = NULL;
    private $updateStatement = NULL;
    private $updateScoreStatement = NULL;

    // Constructor will throw exception if there is a problem with ConnectionManager,
    // or with the prepared statements.
    public function __construct() {
        $cm = new ConnectionManager();

        $this->conn = $cm->connect_db();
        if (is_null($this->conn)) {
            throw new Exception("no connection");
        }
        $this->getByIDStatement = $this->conn->prepare($this->getByIDStatementString);
        if (is_null($this->getByIDStatement)) {
            throw new Exception("bad statement: '" . $this->getAllStatementString . "'");
        }

        $this->deleteStatement = $this->conn->prepare($this->deleteStatementString);
        if (is_null($this->deleteStatement)) {
            throw new Exception("bad statement: '" . $this->deleteStatementString . "'");
        }

        $this->insertStatement = $this->conn->prepare($this->insertStatementString);
        if (is_null($this->insertStatement)) {
            throw new Exception("bad statement: '" . $this->getAllStatementString . "'");
        }

        $this->updateStatement = $this->conn->prepare($this->updateStatementString);
        if (is_null($this->updateStatement)) {
            throw new Exception("bad statement: '" . $this->updateStatementString . "'");
        }

        $this->updateScoreStatement = $this->conn->prepare($this->updateScoreStatementString);
        if (is_null($this->updateScoreStatement)) {
            throw new Exception("bad statement: '" . $this->updateScoreStatementString . "'");
        }
    }

    /**
     * Gets menu items by executing a SQL "select" statement. An empty array
     * is returned if there are no results, or if the query contains an error.
     * 
     * @param String $selectString a valid SQL "select" statement
     * @return array MenuItem objects
     */
    public function getItemsByQuery($selectString) {
        $result = [];

        try {
            $stmt = $this->conn->prepare($selectString);
            $stmt->execute();
            $dbresults = $stmt->fetchAll(PDO::FETCH_ASSOC);

            foreach ($dbresults as $r) {
                $gameID = $r['gameID'];
                $matchID = $r['matchID'];
                $gameNumber = $r['gameNumber'];
                $gameStatusID = $r['gameStatusID'];
                $score = $r['score'];
                $balls = $r['balls'];
                $obj = new Game($gameID, $matchID, $gameNumber, $gameStatusID, $score, $balls);
                array_push($result, $obj);
            }
        } catch (Exception $e) {
            $result = [];
        } finally {
            if (!is_null($stmt)) {
                $stmt->closeCursor();
            }
        }

        return $result;
    }

    /**
     * Gets all menu items.
     * 
     * @return array MenuItem objects, possibly empty
     */
    public function getAllItems() {
        return $this->getItemsByQuery("select * from game");
    }

    /**
     * Gets the menu item with the specified ID.
     * 
     * @param Integer $id the ID of the item to retrieve 
     * @return the MenuItem object with the specified ID, or NULL if not found
     */
    public function getItemByID($id) {
        $result = NULL;

        try {
            $this->getByIDStatement->bindParam(":gameID", $id);
            $this->getByIDStatement->execute();
            $dbresults = $this->getByIDStatement->fetch(PDO::FETCH_ASSOC); // not fetchAll

            if ($dbresults) {
                $gameID = $r['gameID'];
                $matchID = $r['matchID'];
                $gameNumber = $r['gameNumber'];
                $gameStatusID = $r['gameStatusID'];
                $score = $r['score'];
                $balls = $r['balls'];
                $obj = new Game($gameID, $matchID, $gameNumber, $gameStatusID, $score, $balls);
            }
        } catch (Exception $e) {
            $result = NULL;
        } finally {
            if (!is_null($this->getByIDStatement)) {
                $this->getByIDStatement->closeCursor();
            }
        }

        return $result;
    }

    /**
     * Deletes a menu item.
     * @param MenuItem $item an object EQUAL TO the item to delete
     * @return boolean indicates whether the item was deleted
     */
    public function deleteItem($item) {
        $success;

        $gameID = $item->getGameID(); // only the ID is needed

        try {
            $this->deleteStatement->bindParam(":gameID", $gameID);
            $success = $this->deleteStatement->execute();
        } catch (PDOException $e) {
            $success = false;
        } finally {
            if (!is_null($this->deleteStatement)) {
                $this->deleteStatement->closeCursor();
            }
            return $success;
        }
    }

    /**
     * Inserts a menu item into the database.
     * 
     * @param MenuItem $item an object of type MenuItem
     * @return boolean indicates if the item was inserted
     */
    public function insertItem($item) {
        $success;
        $gameID = $item->getGameID();
        $matchID = $item->getMatchID();
        $gameNumber = $item->getGameNumber();
        $gameStatusID = $item->getGameStatusID();
        $score = $item->getScore();
        $balls = $item->getBalls();
        $obj = new Game($gameID, $matchID, $gameNumber, $gameStatusID, $score, $balls);

        try {
            $this->insertStatement->bindParam(":gameID", $gameID);
            $this->insertStatement->bindParam(":matchID", $matchID);
            $this->insertStatement->bindParam(":gameNumber", $gameNumber);
            $this->insertStatement->bindParam(":gameID", $gameStatusID);
            $this->insertStatement->bindParam(":score", $score);
            $this->insertStatement->bindParam(":balls", $balls);
            $success = $this->insertStatement->execute();
        } catch (PDOException $e) {
            $success = false;
        } finally {
            if (!is_null($this->insertStatement)) {
                $this->insertStatement->closeCursor();
            }
            return $success;
        }
    }

    /**
     * Updates a menu item in the database.
     * 
     * @param MenuItem $item an object of type MenuItem, the new values to replace the database's current values
     * @return boolean indicates if the item was updated
     */
    public function updateItem($item) {
        $success;

        $gameID = $item->getGameID();
        $matchID = $item->getMatchID();
        $gameNumber = $item->getGameNumber();
        $gameStatusID = $item->getGameStatusID();
        $score = $item->getScore();
        $balls = $item->getBalls();
        $obj = new Game($gameID, $matchID, $gameNumber, $gameStatusID, $score, $balls);

        try {
            $this->updateStatement->bindParam(":gameID", $gameID);
            $this->updateStatement->bindParam(":matchID", $matchID);
            $this->updateStatement->bindParam(":gameNumber", $gameNumber);
            $this->updateStatement->bindParam(":gameStatusID", $gameStatusID);
            $this->updateStatement->bindParam(":score", $score);
            $this->updateStatement->bindParam(":balls", $balls);

            $success = $this->updateStatement->execute();
        } catch (PDOException $e) {
            $success = false;
        } finally {
            if (!is_null($this->updateStatement)) {
                $this->updateStatement->closeCursor();
            }
            return $success;
        }
    }

    public function updateScore($item) {
        $success;
        $gameID = $item->getGameID();
        $matchID = $item->getMatchID();
        $gameNumber = $item->getGameNumber();
        $gameStatusID = $item->getGameStatusID();
        $score = $item->getScore();
        $balls = $item->getBalls();

        $obj = new Game($gameID, $matchID, $gameNumber, $gameStatusID, $score, $balls);

        try {
            $this->updateScoreStatement->bindParam(":gameID", $gameID);
            $this->updateScoreStatement->bindParam(":score", $score);

            $success = $this->updateScoreStatement->execute();
        } catch (PDOException $e) {
            $success = false;
        } finally {
            if (!is_null($this->updateScoreStatement)) {
                $this->updateScoreStatement->closeCursor();
            }
            return $success;
        }
    }

}
