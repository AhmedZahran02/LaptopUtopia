<?php
include '../../php/dbclass.php';
$mydb = new Database();

if (isset($_POST['username'])) {
    $_username = $_POST['username'];

    $query = "select * from customer where username='" . $_username . "';";

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