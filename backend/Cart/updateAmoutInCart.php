<?php

use LDAP\Result;

include '../../php/dbclass.php';
$mydb = new Database();

if($_GET['username']) {

    // not final and need update like wishlist
    $username = $_GET['username'];
    $amount = $_GET['amount'];
    $price = $_GET['price'];
    $mid = $_GET['mid'];

    $mydb->connect();



    $query0 = "(select cartid from customer where username = '" . $username . "');";
    $query = "update cartitem set quantity = ". $amount ." where productid = '". $mid ."' and id in " . $query0;


    $result = $mydb->query($query);



    $cartid = $mydb->get_cartid_from_username($username);
    $query = "UPDATE cart SET currentprice = " . $price . " Where id = " . $cartid; 

    $result = $result && $mydb->query($query);


    $respond = json_encode($result);

    // echo $respond;

    $mydb->freeResult();
    $mydb->disconnect();

    return $respond;
}