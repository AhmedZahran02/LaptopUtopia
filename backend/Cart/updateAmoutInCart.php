<?php

use LDAP\Result;

include '../../php/dbclass.php';
$mydb = new Database();

if($_GET['username']) {

    // not final and need update like wishlist
    $username = $_GET['username'];
    $amount = $_GET['amount'];
    $mid = $_GET['mid'];

    $mydb->connect();



    $query0 = "(select cartid from customer where username = '" . $username . "');";
    $query = "update cartitem set quantity = ". $amount ." where productid = '". $mid ."' and id in " . $query0;


    $result = $mydb->query($query);


    echo $result;

    $respond = json_encode($result);

    // echo $respond;

    $mydb->freeResult();
    $mydb->disconnect();

    return $respond;
}