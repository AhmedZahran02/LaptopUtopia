<?php
include '../../php/dbclass.php';
$mydb = new Database();

$mydb->connect();

$wf = isset($_POST['workfield']) ? $_POST['workfield'] : -1;

if ($wf != 3) {
    $mydb->disconnect();

    return null;
} else {

    $query = "select distinct product.mid,product.brandname,ram.capacity,ram.generation from ram,product where product.mid=ram.mid ;";
    // echo $query;
    $result = $mydb->query($query);

    $respond = [];
    while ($row = $result->fetch_assoc()) {
        array_push($respond, [$row['mid'], $row['brandname'] . ' ' . $row['capacity'] . ' GB ' . $row['generation']]);
    }

    $respond = json_encode($respond);

    echo $respond;
    $mydb->freeResult();
    $mydb->disconnect();

    return $respond;
}