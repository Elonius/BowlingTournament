<?php

$projectRoot = filter_input(INPUT_SERVER, "DOCUMENT_ROOT") . '/shawnmcc/BowlingTournament1';

require_once 'ConnectionManager.php';
require_once ($projectRoot . '/entity/Matchup.php');

class MatchAccessor {

    private $getByIDStatementString = "select * from matchup where matchID = :matchID order by score";
    private $deleteStatementString = "delete from matchup where matchID = :matchID";
    private $insertStatementString = "insert into matchup values (:matchID, :roundID, :matchgroup, :teamID, :score, :ranking)";
    private $updateStatementString = "update matchup set matchID = :matchID, roundID = :roundID, matchgroup = :matchgroup, teamID = :teamID, score = :score, ranking = :ranking where matchID = :matchID";
    private $conn = NULL;
    private $getByIDStatement = NULL;
    private $deleteStatement = NULL;
    private $insertStatement = NULL;
    private $updateStatement = NULL;

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
                $roundID = $r['roundID'];
                $matchID = $r['matchID'];
                $matchgroup = $r['matchgroup'];
                $teamID = $r['teamID'];
                $score = $r['score'];
                $ranking = $r['ranking'];
                $obj = new Matchup($matchID, $roundID, $matchgroup, $teamID, $score, $ranking);
                array_push($result, $obj);
            }
        } catch (Exception $e) {
            $result = [];
        } finally {
            if (!is_null($stmt)) {
                $stmt->closeCursor();
            }
        }
//        ChromePhp::log($result);
        return $result;
    }

    /**
     * Gets all menu items.
     * 
     * @return array MenuItem objects, possibly empty
     */
    public function getAllItems() {
        return $this->getItemsByQuery("select * from matchup");
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
            $this->getByIDStatement->bindParam(":matchID", $id);
            $this->getByIDStatement->execute();
            $dbresults = $this->getByIDStatement->fetch(PDO::FETCH_ASSOC); // not fetchAll

            if ($dbresults) {

                $roundID = $r['roundID'];
                $matchID = $r['matchID'];
                $matchgroup = $r['matchgroup'];
                $teamID = $r['teamID'];
                $score = $r['score'];
                $ranking = $r['ranking'];
                $result = new Matchup($matchID, $roundID, $matchgroup, $teamID, $score, $ranking);
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

        $matchID = $item->getMatchID(); // only the ID is needed

        try {
            $this->deleteStatement->bindParam(":matchID", $matchID);
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
        $matchID = $item->getMatchID();
        $roundID = $item->getRoundID();
        $matchgroup = $item->getMatchGroup();
        $teamID = $item->getTeamID();
        $score = $item->getScore();
        $ranking = $item->getRanking();
        $obj = new Matchup($matchID, $roundID, $matchgroup, $teamID, $score, $ranking);

        try {
            $this->insertStatement->bindParam(":roundID", $roundID);
            $this->insertStatement->bindParam(":matchID", $matchID);
            $this->insertStatement->bindParam(":matchgroup", $matchgroup);
            $this->insertStatement->bindParam(":teamID", $teamID);
            $this->insertStatement->bindParam(":score", $score);
            $this->insertStatement->bindParam(":ranking", $ranking);
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
        $matchID = $item->getMatchID();
        $roundID = $item->getRoundID();
        $matchgroup = $item->getMatchGroup();
        $teamID = $item->getTeamID();
        $score = $item->getScore();
        $ranking = $item->getRanking();
        $obj = new Matchup($matchID, $roundID, $matchgroup, $teamID, $score, $ranking);

        try {
            $this->updateStatement->bindParam(":matchID", $matchID);
            $this->updateStatement->bindParam(":roundID", $roundID);
            $this->updateStatement->bindParam(":matchgroup", $matchgroup);
            $this->updateStatement->bindParam(":teamID", $teamID);
            $this->updateStatement->bindParam(":score", $score);
            $this->updateStatement->bindParam(":ranking", $ranking);

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

}

// end class MatchAccessor
