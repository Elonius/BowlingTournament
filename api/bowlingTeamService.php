<?php

$projectRoot = filter_input(INPUT_SERVER, "DOCUMENT_ROOT") . '/shawnmcc/BowlingTournament1';
//$projectRoot = filter_input(INPUT_SERVER, "DOCUMENT_ROOT") . '/barrie/BowlingTournament';
//$projectRoot = filter_input(INPUT_SERVER, "DOCUMENT_ROOT") . '/jarrett/BowlingTournament';
//$projectRoot = filter_input(INPUT_SERVER, "DOCUMENT_ROOT") . '/connor/BowlingTournament';

require_once ($projectRoot . '/db/TeamAccessor.php');
require_once ($projectRoot . '/entity/Team.php');
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
    if (!filter_has_var(INPUT_GET, 'teamID')) {
        try {
            $ta = new TeamAccessor();
            $results = $ta->getAllItems();
            $results = json_encode($results, JSON_NUMERIC_CHECK);

            echo $results;
        } catch (Exception $e) {
            echo "ERROR " . $e->getMessage();
        }
    } else {
        ChromePhp::log("You are requesting item " . filter_input(INPUT_GET, 'teamID'));
    }
}

function doDelete() {
    if (!filter_has_var(INPUT_GET, 'teamID')) {
        ChromePhp::log("Sorry, bulk deletes not allowed!");
    } else {
        $teamID = filter_input(INPUT_GET, 'teamID');

        // create a Team object - only ID matters
        $teamObj = new Team($teamID, "dummyName", "dummyEarnings");

        // delete the object from DB
        $ta = new TeamAccessor();
        $success = $ta->deleteItem($teamObj);

        echo $success;
    }
}

// aka CREATE
function doPost() {
    // reading the HTTP request body
    $body = file_get_contents('php://input');
    $contents = json_decode($body, true);

    // create a Team object
    $teamObj = new Team($contents['teamID'], $contents['teamName'], $contents['earnings']);

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
    $teamObj = new Team($contents['teamID'], $contents['teamName'], $contents['earnings']);
    // update the object in the  DB
    $ta = new TeamAccessor();
    $success = $ta->updateItem($teamObj); // *******
    echo $success;
}
