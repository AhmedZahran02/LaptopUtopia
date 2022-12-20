<?php
include '../../php/dbclass.php';
$mydb = new Database();

$mydb->connect();

$wf = isset($_POST['workfield']) ? $_POST['workfield'] : -1;

if ($wf != 4) {
    $mydb->disconnect();

    return null;
} else {

    $query = "select distinct product.mid,product.brandname,storage.capacity,storage.type from storage,product where product.mid=storage.mid ;";
    // echo $query;
    $result = $mydb->query($query);

    $respond = [];
    while ($row = $result->fetch_assoc()) {
        array_push($respond, [$row['mid'], $row['brandname'] . ' ' . $row['type'] . ' ' . $row['capacity'] . ' GB ']);
    }

    $respond = json_encode($respond);

    echo $respond;
    $mydb->freeResult();
    $mydb->disconnect();

    return $respond;
}