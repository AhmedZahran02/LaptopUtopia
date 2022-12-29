<?php
include '../../php/dbclass.php';
$mydb = new Database();

$mydb->connect();

$Arr = $_POST;

$mid = $Arr['mid'];
$body = $Arr['body'];
$title = $Arr['title'];
$price = $Arr['price'];
$stock = $Arr['stock'];
$imageurls = $Arr['imageurls'];

$query = "UPDATE product SET body = '" . $body . "', title = '" . $title . "', price = " . $price . ", quantity = " . $stock . ", imageurls = '" . $imageurls . "' WHERE mid = '". $mid . "'";

$result = $mydb->query($query);

$respond = ["Done" => $result];

echo json_encode($respond);

$mydb->disconnect();