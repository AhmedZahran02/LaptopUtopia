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
    && isset($_POST['vram']) && isset($_POST['generation'])
) {

    $mid = $_POST['mid'];
    $subbrand = $_POST['subbrand'];
    $brandmodifier = $_POST['brandmodifier'];
    $skunumber = $_POST['skunumber'];
    $vram = $_POST['vram'];
    $generation = $_POST['generation'];

    $mydb->connect();

    $query = "insert into cpu values " . "('" . $mid . "',' " . $subbrand . "','" . $brandmodifier . "','" . $skunumber . "'," . $vram . ",'" . $generation . "');";

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