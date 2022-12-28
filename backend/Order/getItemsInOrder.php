<?php
include '../../php/dbclass.php';
$mydb = new Database();


$Arr = $_GET;

if (!isset($Arr['id'])) return;

$orderid = $id;



$query = "SELECT * FROM product WHERE product.mid IN (SELECT productid FROM orderitem WHERE id = ". $orderid .")";

$result = $mydb->query($query);

$respond = [];

while ($row = $result->fetch_assoc())
{
    array_push($respond,$row);
}

echo json_encode($respond);
$mydb->disconnect();
return $respond;