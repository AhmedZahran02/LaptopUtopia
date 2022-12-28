<?php
include '../../php/dbclass.php';
$mydb = new Database();

if (isset($_GET['id']) && isset($_GET['status'])) {
    $id = $_GET['id'];
    $status = $_GET['status'];
    $mydb->connect();

    //Will Be Updated Later


    $query = "UPDATE orders SET status = " . $status . " WHERE id = " . $id;
    //echo $query;
    $result = $mydb->query($query);

    $respond = ["Done"=>$result];

    $respond = json_encode($respond);

    echo $respond;
    $mydb->disconnect();
    return $respond;
}