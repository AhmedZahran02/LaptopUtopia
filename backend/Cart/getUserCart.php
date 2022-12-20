<?php
include '../../php/dbclass.php';
$mydb = new Database();

if($_GET['username']) {

    // not final and need update like wishlist
    $username = $_GET['username'];

    $mydb->connect();



    $query0 = "(select cartid from customer where username = '" . $username . "');";
    $query = "select * from cartitem , product where product.mid = productid and id in " . $query0;


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