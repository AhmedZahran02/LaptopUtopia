<?php
include '../../php/dbclass.php';
$mydb = new Database();

/* 

mid
subbrand
brandmodifier
skunumber
numberofcores
numberofthreads
clockspeed
cache
*/

if (
    isset($_POST['mid']) && isset($_POST['subbrand']) && isset($_POST['brandmodifier']) && isset($_POST['skunumber'])
    && isset($_POST['numberofcores']) && isset($_POST['numberofthreads']) && isset($_POST['clockspeed']) && isset($_POST['cache'])
) {

    $mid = $_POST['mid'];
    $subbrand = $_POST['subbrand'];
    $brandmodifier = $_POST['brandmodifier'];
    $skunumber = $_POST['skunumber'];
    $numberofcores = $_POST['numberofcores'];
    $numberofthreads = $_POST['numberofthreads'];
    $clockspeed = $_POST['clockspeed'];
    $cache = $_POST['cache'];


    $mydb->connect();

    $query = "insert into cpu values " . "('" . $mid . "',' " . $subbrand . "','" . $brandmodifier . "','" . $skunumber . "'," . $numberofcores .
        "," . $numberofthreads . "," . $clockspeed . "," . $cache . ");";

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