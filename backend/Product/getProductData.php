<?php
include '../../php/dbclass.php';
$mydb = new Database();

if (isset($_GET['mid']) && isset($_GET['workField'])) {
    $mid = $_GET['mid'];
    $workField = $_GET['workField'];
    $mydb->connect();

    if ($workField == "0") {
        $query = "SELECT * FROM laptop WHERE mid = '" . $mid . "'";
    } else if ($workField == "1") {
        $query = "SELECT * FROM cpu WHERE mid = '" . $mid . "'";
    } else if ($workField == "2") {
        $query = "SELECT * FROM gpu WHERE mid = '" . $mid . "'";
    } else if ($workField == "3") {
        $query = "SELECT * FROM ram WHERE mid = '" . $mid . "'";
    } else if ($workField == "4") {
        $query = "SELECT * FROM storage WHERE mid = '" . $mid . "'";
    }

    //echo $query;
    $result = $mydb->query($query);

    $respond = [];

    while ($row = $result->fetch_assoc()) {
        array_push($respond, $row);
    }

    $respond = json_encode($respond);

    echo $respond;
    $mydb->freeResult();
    $mydb->disconnect();

    return $respond;
}