<?php
include '../../php/dbclass.php';
$mydb = new Database();

if (isset($_GET['id'])) {
    $id = $_GET['id'];
    $mydb->connect();

    $query = "DELETE * FROM orders WHERE id = ". $id . ";";
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