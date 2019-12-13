<?php

$projectRoot = filter_input(INPUT_SERVER, "DOCUMENT_ROOT") . '/shawnmcc/BowlingTournament1';

require_once ($projectRoot . '/db/ResetAccessor.php');
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

// aka CREATE
function doPost() {
    $rdba = new ResetAccessor();
    $success = $rdba->resetDatabase(); 
    
    echo $success;
}