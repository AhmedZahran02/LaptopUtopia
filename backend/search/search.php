<?php
include '../../php/dbclass.php';
$mydb = new Database();

if (isset($_GET['q']) && isset($_GET['workfield'])) {
    $q = $_GET['q'];
    $wf = $_GET['workfield'];
    $mydb->connect();

    $query = "SELECT * FROM product WHERE product.title like '%" . $q . "%' and product.workfield = " . $wf . ";";
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