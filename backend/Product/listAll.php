<?php
include '../../php/dbclass.php';
$mydb = new Database();

if (isset($_GET['workField'])) {
    $workField = $_GET['workField'];
    $mydb->connect();

    $query = "SELECT * FROM product WHERE product.workfield = '" . $workField . "'";
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