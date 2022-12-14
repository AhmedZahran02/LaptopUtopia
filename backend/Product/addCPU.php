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

if (isset($_GET['mid']) && isset($_GET['subbrand'])&& isset($_GET['brandmodifier'])&& isset($_GET['skunumber'])
&& isset($_GET['numberofcores'])&& isset($_GET['numberofthreads'])&& isset($_GET['clockspeed'])&& isset($_GET['cache'])) {
    
$mid = $_GET['mid'];
$subbrand = $_GET['subbrand'];
$brandmodifier = $_GET['brandmodifier'];
$skunumber = $_GET['skunumber'];
$numberofcores = $_GET['numberofcores'];
$numberofthreads = $_GET['numberofthreads'];
$clockspeed = $_GET['clockspeed'];
$cache = $_GET['cache'];


    $mydb->connect();

    $query = "insert into cpu values "."('".$mid."',' ".$subbrand."','".$brandmodifier."','".$skunumber."',".$numberofcores.
    ",".$numberofthreads.",".$clockspeed.",". $cache .");";

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