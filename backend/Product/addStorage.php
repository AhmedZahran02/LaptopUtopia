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
    isset($_GET['mid']) && isset($_GET['generation']) && isset($_GET['color']) && isset($_GET['writespeed']) && isset($_GET['reedspeed'])
    && isset($_GET['capacity'])
) {

    $mid = $_GET['mid'];
    $type = $_GET['type'];
    $color = $_GET['color'];
    $writespeed = $_GET['writespeed'];
    $reedspeed = $_GET['reedspeed'];
    $capacity = $_GET['capacity'];

    $mydb->connect();

    $query = "insert into storage values " . "('" . $mid . "',' " . $type . "','" . $color . "'," . $writespeed . "," . $reedspeed . "," . $capacity . ");";

    //echo $query;
    $result = $mydb->query($query);

    $respond = [["done" => 0]];

    if ($result == true) {
        $respond[0]["done"] = 1;
    }

    $mydb->disconnect();

    echo json_encode($respond);
    return json_encode($respond);
}