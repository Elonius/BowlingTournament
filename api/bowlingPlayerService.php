<?php

$projectRoot = filter_input(INPUT_SERVER, "DOCUMENT_ROOT") . '/shawnmcc/BowlingTournament1';

require_once ($projectRoot . '/db/PlayerAccessor.php');
require_once ($projectRoot . '/entity/Player.php');
require_once ($projectRoot . '/utils/ChromePhp.php');

$method = filter_input(INPUT_SERVER, 'REQUEST_METHOD'); // $_SERVER['REQUEST_METHOD']
if ($method === "GET") {
    doGet();
} else if ($method === "POST") {
    doPost();
} else if ($method === "DELETE") {
    doDelete();
} else if ($method === "PUT") {
    doPut();
}

function doGet() {
    $id = filter_input(INPUT_GET, "teamID");

    if (!filter_has_var(INPUT_GET, 'playerID')) {
        try {
            $pa = new PlayerAccessor();

            if ($id !== null) {
                $res = $pa->getPlayersOnTeam($id);
            } else {
                $res = $pa->getAllItems();
            }
            $results = json_encode($res, JSON_NUMERIC_CHECK);

            echo $results;
        } catch (Exception $e) {
            echo "ERROR " . $e->getMessage();
        }
    } else {
        ChromePhp::log("You are requesting item " . filter_input(INPUT_GET, 'playerID'));
    }
}

function doDelete() {
    if (!filter_has_var(INPUT_GET, 'playerID')) {
        ChromePhp::log("Sorry, bulk deletes not allowed!");
    } else {
        $playerID = filter_input(INPUT_GET, "playerID");

        // create a Team object - only ID matters
        $playerObj = new Player($playerID, "dummyTeamID", "dummyTeamName", "dummyFirstName", "dummyLastName", "dummyHometown", "dummyProvince");

        // delete the object from DB
        $pa = new PlayerAccessor();
        $success = $pa->deleteItem($playerObj);
        echo $success;
    }
}

// aka CREATE
function doPost() {
    // reading the HTTP request body
    $body = file_get_contents('php://input');
    $contents = json_decode($body, true);

    // create a Team object
    $playerObj = new Player($contents['playerID'], $contents['teamID'], $contents['firstName'], $contents['lastName'], $contents['hometown'], $contents['province']);

    // add the object to DB
    $pa = new PlayerAccessor();
    $success = $pa->insertItem($playerObj);
    echo $success;
}

// aka UPDATE
function doPut() {
    // reading the HTTP request body
    $body = file_get_contents('php://input');
    $contents = json_decode($body, true);

    // create a Team object
    $playerObj = new Player($contents['playerID'], $contents['teamID'], $contents['firstName'], $contents['lastName'], $contents['hometown'], $contents['province']);
    // update the object in the  DB
    $pa = new PlayerAccessor();
    $success = $pa->updateItem($playerObj);
    echo $success;
}
