<?php
include '../../php/dbclass.php';
$mydb = new Database();

$mydb->connect();

$customerid = $_GET['username'];

$query = "SELECT * FROM complaint WHERE anwser is not null and complaint.customerid = '" . $customerid . "' ;";

$result = $mydb->query($query);


$respond = [];

while ($row = $result->fetch_assoc()) {
    array_push($respond, $row);
}


$respond = json_encode($respond);

$mydb->freeResult();
$mydb->disconnect();

echo $respond;
return $respond;
