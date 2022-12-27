<?php
include '../../php/dbclass.php';
$mydb = new Database();

$mydb->connect();

$username = $_GET['username'];


$query = "SELECT * FROM orders WHERE customerusername = '" . $username . "' ;";
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
