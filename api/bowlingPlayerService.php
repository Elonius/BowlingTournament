<?php

$projectRoot = filter_input(INPUT_SERVER, "DOCUMENT_ROOT") . '/shawnmcc/BowlingTournament';
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
    if (!filter_has_var(INPUT_GET, 'playerID')) {
        try {
            $pa = new PlayerAccessor();
            $results = $pa->getAllItems(); // *******
            $results = json_encode($results, JSON_NUMERIC_CHECK);
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
        $teamID = filter_input(INPUT_GET, "playerID");

        // create a Team object - only ID matters
        $teamObj = new Team($teamID, "dummyName", "dummyEarnings");

        // delete the object from DB
        $ta = new TeamAccessor();
        $success = $ta->deleteItem($teamObj); // *******
        echo $success;
    }
}

// aka CREATE
function doPost() {
    // reading the HTTP request body
    $body = file_get_contents('php://input');
    $contents = json_decode($body, true);

    // create a Team object
//    ($playerID, $teamID, $teamName, $firstName, $lastName, $hometown, $province)
    $teamObj = new Player($contents['playerID'], $contents['teamID'], $contents['teamName'], $contents['firstName'], $contents['lastName'], $contents['hometown'], $contents['province']);

    // add the object to DB
    $ta = new TeamAccessor();
    $success = $ta->insertItem($teamObj); // *******
    echo $success;
}

// aka UPDATE
function doPut() {
    // reading the HTTP request body
    $body = file_get_contents('php://input');
    $contents = json_decode($body, true);

    // create a Team object
    $teamObj = new Player($contents['playerID'], $contents['teamID'], $contents['teamName'], $contents['firstName'], $contents['lastName'], $contents['hometown'], $contents['province']);

    // update the object in the  DB
    $ta = new TeamAccessor();
    $success = $ta->updateItem($teamObj); // *******
    echo $success;
}
