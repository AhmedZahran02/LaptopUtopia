<?php

use LDAP\Result;

include '../../php/dbclass.php';
$mydb = new Database();



$Arr = $_GET;

if (!isset($Arr["username"])) return;

$mydb->connect();

$username = $Arr['username'];

$cartid = $mydb->get_cartid_from_username();


$query = "DELETE FROM cartitem WHERE id = " . $cartid;

$result = $mydb->query($query);

$query = "UPDATE cart SET currentprice = 0 WHERE id = " . $cartid;

$result = $result && $mydb->query($query);


$respond = ["Done"=>$result];

echo $respond;

$mydb->disconnect();





