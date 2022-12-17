<?php
include '../../php/dbclass.php';
$mydb = new Database();

if (isset($_GET['mid'])) {

    $mydb->connect();

    $mid = $_GET['mid'];

    $query = "DELETE FROM product WHERE mid='" . $mid . "'";

    //echo $query;
    $result = $mydb->query($query);

    $respond = [["done" => 0]];

    if ($result == true) {
        $respond[0]["done"] = 1;
    }

    $mydb->disconnect();

    echo json_encode($respond);
    return json_encode($respond);
}