<?php

$projectRoot = filter_input(INPUT_SERVER, "DOCUMENT_ROOT") . '/shawnmcc/BowlingTournament1';

require_once ($projectRoot . '/db/GameAccessor.php');
require_once ($projectRoot . '/entity/Game.php');
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
    if (!filter_has_var(INPUT_GET, 'gameID')) {
        try {
            $ga = new GameAccessor();
            $results = $ga->getAllItems();
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
    if (!filter_has_var(INPUT_GET, 'gameID')) {
        ChromePhp::log("Sorry, bulk deletes not allowed!");
    } else {
        $gameID = filter_input(INPUT_GET, 'gameID');

        // create a match object - only ID matters
        $gameObj = new Game($gameID, 999, 999, "dummy", 999, "dummy");

        // delete the object from DB
        $ga = new GameAccessor();

        $success = $ga->deleteItem($gameObj);

        echo $success;
    }
}

// aka CREATE
function doPost() {
    // reading the HTTP request body
    $body = file_get_contents('php://input');
    $contents = json_decode($body, true);

    // create a game object
    $gameObj = new Game($contents['gameID'], $contents['matchID'], $contents['gameNumber'], $contents['gameStatusID'], $contents['score'], $contents['balls']);

    // add the object to DB
    $ga = new GameAccessor();
    $success = $ga->insertItem($gameObj); // *******
    echo $success;
}

// aka UPDATE
function doPut() {
    // reading the HTTP request body
    $body = file_get_contents('php://input');
    $contents = json_decode($body, true);
//    ChromePhp::log("IN PUT: ");
//    ChromePhp::log(json_encode($contents));
    // create a game object
    ChromePhp::log($contents['matchID']);
    if ($contents['matchID'] === "0") {
        $gameObj = new Game($contents['gameID'], $contents['matchID'], $contents['gameNumber'], $contents['gameStatusID'], $contents['score'], $contents['balls']);
        // update the object in the  DB
        $ga = new GameAccessor();
        $success = $ga->updateItem($gameObj); // *******
    } else {
        $gameObj = new Game($contents['gameID'], $contents['matchID'], $contents['gameNumber'], $contents['gameStatusID'], $contents['score'], $contents['balls']);
        // update the object in the  DB
        $ga = new GameAccessor();
        $success = $ga->updateScore($gameObj); // *******
    }

    echo $success;
}
