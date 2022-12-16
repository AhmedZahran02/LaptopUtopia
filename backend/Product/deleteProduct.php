<?php
include '../../php/dbclass.php';
$mydb = new Database();

if (isset($_GET['mid'])) {
    
$mydb->connect();

$mid = $_GET['mid'];

    $query = "DELETE FROM product WHERE mid='" . $mid . "'";

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