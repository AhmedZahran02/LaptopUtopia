<?php
include '../../php/dbclass.php';
$mydb = new Database();

if (isset($_GET['username'])) {
    $_username = $_GET['username'];

    $query = "select * from admin where username='" . $_username . "';";

    $mydb->connect();

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