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

if (isset($_GET['mid']) && isset($_GET['generation'])&& isset($_GET['color'])&& isset($_GET['writespeed'])&& isset($_GET['reedspeed'])
&& isset($_GET['capacity'])) {
    
$mid = $_GET['mid'];
$type = $_GET['type'];
$color = $_GET['color'];
$writespeed = $_GET['writespeed'];
$reedspeed = $_GET['reedspeed'];
$capacity = $_GET['capaciry'];

    $mydb->connect();

    $query = "insert into storage values "."('".$mid."',' ".$type."','". $color ."',".$writespeed.",".$reedspeed.",".$capacity.");";

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
