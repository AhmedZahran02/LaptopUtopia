<?php
include '../../php/dbclass.php';
$mydb = new Database();

if (isset($_GET['q'])) {
    $workField = $_GET['q'];
    $mydb->connect();

    //Will Be Updated Later


    $query = "SELECT * FROM orders ";
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