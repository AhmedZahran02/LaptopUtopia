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
&& isset($_GET['vram'])&& isset($_GET['generation'])) {
    
$mid = $_GET['mid'];
$subbrand = $_GET['subbrand'];
$brandmodifier = $_GET['brandmodifier'];
$skunumber = $_GET['skunumber'];
$vram = $_GET['vram'];
$generation = $_GET['generation'];

    $mydb->connect();

    $query = "insert into cpu values "."('".$mid."',' ".$subbrand."','".$brandmodifier."','".$skunumber."',".$vram. ",'".$generation ."');";

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