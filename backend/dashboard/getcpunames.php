<?php
include '../../php/dbclass.php';
$mydb = new Database();

$mydb->connect();

$wf = isset($_POST['workfield']) ? $_POST['workfield'] : -1;

if ($wf != 1) {
    $mydb->disconnect();

    return null;
} else {

    $query = "select distinct product.mid,product.brandname,cpu.subbrand,cpu.brandmodifier,cpu.skunumber from cpu,product where product.mid=cpu.mid ;";
    // echo $query;
    $result = $mydb->query($query);

    $respond = [];
    while ($row = $result->fetch_assoc()) {
        array_push($respond, [$row['mid'], $row['brandname'] . ' ' . $row['subbrand'] . ' ' . $row['brandmodifier'] . ' ' . $row['skunumber']]);
    }

    $respond = json_encode($respond);

    echo $respond;
    $mydb->freeResult();
    $mydb->disconnect();

    return $respond;
}