<?php
include '../../php/dbclass.php';
$mydb = new Database();

$mydb->connect();

$query = "SELECT * FROM complaint WHERE complaint.adminid is null";

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
