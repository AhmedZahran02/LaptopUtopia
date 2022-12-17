<?php
include '../../php/dbclass.php';
$mydb = new Database();

/* 
mid	
generation
writespeed
readspeed
capacity
*/

if (
    isset($_POST['mid']) && isset($_POST['generation']) && isset($_POST['color']) && isset($_POST['writespeed']) && isset($_POST['reedspeed'])
    && isset($_POST['capacity'])
) {

    $mid = $_POST['mid'];
    $type = $_POST['type'];
    $color = $_POST['color'];
    $writespeed = $_POST['writespeed'];
    $reedspeed = $_POST['reedspeed'];
    $capacity = $_POST['capaciry'];

    $mydb->connect();

    $query = "insert into storage values " . "('" . $mid . "',' " . $type . "','" . $color . "'," . $writespeed . "," . $reedspeed . "," . $capacity . ");";

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
}