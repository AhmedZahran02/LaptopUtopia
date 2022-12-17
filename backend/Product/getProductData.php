<?php
include '../../php/dbclass.php';
$mydb = new Database();

if (isset($_GET['mid']) && isset($_GET['workfield'])) {
    $mid = $_GET['mid'];
    $workField = $_GET['workfield'];
    $mydb->connect();

    if ($workField == "0") {
        $query = "SELECT * FROM laptop , product WHERE product.mid = '" . $mid . "'" . "and laptop.mid = product.mid";
    } else if ($workField == "1") {
        $query = "SELECT * FROM cpu , product WHERE product.mid = '" . $mid . "'" . "and cpu.mid = product.mid";
    } else if ($workField == "2") {
        $query = "SELECT * FROM gpu , product WHERE product.mid = '" . $mid . "'" . "and gpu.mid = product.mid";
    } else if ($workField == "3") {
        $query = "SELECT * FROM ram , product WHERE product.mid = '" . $mid . "'" . "and ram.mid = product.mid";
    } else if ($workField == "4") {
        $query = "SELECT * FROM storage , product WHERE product.mid = '" . $mid . "'" . "and storage.mid = product.mid";
    }

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