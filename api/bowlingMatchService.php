<?php

$projectRoot = filter_input(INPUT_SERVER, "DOCUMENT_ROOT") . '/shawnmcc/BowlingTournament1';
//$projectRoot = filter_input(INPUT_SERVER, "DOCUMENT_ROOT") . '/barrie/BowlingTournament';
//$projectRoot = filter_input(INPUT_SERVER, "DOCUMENT_ROOT") . '/jarrett/BowlingTournament';
//$projectRoot = filter_input(INPUT_SERVER, "DOCUMENT_ROOT") . '/connor/BowlingTournament';

require_once ($projectRoot . '/db/MatchAccessor.php');
require_once ($projectRoot . '/entity/Matchup.php');
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
    if (!filter_has_var(INPUT_GET, 'matchID')) {
        try {
            $ma = new MatchAccessor();
            $results = $ma->getAllItems();
//            ChromePhp::log($results);
            $results = json_encode($results, JSON_NUMERIC_CHECK);

            echo $results;
        } catch (Exception $e) {
            echo "ERROR " . $e->getMessage();
        }
    } else {
        ChromePhp::log("You are requesting item " . filter_input(INPUT_GET, 'matchID'));
    }
}

function doDelete() {
    if (!filter_has_var(INPUT_GET, 'matchID')) {
        ChromePhp::log("Sorry, bulk deletes not allowed!");
    } else {
        $matchID = filter_input(INPUT_GET, 'matchID');

        // create a match object - only ID matters
        $matchObj = new Matchup($matchID, "dummy", 999, 999, 999, 999);

        // delete the object from DB
        $ma = new MatchAccessor();

        $success = $ma->deleteItem($matchObj);

        echo $success;
    }
}

// aka CREATE
function doPost() {
    // reading the HTTP request body
    $body = file_get_contents('php://input');
    $contents = json_decode($body, true);

    // create a match object
    $matchObj = new Matchup($contents['matchID'], $contents['roundID'], $contents['matchGroup'], $contents['teamID'], $contents['score'], $contents['ranking']);

    // add the object to DB
    $ma = new MatchAccessor();
    $success = $ma->insertItem($matchObj); // *******
    echo $success;
}

// aka UPDATE
function doPut() {
    // reading the HTTP request body
    $body = file_get_contents('php://input');
    $contents = json_decode($body, true);
//    ChromePhp::log("IN PUT: ");
//    ChromePhp::log(json_encode($contents));
    // create a match object
    $matchObj = new Matchup($contents['matchID'], $contents['roundID'], $contents['matchGroup'], $contents['teamID'], $contents['score'], $contents['ranking']);
    // update the object in the  DB
    $ma = new MatchAccessor();
    $success = $ma->updateItem($matchObj); // *******
    echo $success;
}
