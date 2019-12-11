<?php

// $projectRoot = filter_input(INPUT_SERVER, "DOCUMENT_ROOT") . '/ja/bowlingTournament';
// require_once 'ConnectionManager.php';
// require_once ($projectRoot . '/entity/Team.php');


$projectRoot = filter_input(INPUT_SERVER, "DOCUMENT_ROOT") . '/shawnmcc/BowlingTournament1';
//$projectRoot = filter_input(INPUT_SERVER, "DOCUMENT_ROOT") . '/barrie/BowlingTournament';
//$projectRoot = filter_input(INPUT_SERVER, "DOCUMENT_ROOT") . '/jarrett/BowlingTournament';
//$projectRoot = filter_input(INPUT_SERVER, "DOCUMENT_ROOT") . '/connor/BowlingTournament';

require_once 'ConnectionManager.php';
require_once ($projectRoot . '/entity/Team.php');
require_once ($projectRoot . '/utils/ChromePhp.php');

//require_once ($projectRoot . '/api/bownlingTeamService.php');

class MatchAccessor {

    private $getByIDStatementString = "select * from team where teamID = :teamID";
    private $deleteStatementString = "delete from team where teamID = :teamID";
    private $insertStatementString = "insert into team values (:teamID, :teamName, :earnings)";
    private $updateStatementString = "update team set teamID = :teamID, teamName = :teamName, earnings = :earnings where teamID = :teamID";
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
                $teamID = $r['teamID'];
                $teamName = $r['teamName'];
                $earnings = $r['earnings'];
                $obj = new Team($teamID, $teamName, $earnings);
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
        return $this->getItemsByQuery("select * from team");
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
            $this->getByIDStatement->bindParam(":teamID", $id);
            $this->getByIDStatement->execute();
            $dbresults = $this->getByIDStatement->fetch(PDO::FETCH_ASSOC); // not fetchAll

            if ($dbresults) {
                $teamID = $r['teamID'];
                $teamName = $r['teamName'];
                $earnings = $r['earnings'];
                $result = new Team($teamID, $teamName, $earnings);
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

        $teamID = $item->getTeamID(); // only the ID is needed

        try {
            $this->deleteStatement->bindParam(":teamID", $teamID);
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

        $teamID = $item->getTeamID();
        $teamName = $item->getTeamName();
        $earnings = $item->getEarnings();

        try {
            $this->insertStatement->bindParam(":teamID", $teamID);
            $this->insertStatement->bindParam(":teamName", $teamName);
            $this->insertStatement->bindParam(":earnings", $earnings);
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
        $teamID = $item->getTeamID();
        $teamName = $item->getTeamName();
        $earnings = $item->getEarnings();

        try {
            $this->updateStatement->bindParam(":teamID", $teamID);
            $this->updateStatement->bindParam(":teamName", $teamName);
            $this->updateStatement->bindParam(":earnings", $earnings);
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

// end class MenuItemAccessor
