<?php
include '../../php/dbclass.php';
$mydb = new Database();

if (isset($_GET['date'])) {
    $date = $_GET['date'];
    $mydb->connect();

    $query = "SELECT COUNT(*) from signinlog WHERE  date = '" . $date . "' ;";
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