<?php
include '../../php/dbclass.php';
$mydb = new Database();



$mydb->connect();

$query = "SELECT * FROM order ";
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
