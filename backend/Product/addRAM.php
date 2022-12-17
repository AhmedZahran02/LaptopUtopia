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
    isset($_POST['mid']) && isset($_POST['generation']) && isset($_POST['writespeed']) && isset($_POST['reedspeed'])
    && isset($_POST['capacity'])
) {

    $mid = $_POST['mid'];
    $generation = $_POST['generation'];
    $writespeed = $_POST['writespeed'];
    $reedspeed = $_POST['reedspeed'];
    $capacity = $_POST['capacity'];

    $mydb->connect();

    $query = "insert into ram values " . "('" . $mid . "',' " . $generation . "'," . $writespeed . "," . $reedspeed . "," . $capacity . ");";

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